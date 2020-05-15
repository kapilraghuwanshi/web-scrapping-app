const rp = require('request-promise');
const $ = require('cheerio');

const potusParse = (url) => {
    return rp(url)
        .then((html) => {
            return {
                name: $('.firstHeading', html).text(),
                birthday: $('.bday', html).text(),
            };
        })
        .catch((err) => {
            //handle error
            console.log(err);
        });
};

module.exports = potusParse;