import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/employee.json';

setup('log in as employee', async ({ page }) => {
  await page.goto(process.env.LOGIN_URL!);

  // Locators taken from your codegen recording
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.EMPLOYEE_USER!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.EMPLOYEE_PASS!);
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');

  // Login worked when the home page shows the app button
  await expect(page.getByRole('button', { name: 'Expense Claim System' })).toBeVisible();

  // Save the session so the other tests start already logged in.
  // This file works like a password: never share or upload it.
  await page.context().storageState({ path: authFile });
});
