const puppeteer = require('puppeteer')

;(async() => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://pixabay.com/')
    await page.setViewport({
        width: 1000,
        height: 1000
    })

    const imgSelector = 'img'
    const el = await page.evaluate((imgSelector) => {
        const img = document.getElementsByTagName(imgSelector)[0]
        const { x, y, width, height } = img.getBoundingClientRect()

        return { x, y, width, height }
    }, imgSelector)

    await page.screenshot({ path: 'pixabay_3.png', clip: {
        x: el.x,
        y: el.y,
        width: el.width,
        height: el.height
    } })

    await browser.close()
})()