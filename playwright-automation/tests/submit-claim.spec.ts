import { test, expect } from '@playwright/test';

// Covers TC-001 / TC-029 / TC-066-067:
// submit a claim with 3 repeater rows, check the server saved 3 child rows,
// then find the claim on the "edit claim" page.

test('TC-001: submit a claim with 3 rows and see it in the list', async ({ page }) => {
  // A unique name so we can find exactly THIS claim later
  const employee = `PW Test ${Date.now()}`;

  const rows = [
    { category: 'food',   amount: '1000', description: 'PWA', date: '2026-10-20' },
    { category: 'travel', amount: '2000', description: 'PWB', date: '2026-10-21' },
    { category: 'food',   amount: '3000', description: 'PWC', date: '2026-10-22' },
  ];

  // ---------- 1. Home page -> open the app (it opens in a new tab) ----------
  await page.goto(process.env.LOGIN_URL!); // dashboard URL comes from .env

  // If the saved session didn't work and we see the login page, log in here
  const username = page.getByRole('textbox', { name: 'Username' });
  const appButton = page.getByRole('button', { name: 'Expense Claim System' });
  await expect(username.or(appButton)).toBeVisible();
  if (await username.isVisible()) {
    console.log('Saved session not used - logging in inside the test');
    await username.fill(process.env.EMPLOYEE_USER!);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.EMPLOYEE_PASS!);
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  }
  await expect(appButton).toBeVisible();
  const appTabPromise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Expense Claim System' }).click();
  const app = await appTabPromise;

  // ---------- 2. Main fields (names from your recording) ----------
  await app.locator('input[name="text_4i9b6o1j"]').fill(employee);          // Employee Name
  await app.locator('select[name="select_gv8l57ne"]').selectOption('IT');   // Department
  await app.locator('input[name="date_e4fu2obj"]').fill('2026-10-22');      // Claim Date
  // Total Amount: the number box that is NOT inside the repeater table.
  // CHECK: better to use its name, e.g. input[name="number_xxxxxxxx"] (see guide)
  await app.locator('input[type="number"]:not(table input)').fill('6000');

  // ---------- 3. Repeater rows ----------
  // A repeater row = a table row that has a Category dropdown
  const repeaterRows = app.locator('tr').filter({ has: app.getByRole('combobox') });

  for (let i = 0; i < rows.length; i++) {
    // Add row sometimes ignores the first click, so retry until the new row appears
    await expect(async () => {
      if ((await repeaterRows.count()) < i + 1) {
        await app.getByRole('button', { name: 'Add row' }).click();
      }
      await expect(repeaterRows).toHaveCount(i + 1, { timeout: 2000 });
    }).toPass({ timeout: 15000 });
    const row = repeaterRows.nth(i);
    const r = rows[i];
    await row.getByRole('combobox').selectOption(r.category);    // Category
    await row.getByRole('spinbutton').fill(r.amount);             // Amount
    await row.locator('input[type="text"]').fill(r.description);  // Description
    await row.locator('input[type="date"]').fill(r.date);         // Date
  }

  // ---------- 4. Submit, and read the server's answer (like F12 > Network) ----------
  // Wait for the POST whose JSON answer contains "childResults" (the claim save)
  const submitResponse = app.waitForResponse(async (res) => {
    if (res.request().method() !== 'POST') return false;
    try {
      const json = await res.json();
      return json && 'childResults' in json;
    } catch {
      return false;
    }
  });
  await app.getByRole('button', { name: 'Submit' }).click();
  const res = await submitResponse;

  expect(res.status(), 'submit request should succeed').toBe(200);
  const body = await res.json();
  console.log('Submit response:', JSON.stringify(body, null, 2)); // printed in the terminal

  // TC-029: 3 rows saved in expense_items
  // CHECK: if this fails, look at the printed response and tell me the real path
  expect(body.childResults?.app_expenseitems?.inserted, 'expense_items rows inserted').toBe(3);

  // ---------- 5. Find the claim on the "edit claim" page ----------
  await app.getByText('edit claim', { exact: true }).click();

  // The Employee filter box (Playwright sees it as zero-size, so force the typing)
  const employeeFilter = app.getByRole('textbox', { name: 'Filter Employee' });
  await employeeFilter.fill(employee, { force: true });

  // The claim we just submitted should appear in the list
  await expect(app.getByRole('cell', { name: employee, exact: true })).toBeVisible();
});
