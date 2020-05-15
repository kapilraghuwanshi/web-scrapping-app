const rp = require('request-promise');
const $ = require('cheerio');
const potusParse = require('./potusParse');
const targetUrl = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(targetUrl)
    .then((html) => {
        //success!
        const wikiUrls = [];
        for (let i = 0; i < 53; i++) {
            wikiUrls.push($('b > a', html)[i].attribs.href);
        }
        console.log(wikiUrls);
        return Promise.all(
            wikiUrls.map((url) => {
                return potusParse('https://en.wikipedia.org' + url);
            })
        );
    })
    .then((presidents) => {
        console.log(presidents);
    })
    .catch((err) => {
        //handle error
        console.log(err);
    });