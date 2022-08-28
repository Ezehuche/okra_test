import puppeteer from 'puppeteer';
import { FormatterService } from '../../formatter/formatter.service';
import { sleepFor } from '../wait';

export const customer = async (page: puppeteer.Page) => {
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
    const address = await page.evaluate((el) => el.textContent, addressElement);
    const bvn = await page.evaluate((el) => el.textContent, bvnElement);
    const phone = await page.evaluate((el) => el.textContent, phoneElement);
    const email = await page.evaluate((el) => el.textContent, emailElement);

    const rawSel = {
      name: new FormatterService().removeStr('Welcome back', name),
      address: new FormatterService().removeStr('Address:', address),
      bvn: new FormatterService().removeStr('BVN:', bvn),
      phone_number: new FormatterService().removeStr('Phone:', phone),
      email: new FormatterService().removeStr('Email:', email),
    };

    // console.log(rawSel);
    return rawSel;
  } catch (err) {
    console.log(err);
  }
};
