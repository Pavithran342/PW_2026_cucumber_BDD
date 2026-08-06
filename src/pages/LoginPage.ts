import { Page } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

    private locators = {
        username: '#user-name',
        password: '#password',
        loginBtn: '#login-button',
        inventory: '#inventory_container',
        error: '[data-test="error"]'
    };

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/', { waitUntil: 'load' });
    }

    async enterUsername(username: string) {
        await this.page.locator(this.locators.username).fill(username);
    }

    async enterPassword(password: string) {
        await this.page.locator(this.locators.password).fill(password);
    }

    async clickLogin() {
        await this.page.locator(this.locators.loginBtn).click();
    }

    async isInventoryVisible(): Promise<boolean> {
        return await this.page.locator(this.locators.inventory).first().isVisible();
    }

     async getErrorMessage(): Promise<string> {
        return (await this.page.locator(this.locators.error).textContent()) ?? '';
    }

}