import puppeteer from 'puppeteer';
import { sleepFor } from '../wait';

const getNumPages = async (page: puppeteer.Page) => {
  await page.waitForSelector(
    '#root > main > section > div:nth-child(4) > span > span:nth-child(3)',
  );
  const NUM_TRANSACTION_SELECTOR =
    '#root > main > section > div:nth-child(4) > span > span:nth-child(3)';

  const inner = await page.evaluate((sel) => {
    const html = document.querySelector(sel).innerHTML;

    return html;
  }, NUM_TRANSACTION_SELECTOR);

  const numUsers = parseInt(inner);

  const numPages = Math.ceil(numUsers / 10);
  return numPages;
};

const getTransactions = async (page: puppeteer.Page) => {
  const LENGTH_SELECTOR_CLASS = 'dark:border-gray-700';
  const listLength = await page.evaluate((sel) => {
    return document.getElementsByClassName(sel).length;
  }, LENGTH_SELECTOR_CLASS);
  const transPerPage = [];

  console.log('Numpages: ', listLength);
  for (let h = 0; h <= listLength; h++) {
    const typeSelector = `#root > main > section > div.flex.flex-col.md\\:flex-row.justify-between.items-center.border.border-black.bg-white.w-4\\\/5.mx-auto.mb-4.px-6.py-4.box-border.text-left.rounded > table > tbody > tr:nth-child(${
      1 + h
    }) > th`;
    const dateSelector = `#root > main > section > div.flex.flex-col.md\\:flex-row.justify-between.items-center.border.border-black.bg-white.w-4\\\/5.mx-auto.mb-4.px-6.py-4.box-border.text-left.rounded > table > tbody > tr:nth-child(${
      1 + h
    }) > td:nth-child(2)`;

    const descSelector = `#root > main > section > div.flex.flex-col.md\\:flex-row.justify-between.items-center.border.border-black.bg-white.w-4\\\/5.mx-auto.mb-4.px-6.py-4.box-border.text-left.rounded > table > tbody > tr:nth-child(${
      1 + h
    }) > td:nth-child(3)`;
    const amountSelector = `#root > main > section > div.flex.flex-col.md\\:flex-row.justify-between.items-center.border.border-black.bg-white.w-4\\\/5.mx-auto.mb-4.px-6.py-4.box-border.text-left.rounded > table > tbody > tr:nth-child(${
      1 + h
    }) > td:nth-child(4)`;
    const beneficiarySelector = `#root > main > section > div.flex.flex-col.md\\:flex-row.justify-between.items-center.border.border-black.bg-white.w-4\\\/5.mx-auto.mb-4.px-6.py-4.box-border.text-left.rounded > table > tbody > tr:nth-child(${
      1 + h
    }) > td:nth-child(5)`;
    const senderSelector = `#root > main > section > div.flex.flex-col.md\\:flex-row.justify-between.items-center.border.border-black.bg-white.w-4\\\/5.mx-auto.mb-4.px-6.py-4.box-border.text-left.rounded > table > tbody > tr:nth-child(${
      1 + h
    }) > td:nth-child(6)`;

    const type = await page.evaluate((sel) => {
      const element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, typeSelector);

    const amount = await page.evaluate((sel) => {
      const element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, amountSelector);

    const date = await page.evaluate((sel) => {
      const element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, dateSelector);

    const description = await page.evaluate((sel) => {
      const element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, descSelector);

    const beneficiary = await page.evaluate((sel) => {
      const element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, beneficiarySelector);

    const sender = await page.evaluate((sel) => {
      const element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, senderSelector);

    if (type !== null) {
      //   console.log(
      //     type,
      //     ' -> ',
      //     amount,
      //     ' -> ',
      //     date,
      //     ' -> ',
      //     description,
      //     ' -> ',
      //     beneficiary,
      //     ' -> ',
      //     sender,
      //   );

      const transObj = {
        type,
        amount,
        date,
        description,
        beneficiary,
        sender,
      };

      transPerPage.push(transObj);
    }
    //   const browser = await puppeteer.launch({ headless: false });
    //   const newTab = await browser.newPage();
  }

  return transPerPage;
};

export const account = async (page: puppeteer.Page) => {
  try {
    const LENGTH_SELECTOR_CLASS = '.w-full, .flex-1';
    const listLength = await page.evaluate((sel) => {
      return document.querySelectorAll(sel).length;
    }, LENGTH_SELECTOR_CLASS);
    for (let i = 0; i <= listLength; i++) {
      // change the index to the next child
      if (i > 0) {
        await page.goBack();
        await page.waitForTimeout(6000);
      }
      const typeSelector = `#root > main > section > section:nth-child(${
        2 + i
      }) > div:nth-child(1) > h3`;
      const amountSelector = `#root > main > section > section:nth-child(${
        2 + i
      }) > div:nth-child(1) > p.text-4xl.my-2.font-bold`;

      const balanceSelector = `#root > main > section > section:nth-child(${
        2 + i
      }) > div:nth-child(1) > p:nth-child(3)`;
      const buttonSelector = `#root > main > section > section:nth-child(${
        2 + i
      }) > div:nth-child(2) > a`;

      const type = await page.evaluate((sel) => {
        const element = document.querySelector(sel);
        return element ? element.innerHTML : null;
      }, typeSelector);

      const amount = await page.evaluate((sel) => {
        const element = document.querySelector(sel);
        return element ? element.innerHTML : null;
      }, amountSelector);

      const balance = await page.evaluate((sel) => {
        const element = document.querySelector(sel);
        return element ? element.innerHTML : null;
      }, balanceSelector);

      if (type !== null) {
        const next = await page.evaluate((sel) => {
          return document.querySelector(sel).getAttribute('href');
        }, buttonSelector);

        console.log(
          type,
          ' -> ',
          amount,
          ' -> ',
          balance,
          ' -> ',
          'https://bankof.okra.ng' + next,
        );
        await Promise.all([
          page.click(buttonSelector),
          page.waitForNavigation(),
        ]);
        const numPages = await getNumPages(page);
        const testPages = 3;
        const transObj = await getTransactions(page);
        console.log(JSON.stringify(transObj));
        for (let j = 1; j <= testPages; j++) {
          const nextSelector = `#root > main > section > div:nth-child(4) > div > button.py-2.px-4.text-sm.font-medium.text-white.bg-gray-800.rounded-r.border-0.border-l.border-gray-700.hover\\:bg-gray-900.dark\\:bg-gray-800.dark\\:border-gray-700.dark\\:text-gray-400.dark\\:hover\\:bg-gray-700.dark\\:hover\\:text-white`;
          await Promise.all([
            page.click(nextSelector),
            page.waitForTimeout(4000),
          ]);
          const transObj = await getTransactions(page);
          console.log(JSON.stringify(transObj));
        }
        // await page.goBack();
        // await page.waitForTimeout(6000);
        // await Promise.all([
        //   page.click(
        //     '#root > main > section > section:nth-child(3) > div:nth-child(2) > a',
        //   ),
        //   page.waitForNavigation(),
        // ]);
        // const accPages = await getNumPages(page);
        // const testaccPages = 3;
        // const accObj = await getTransactions(page);
        // console.log(JSON.stringify(accObj));
        // for (let k = 1; k <= testaccPages; k++) {
        //   const nextSelector = `#root > main > section > div:nth-child(4) > div > button.py-2.px-4.text-sm.font-medium.text-white.bg-gray-800.rounded-r.border-0.border-l.border-gray-700.hover\\:bg-gray-900.dark\\:bg-gray-800.dark\\:border-gray-700.dark\\:text-gray-400.dark\\:hover\\:bg-gray-700.dark\\:hover\\:text-white`;
        //   await Promise.all([
        //     page.click(nextSelector),
        //     page.waitForTimeout(4000),
        //   ]);
        //   const transObj = await getTransactions(page);
        //   console.log(JSON.stringify(transObj));
        // }
      }
    }
    return;

    // await Promise.all([page.click(BUTTON_SELECTOR), page.waitForNavigation()]);

    // return auth;
  } catch (err) {
    console.log(err);
  }
};
