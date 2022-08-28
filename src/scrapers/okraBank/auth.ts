import puppeteer from 'puppeteer';
import { sleepFor } from '../wait';
import { customer } from './customer';
import { account } from './account';

export const auth = async (email: string, password: string, otp: string) => {
  try {
    const url = 'https://bankof.okra.ng';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const URL = `${url}/login`;
    // await page.setViewport({
    //   width: 1280,
    //   height: 800,
    //   deviceScaleFactor: 1,
    // });
    page.on('dialog', async (dialog) => {
      console.log('here');
      await dialog.accept();
    });
    await page.goto(URL, { waitUntil: 'networkidle2' });
    await page.click('#email');
    await page.keyboard.type(email);
    await page.click('#password');
    await page.keyboard.type(password);
    // click and wait for navigation
    await Promise.all([
      page.click('#root > main > section > form > button'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    const OTP_SELECTOR = '#otp';
    const BUTTON_SELECTOR = '#root > main > section > form > button';

    await page.click(OTP_SELECTOR);
    await page.keyboard.type(otp);

    await Promise.all([page.click(BUTTON_SELECTOR), page.waitForNavigation()]);
    const cookies = await page.cookies();
    console.log(cookies);
    const auth = {
      email,
      password,
    };
    const customer_details = await customer(page);
    const account_details = await account(page);

    console.log(customer_details);
    console.log(account_details);

    return { auth, customer_details, account_details };
  } catch (err) {
    console.log(err);
  }
};
