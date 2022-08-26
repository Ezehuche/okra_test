import puppeteer from 'puppeteer';

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const sleepFor = async (
  page: puppeteer.Page,
  min: number,
  max: number,
) => {
  const sleep_duration = randomIntFromInterval(min, max);
  console.log('waiting for ', sleep_duration / 1000, ' seconds');
  await page.waitForTimeout(sleep_duration); // simulate some human behaviour
};
