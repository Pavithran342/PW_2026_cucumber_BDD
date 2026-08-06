import { Page } from '@playwright/test';
import { config } from '../config/config';

export class LoginPage {

    constructor(private page: Page) {}

    private locators = {
        username: '#user-name',
        password: '#password',
        loginBtn: '#login-button',
        inventory: '#inventory_container',
        errormessage: 'h3[data-test="error"]',
    };

    async navigate() {
        await this.page.goto(config.baseUrl, { waitUntil: 'domcontentloaded', timeout: config.timeout.navigation });
        await this.page.locator(this.locators.username).waitFor({ state: 'visible', timeout: config.timeout.default });
    }

    async enterUsername(username: string) {
        const usernameField = this.page.locator(this.locators.username);
        await usernameField.waitFor({ state: 'visible', timeout: config.timeout.default });
        await usernameField.fill(username, { timeout: config.timeout.default });
    }

    async enterPassword(password: string) {
        const passwordField = this.page.locator(this.locators.password);
        await passwordField.waitFor({ state: 'visible', timeout: config.timeout.default });
        await passwordField.fill(password, { timeout: config.timeout.default });
    }

    async clickLogin() {
        const loginButton = this.page.locator(this.locators.loginBtn);
        await loginButton.waitFor({ state: 'visible', timeout: config.timeout.default });
        await loginButton.click({ timeout: config.timeout.default });
    }

    async isInventoryVisible(): Promise<boolean> {
        return await this.page.locator(this.locators.inventory).first().isVisible();
    }

     async getErrorMessage(): Promise<string> {
        const error = this.page.locator(this.locators.errormessage);
        await error.waitFor({ state: 'visible', timeout: config.timeout.default });
        return (await error.textContent()) ?? '';
    }

}