const puppeteer = require('puppeteer')

;(async() => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://news.google.com/')
    await page.type('input[type="text"].Ax4B8.ZAGvjd', 'Tsunami')

    const btnSearchSelector = 'button[aria-label="Search"].gb_3e'
    await page.waitForSelector(btnSearchSelector)
    await page.click(btnSearchSelector)

    console.log('clicked')

    await browser.close()
})()