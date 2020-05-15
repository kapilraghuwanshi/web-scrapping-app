const puppeteer = require('puppeteer');

loginParse = require('./loginParse');

try {
    (async () => {

        const USERNAME = '';
        const PASSWORD = '';
        const PIN = '';

        await loginParse.initialize();

        await loginParse.loginAuth(USERNAME, PASSWORD, PIN);

        let shareDetails = await loginParse.getValue();

        console.log(shareDetails);

        await loginParse.closeBrowser();

    })();
} catch (error) {
    console.error(error);
}