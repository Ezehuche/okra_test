import puppeteer from 'puppeteer';
import { sleepFor } from '../wait';

export const auth = async (url: string) => {
  try {
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

    let email = '';
    let password = '';

    await page.waitForFunction(() => {
      email = (document.getElementById('email') as HTMLInputElement).value;
      password = (document.getElementById('password') as HTMLInputElement)
        .value;

      console.log(email);

      return email.length !== 0 && password.length !== 0;
    });
    await page.waitForNavigation();
  } catch (err) {
    console.log(err);
  }
};
