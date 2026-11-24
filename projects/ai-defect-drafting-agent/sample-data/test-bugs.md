# Test inputs

The three raw bugs I submitted through the form to test the agent. Each one checks something different.

## Test A: messy description plus an API error
Checks whether the agent pulls the key error out of a log and keeps the user's clues.

- **Module:** Expense Claim
- **Environment:** Staging
- **What happened:** tried to submit claim with receipt and it just shows something went wrong. without receipt it works fine
- **Error log or API response:**
  ```
  POST /api/claims 500 Internal Server Error
  {"error":"TypeError: Cannot read properties of undefined (reading 'size')","path":"/api/claims","timestamp":"2026-11-24T10:15:22Z"}
  ```

## Test B: vague report
Checks whether the agent marks guesses as "(assumed)" and asks for missing information instead of making things up.

- **Module:** Login
- **What happened:** login button does nothing sometimes

## Test C: UI formatting issue with an expected value
Checks whether the agent compares expected and actual values carefully and picks a sensible severity.

- **Module:** Dashboard
- **What happened:** the total claims amount shows "Rs. 1,25,000.00.00" with two decimals at the end
- **Expected behaviour:** Rs. 125,000.00
