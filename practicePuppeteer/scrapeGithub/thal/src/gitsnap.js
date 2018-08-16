const puppeteer = require('puppeteer');
const CREDS = require('./creds');

async function run() {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();

	await page.goto('https://github.com/login');

	const USERNAME_SELECTOR = '#login_field';
	const PASSWORD_SELECTOR = '#password';
	const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

	await page.click(USERNAME_SELECTOR);
	await page.keyboard.type(CREDS.username);

	await page.click(PASSWORD_SELECTOR);
	await page.keyboard.type(CREDS.password);

	await page.click(BUTTON_SELECTOR);

	await page.waitForNavigation();

	const stringToSearch = 'Samuel';

	const searchUrl = `https://github.com/search?q=${stringToSearch}`;

	await page.goto(searchUrl);
	await page.waitFor(3*1000);

	await page.screenshot({ path: 'screenshots/github.png'});

	browser.close();
}

run();
