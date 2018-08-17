const puppeteer = require('puppeteer');
const CREDS = require('./creds');

async function searchGithub(page, stringToSearch) {

	const searchUrl = `https://github.com/search?q=Accounting`;

	await page.goto(searchUrl);
	await page.waitFor(3*1000);

	await page.screenshot({ path: 'screenshots/github.png'});
}

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

	//await searchGithub(page, 'Samuel');
	const searchUrl = `https://github.com/search?q=Accounting`;

	await page.goto(searchUrl);
	await page.waitFor(3*1000);

	const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex.flex-auto > div > div'

	const LENGTH_SELECTOR_CLASS = 'user-list-item';

	let listLength = await page.evaluate((sel) => {
		return document.getElementsByClassName(sel).length;
	}, LENGTH_SELECTOR_CLASS);

	for (let i = 1; i <= listLength; i++) {
		//changing the index to the next child
		let usernameSelector = LIST_USERNAME_SELECTOR.replace("INDEX", i);
		
		let username = await page.evaluate((sel) => {
			return document.querySelector(sel).getAttribute('href').replace('/', '');
		}, usernameSelector);

		console.log(i, '. ', username);
	}

	browser.close();
}

run();
