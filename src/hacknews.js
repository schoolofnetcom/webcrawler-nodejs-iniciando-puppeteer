const puppeteer = require('puppeteer')
const HackNews = require('./schema/hackernews')

module.exports = (async () => {

    const findResult = await HackNews.find({})
    
    if (findResult.length) {
        return console.log(findResult)
    }

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://www.reddit.com/r/hackernews/')

    const titleSelector = 'p.title > a'
    await page.waitForSelector(titleSelector)

    const data = await page.evaluate((titleSelector) => {
        const anchors = Array.from(document.querySelectorAll(titleSelector))

        return anchors.map((anchor) => {
            return {
                title: anchor.textContent,
                url  : anchor.href
            }
        })
    }, titleSelector)

    await HackNews.insertMany(data)
    await browser.close()

    console.log(data)
})()
