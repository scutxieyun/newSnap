async function login(b, cas) {
const page = await browser.newPage();
await page.setViewport({
      width: 1024,
      height: 768,
      deviceScaleFactor: 1,
    });
    await page.goto(cas);
    await page.waitForSelector(argv.checkpoint)
}