import puppeteer from 'puppeteer';
import { sleepFor } from '../wait';
import { customer } from './customer';

export const auth = async () => {
  try {
    const url = 'https://bankof.okra.ng';
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const URL = `${url}/login`;
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    });

    await page.goto(URL, { waitUntil: 'networkidle2' });
    await sleepFor(page, 1000, 2000);
    await page.waitForNavigation();
    const OTP_SELECTOR = '#otp';
    const BUTTON_SELECTOR = '#root > main > section > form > button';

    await page.click(OTP_SELECTOR);
    await page.keyboard.type('12345');

    await Promise.all([page.click(BUTTON_SELECTOR), page.waitForNavigation()]);
    const cookies = await page.cookies();
    console.log(cookies);
    const auth = {
      ...cookies,
    };
    const customer_details = await customer(page);

    return auth;
  } catch (err) {
    console.log(err);
  }
};