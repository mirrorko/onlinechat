import puppeteer from 'puppeteer'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

describe('Facebook login', () => {
  let browser: puppeteer.Browser
  let page: puppeteer.Page
  let popup: puppeteer.Page
  const getPopup = () =>
    new Promise<puppeteer.Page>(resolve =>
      browser.once('targetcreated', target => resolve(target.page())),
    )
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
      // slowMo: 100,
      // devtools: true,
    })
    page = await browser.newPage()
    await page.goto('https://localhost:3000/')
  })

  it('should facebook popup open', async () => {
    await page.waitFor(2000)
    await page.click('.fb-login-button')
    popup = await getPopup()
    const pageTitle = await popup.title()
    expect(pageTitle).toBe('Facebook')
  })

  it('should facebook auth work', async () => {
    await page.waitFor(1000)
    await popup.type('#email', 'ajsdfjtkdt_1551696321@tfbnw.net')
    await popup.type('#pass', 'qweaaa123456789')
    await popup.click('#buttons input[name="login"]')
  })

  afterAll(async () => {
    // await page.close()
  })
})
