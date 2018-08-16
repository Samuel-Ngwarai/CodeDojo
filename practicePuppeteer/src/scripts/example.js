const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: false}); //make chromium non-headless for visual interface
	const page = await browser.newPage();
	await page.goto('https://google.com');
	await page.screenshot({path: '../screenshots/google.png'});
	
	setTimeout(function() { 	//wait for 10 seconds then close the browser
		browser.close();
	}, 10000);
})();
