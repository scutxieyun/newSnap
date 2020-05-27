const md5 = require('js-md5')
const axios = require('axios')
exports.getBrowser = async function() {
  var puppeteer
  var browser
  if (process.env.CONFIG_ENV === "prod") {
    puppeteer = require('puppeteer');
    browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
  } else {
    puppeteer = require('puppeteer-core');
    browser = await puppeteer.launch({
            headless: false,
            executablePath: "c:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
            args: ["--app-shell-host-window-size=1600x1239"]
        });
  }
  return browser
}

exports.sleep = async function(time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  })
}

async function notify(wh, im) {
  let d = new Buffer.from(im).toString('base64');
  let m = md5(Buffer.from(im))
  
  const data = {
    msgtype: "image",
    "image": {
      "base64": d,
      "md5": m
    }
  }
  console.log("image size" + im.length)
  return await axios.post(wh,data).then(d => console.log(d)).catch(d => {
     console.error('log4js:slack - Error sending log to slack: ', err)
  })
}