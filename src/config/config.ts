import * as dotenv from 'dotenv';
import * as path from 'path';

// //load environment specific .env file:
const environment = process.env.ENV || 'default'; // ENV=qa npx cucumber-js
const envFile = environment === 'default' ? '.env' : `.env.${environment}`; // //.env.qa

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const config = {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: process.env.HEADLESS === 'true',
    browser: process.env.BROWSER || 'chromium',

    users: {
        standard: {
            username: process.env.STANDARD_USER || 'standard_user',
            password: process.env.PASSWORD || 'secret_sauce'
        },
        locked: {
            username: process.env.LOCKED_USER || 'locked_out_user',
            password: process.env.PASSWORD || 'secret_sauce'
        }
    },
    timeout: {
        default: 30000,
        navigation: 60000
    }
}