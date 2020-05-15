//const rp = require('request-promise'); // since reddit runs javascript on the page to render
const puppeteer = require('puppeteer');
const url = 'https://www.reddit.com';
const $ = require('cheerio');

puppeteer.launch()
    .then((browser) => {
        return browser.newPage();
    })
    .then((page) => {
        return page.goto(url).then(() => {
            return page.content();
        });
    })
    .then((html) => {
        //success!
        $('h3', html).each(() => {
            console.log($(this).text());
        });
    })
    .catch((err) => {
        //handle error
        console.error(err);
    });