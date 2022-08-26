import puppeteer from 'puppeteer';
import { sleepFor } from '../wait';

export const customer = async (page) => {
  try {
    await page.waitForSelector('#root > main > div > h1');

    const nameElement = await page.$('#root > main > div > h1');
    const addressElement = await page.$(
      '#root > main > div > div > p:nth-child(1)',
    );
    const bvnElement = await page.$(
      '#root > main > div > div > p:nth-child(2)',
    );
    const phoneElement = await page.$(
      '#root > main > div > div > p:nth-child(3)',
    );
    const emailElement = await page.$(
      '#root > main > div > div > p:nth-child(4)',
    );
    const name = await page.evaluate((el) => el.textContent, nameElement);

    const rawSel = {
      name,
      address: await page.evaluate((el) => el.textContent, addressElement),
      bvn: await page.evaluate((el) => el.textContent, bvnElement),
      phone: await page.evaluate((el) => el.textContent, phoneElement),
      email: await page.evaluate((el) => el.textContent, emailElement),
    };

    console.log(rawSel);
    return rawSel;

    // await Promise.all([page.click(BUTTON_SELECTOR), page.waitForNavigation()]);

    // return auth;
  } catch (err) {
    console.log(err);
  }
};
