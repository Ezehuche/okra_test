import puppeteer from 'puppeteer';
import { sleepFor } from '../wait';
import { customer } from './customer';
import { account } from './account';

export const auth = async () => {
  try {
    const url = 'https://bankof.okra.ng';
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const URL = `${url}/login`;
    // await page.setViewport({
    //   width: 1280,
    //   height: 800,
    //   deviceScaleFactor: 1,
    // });

    await page.goto(URL, { waitUntil: 'networkidle2' });
    await sleepFor(page, 1000, 2000);
    // let email: string | any[] | HTMLElement;
    // let password: string | any[] | HTMLElement;

    // await page.waitForFunction(() => {
    //   email = document.querySelector('#email').innerHTML;
    //   password = document.querySelector('#password').innerHTML;

    //   console.log(email);

    //   return email.length !== 0 && password.length !== 0;
    // });
    await page.waitForNavigation();
    const OTP_SELECTOR = '#otp';
    const BUTTON_SELECTOR = '#root > main > section > form > button';

    await page.click(OTP_SELECTOR);
    await page.keyboard.type('12345');

    await Promise.all([page.click(BUTTON_SELECTOR), page.waitForNavigation()]);
    const cookies = await page.cookies();
    console.log(cookies);
    const auth = {
      email: 'ezeokeke.remigius@gmail.com',
      password: 'Pass!Uche234.',
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
