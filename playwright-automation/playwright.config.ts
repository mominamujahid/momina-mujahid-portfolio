import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config'; // reads your .env file (URL, usernames, passwords)

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,            // one test may take up to 60 s
  expect: { timeout: 10_000 }, // wait up to 10 s for something to appear
  retries: 0,                  // no automatic retries: we want to SEE failures
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure', // evidence for bug reports
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,       // local server may use a self-signed certificate
  },

  projects: [
    // 1) Logs in once as the employee and saves the session
    { name: 'setup', testMatch: /auth\.setup\.ts/ },

    // 2) Real tests reuse that saved session (no login in every test)
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/employee.json' },
      dependencies: ['setup'],
    },
  ],
});
