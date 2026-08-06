# PW_2026_cucumber_BDD

## Project Overview

This repository is a Playwright + Cucumber BDD automation project for a sample web application.

- `src/features/` contains feature files.
- `src/steps/` contains step definitions.
- `src/pages/` contains page objects.
- `src/support/` contains world and hooks configuration.

## How to Run

```bash
npm install
npm test
```

Or run a specific feature:

```bash
npx cucumber-js src/features/login.feature
```

## Cucumber and Allure Report Execution

### 1. Validate feature syntax without executing

```bash
npx cucumber-js --dry-run --format summary
```

This command checks the feature files and step definitions and prints a summary of the scenarios.

### 2. Install Allure reporter packages

```bash
npm install -D allure-cucumberjs allure-js-commons
```

### 3. Execute the test suite

```bash
npm run test
```

This runs the Cucumber test suite and generates `allure-results` if the reporter is configured.

### 4. Generate the Allure report

```bash
allure generate allure-results --clean -o allure-report
```

This converts the result files under `allure-results` into a browsable HTML report in `allure-report`.

### 5. Open the Allure report

```bash
allure open allure-report
```

This opens the generated Allure report in a web browser so you can inspect test results and attachments.

## Features & Test Cases

### Login Feature (`src/features/login.feature`)

- `Scenario: Successful login with valid credentials`
  - Given I am on the login page
  - When I enter username `"standard_user"`
  - And I enter password `"secret_sauce"`
  - And I click the login button
  - Then I should see inventory page

- `Scenario: Failed login with invalid credentials`
  - Given I am on the login page
  - When I enter username `"invalid_user"`
  - And I enter password `"wrong_password"`
  - And I click the login button
  - Then I should see error message `"Epic sadface: Username and password do not match any user in this service"`

- `Scenario Outline: Login with different user credentials`
  - Given I am on the login page
  - When I enter username `"<username>"`
  - And I enter password `"<password>"`
  - And I click the login button
  - Then I should see `"<result>"`

#### Login Test Data

| username         | password       | expected result                                                                 |
|------------------|----------------|---------------------------------------------------------------------------------|
| `standard_user`  | `secret_sauce` | `inventory page`                                                                |
| `locked_out_user`| `secret_sauce` | `Epic sadface: Sorry, this user has been locked out.`                          |
| `invalid_user`   | `wrong_password` | `Epic sadface: Username and password do not match any user in this service`   |

### Product Feature (`src/features/product.feature`)

- `Scenario: Verify products are displayed on inventory page`
  - Given I am logged in as a valid user
  - Then I should see at least 1 product on the page

- `Scenario: Add a product to cart`
  - When I add `"Sauce Labs Backpack"` to the cart
  - Then the cart badge should show `"1" item`

- `Scenario: Sort products by price low to high`
  - When I sort products by `"Price (low to high)"`
  - Then the first product price should be the lowest

#### Product Test Data

| productName          | expectedCartCount |
|----------------------|-------------------|
| `Sauce Labs Backpack`| `1`               |

| sortOption                  | expected behavior                        |
|-----------------------------|------------------------------------------|
| `Price (low to high)`       | first product price should be lowest     |

## Notes

- The current login scenarios are implemented in `src/steps/login.steps.ts`.
- Product scenarios are implemented in `src/steps/products.steps.ts`.
- The page objects are in `src/pages/`.

