import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from '../support/world';

let loginPage: LoginPage;

Given('I am on the login page', async function (this: CustomWorld) {
  // write code here that turns the phrase above into concrete actions
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();

});

When('I enter username {string}', async function (this: CustomWorld, username: string) {
  // write code here that turns the phrase above into concrete actions
  await loginPage.enterUsername(username);

});

When('I enter password {string}', async function (this: CustomWorld, password: string) {
  // write code here that turns the phrase above into concrete actions
  await loginPage.enterPassword(password);
  
});

When('I click the login button', async function (this: CustomWorld) {
  // write code here that turns the phrase above into concrete actions
  await loginPage.clickLogin();

});

Then('I should see inventory page', async function (this: CustomWorld) {
    const isInventoryVisible = await loginPage.isInventoryVisible();
    expect(isInventoryVisible).toBeTruthy();
});

Then('I should see error message {string}', async function (this: CustomWorld, expectedMessage: string) {
    const actualMessage = await loginPage.getErrorMessage();
    expect(actualMessage).toContain(expectedMessage);
});

Then('I should see {string}', async function (this: CustomWorld, result: string) {
    if (result === 'inventory page') {
        const isInventoryVisible = await loginPage.isInventoryVisible();
        expect(isInventoryVisible).toBeTruthy();
    }
   else {
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(result);
}});


