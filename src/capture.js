const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

; (async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://news.google.com/')
    await page.type('input[type="text"].Ax4B8.ZAGvjd', 'Tsunami')

    const btnSearchSelector = 'button[aria-label="Search"].gb_3e'
    await page.waitForSelector(btnSearchSelector)
    await page.click(btnSearchSelector)

    console.log('clicked')

    const listOfTitleSelector = '#yDmH0d > c-wiz.zQTmif.SSPGKf.F5jAsd.fjU4dd > div > div > main > div > c-wiz > div > c-wiz > c-wiz > div > div > c-wiz > a[aria-level="2"]'
    await page.waitForSelector(listOfTitleSelector)

    const titles = await page.evaluate((listOfTitleSelector) => {
        const anchors = Array.from(document.querySelectorAll(listOfTitleSelector))

        return anchors.map(anchor => anchor.textContent)
    }, listOfTitleSelector)

    let stream = fs.createWriteStream(path.join(__dirname, './files/news.txt'))
    titles.forEach(title => stream.write(title + '\n'))
    stream.end()

    await browser.close()
})()
