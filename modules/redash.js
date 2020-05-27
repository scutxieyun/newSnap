var redash = "http://127.0.0.1:5000/login"
exports.login = async function(page) {
  await page.goto(redash);
  await page.waitForSelector("input#inputEmail")
  await page.type("input#inputEmail", "scutxieyun@hotmail.com", {delay: 100})
  await page.type("input#inputPassword", "561000", {delay: 100})
  await page.click("form button")
}