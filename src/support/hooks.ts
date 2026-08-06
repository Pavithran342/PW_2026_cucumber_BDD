import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { Browser, chromium } from '@playwright/test';

let browser: Browser;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function (this: CustomWorld) {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {

        await this.page.close();
    
        await this.context.close();
    
});

AfterAll(async function () {
    await browser.close();
});