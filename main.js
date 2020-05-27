var targetPage = 'http://127.0.0.1:3000/xxOrdReport.html'
var checkPoint = '.el-table__body tr'
var webHook = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9c3b4b99-e120-46f8-b74b-370a4f746e8a" //正式
//var webHook = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=e2e8f50d-f92d-474f-886a-e69845a8e8f2' //测试
if (process.env.TARGET_PAGE !== undefined) {
  targetPage = process.env.TARGET_PAGE
}
if (process.env.TARGET_PAGE !== undefined) {
  targetPage = process.env.TARGET_PAGE
}

const fs = require('fs');
const path = require('path');
const md5 = require('js-md5')
const axios = require('axios')

var argv = require('yargs')
  .default({
    target: targetPage, // 获取网页的URL
    checkpoint: checkPoint, //确认判断所需内容加载成功的检查点，当cc为true时，也作为元素截图的目标
    hook: undefined, // 推送目标的webhook, 主要针对企业微信
    cc: false, // 为true时，对检查点DOM进行截图，false时，对整个screen截图
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
  
  /*.scriptName("brobot")
  .usage('$0 <cmd> [args]')
  .command('sp2QWHook [target] [checkpoint] [hook] ', '欢迎使用网页抓取机器人', (yargs) => {
    yargs.positional('target', {
      type: 'string',
      default: targetPage,
      describe: '需要抓取的链接'
    })
    yargs.positional('checkpoint', {
      type: 'string',
      default: checkPoint,
      describe: '等待网页完成的检查点'
    })
    yargs.positional('hook', {
      type: 'string',
      default: webHook,
      describe: '完成后发送的群机器人'
    })
  }, async function (argv) {
    return await sp2QWHook(argv)
  })
  .help()
  .argv*/

sp2QWHook(argv)

async function getBrowser() {
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
            headless: true,
            executablePath: "c:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
            args: ["--app-shell-host-window-size=1600x1239"]
        });
  }
  return browser
}

function sleep(time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  })
}
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
    await page.goto(argv.target);
    await page.waitForSelector(argv.checkpoint)
    await sleep(2000)
    if (argv.cc === "true") {
      var elem = await page.$(argv.checkpoint)
      await elem.screenshot({
        path: "xxreport.jpg"
      })
    } else {
      await page.screenshot({
        path: "xxreport.jpg"
      })
    }
    if (argv.hook !== undefined) {
      let filePath = path.resolve('xxreport.jpg');
      let data = fs.readFileSync(filePath);
      await notify(argv.hook, data)
    }
    await browser.close();
    
  } catch(e) {
    err = true
    console.log("exception happen at ", e)
    process.exit(1)
  }
};

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
