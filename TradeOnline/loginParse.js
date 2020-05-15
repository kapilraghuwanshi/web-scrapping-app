const puppeteer = require('puppeteer');

const baseUrl = 'https://your_website/';
const loginUrl = 'https://your_website.com/login';
const cmUrl = 'https://your_website.com/cm';

const loginParse = {

  initialize: async () => {
    browser = await puppeteer.launch({ headless: false }); // default is true
    page = await browser.newPage();
    await page.goto(baseUrl);
  },

  loginAuth: async (username, password, pin) => {
    await page.goto(loginUrl);
    await page.waitFor(2000);
    await page.waitFor('input[id=username]');
    await page.type('input[id="username"]', username, { delay: 25 });
    await page.type('input[id="password"]', password, { delay: 25 });
    await page.click('button[type="submit"][class="mdc-button mdc-button--raised app-login-form__submit-button"]');
    await page.waitFor(2000);
    await page.waitFor('div[class="app-login-form__two-factor"]');
    await page.waitFor('input[class="mdc-text-field__input"]');
    await page.type('input[class="mdc-text-field__input"]', pin, { delay: 25 });
    await page.click('button[type="submit"][class="mdc-button mdc-button--raised app-login-form__submit-button"]');
    await page.waitFor('div[class="row__swipe-container"]');
    await page.waitFor(1000);
  },

  getValue: async () => {
    await page.goto(cmUrl);
    await page.waitFor(2000);
    await page.waitFor('div[class="row__swipe-container"]');

    let details = await page.evaluate(() => {
      return {
        shareName: document.querySelector('div[class="app-mobile__watchlist-item-ticker-xch"]') ? document.querySelector('div[class="app-mobile__watchlist-item-ticker-xch"]').innerText : false,
        shareVolume: document.querySelector('div[class="app-mobile__watchlist-item-ltp-vol"]') ? document.querySelector('div[class="app-mobile__watchlist-item-ltp-vol"]').innerText : false,
        sharePrice: document.querySelector('div[class="app-mobile__watchlist-item-change"]') ? document.querySelector('div[class="app-mobile__watchlist-item-change"]').innerText : false,
        sharePricePercent: document.querySelector('div[class="app-mobile__watchlist-item-change-per"]') ? document.querySelector('div[class="app-mobile__watchlist-item-change-per"]').innerText : false,
      }
    })
    return details;
  },

  closeBrowser: async () => await browser.close()

}
module.exports = loginParse;