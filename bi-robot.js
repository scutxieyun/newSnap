const fs = require('fs');
const path = require('path');
const md5 = require('js-md5')
const axios = require('axios')
const { login } = require("./modules/redash.js")
const { getBrowser, sleep } = require("./modules/common.js")
var argv = require('yargs')
  .default({
    viewx: 1224,
    viewy: 768
  })
  .alias('t', 'target')
  .alias('h', 'hook')
  .alias('c', 'checkpoint')
  .alias('x', 'viewx')
  .alias('y', 'viewy')
  .argv
  
  console.log(argv)
  
  sp2QWHook(argv)


async function sp2QWHook(argv){
  try{
    var err = false
    const browser = await getBrowser()
    const page = await browser.newPage();
    await page.setViewport({
      width: argv.viewx,
      height: argv.viewy,
      deviceScaleFactor: 1,
    });
    await login(page)
    await sleep(2000)
  } catch (e) {
    console.log(e)
    process.exit(0)
  }
};
