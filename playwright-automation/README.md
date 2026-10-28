# Playwright UI Automation · Expense Claim System

End-to-end UI tests written with [Playwright](https://playwright.dev/) and TypeScript for an Expense Claim web app built on a low-code platform. The suite turns manual test cases into automated checks.

## What it covers

| Test case | What is checked |
|---|---|
| **TC-001** | An employee submits a claim with 3 expense rows, and the claim appears in the list |
| **TC-029** | The server's submit response confirms that exactly 3 child rows were saved in `expense_items` |
| **TC-066 / TC-067** | The new claim can be found on the *Edit claim* page using the Employee filter |

## How it works

- **Log in once, reuse the session.** `auth.setup.ts` signs in as a test employee and saves the session, so the other tests start already logged in. If the saved session fails, the test falls back to logging in itself.
- **Unique test data.** Each run creates a claim named `PW Test <timestamp>`, so the test always finds its own record.
- **Checks the API as well as the UI.** The test waits for the submit `POST` request and reads its JSON response, the same thing a tester would check in DevTools under Network.
- **Handles a flaky control.** The *Add row* button sometimes ignores the first click, so the test retries until the new row actually appears.
- **Evidence on failure.** Screenshots, video and a trace are kept only for failed tests, ready to attach to a bug report.

## Project structure

```
playwright-automation/
├── tests/
│   ├── auth.setup.ts         # logs in once and saves the session
│   └── submit-claim.spec.ts  # TC-001, TC-029, TC-066/067
├── playwright.config.ts      # timeouts, reporters, setup project
├── .env.example              # template for URLs and test login
└── package.json
```

## Running it

```bash
npm install
npx playwright install chromium
cp .env.example .env    # then fill in your test server and test account
npm test                # run headless
npm run test:headed     # watch the browser
npm run report          # open the HTML report
```

> **Security:** `.env` and `playwright/.auth/` hold passwords and session cookies. Both are listed in `.gitignore` and are never committed. Use a dedicated test account only.

## Tools

Playwright · TypeScript · Node.js · dotenv
