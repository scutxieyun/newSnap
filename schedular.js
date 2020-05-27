var schedule = require('node-schedule');
const { spawn } = require('child_process');
/**整点播报当天的订单状态**/
/*var j1 = schedule.scheduleJob('0 10 0,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23 * * *', function(){
  var d = new Date()
  d.setTime(d.getTime()-1*60*60*1000) //故意退后一个小时，满足在零点播报的是昨天的数据
  d = d.getFullYear().toString() + '-' +
        ('0' + (d.getMonth() + 1).toString()).slice(-2) + '-' +
        ('0' + d.getDate().toString()).slice(-2)
  const c = spawn('node',
    ['main.js', '--target=http://wmsview:3000/xxOrdReportv2.html?date=' + d, 
    '--checkpoint=".el-table__body tr"',
    '--hook=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9c3b4b99-e120-46f8-b74b-370a4f746e8a'],
    {stdio: 'inherit'});
});*/

var j1 = schedule.scheduleJob('0 10 8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23 * * *', function(){
  const c4 = spawn('node',//实时订单汇总
    ['main.js', '--target=http://server:5000/embed/query/17/visualization/23?api_key=0mZewpU6mjUSykJhdSrQKYOVTtyT2SfeWkdwLSKu', 
    '--checkpoint="div.ant-table-body"',
    '--hook=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9c3b4b99-e120-46f8-b74b-370a4f746e8a',
    '--cc=true',
    '-x=920',
    '-y=900'],
    {stdio: 'inherit'}) 
});


/**从BI拉出数据播报*/
var j3 = schedule.scheduleJob('0 20 12,13,14,15,16,17,18,19,20,21,22,23 * * *', function(){
  const c = spawn('node',
    ['main.js', '--target=http://server:5000/embed/query/12/visualization/17?api_key=SFRVjYq2sHOsjHfKoTiQ4h9Vk3dGLlA9xJcZlq7F', 
    '--checkpoint="svg.main-svg"',
    '--hook=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9c3b4b99-e120-46f8-b74b-370a4f746e8a',
    '-x=1900',
    '-y=500'],
    {stdio: 'inherit'});
});

/*播报今天已经发出订单的汇总*/
var j2 = schedule.scheduleJob('0 0 8 * * *', function(){
  const c1 = spawn('node', //订单结构汇总
    ['main.js', '--target=http://wmsview:3000/xxOrdSumStOnRowNum.html', 
    '--checkpoint=".el-table__body tr"',
    '--hook=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9c3b4b99-e120-46f8-b74b-370a4f746e8a',
    '-x=900',
    '-y=720'
    ],
    {stdio: 'inherit'});
  const c2 = spawn('node', //订单小时分布
    ['main.js', '--target=http://wmsview:3000/xxOrdDistriPerHours.html', 
    '--checkpoint="#myChart div canvas"',
    '--hook=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9c3b4b99-e120-46f8-b74b-370a4f746e8a',
    '-x=900',
    '-y=600'],
    {stdio: 'inherit'});
  const c3 = spawn('node',//订单行分布
    ['main.js', '--target=http://server:5000/embed/query/4/visualization/5?api_key=1Pc3c35HmvULHJiSFb1HKB243gNNaoYCbLO4U8I0', 
    '--checkpoint="svg.main-svg"',
    '--hook=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9c3b4b99-e120-46f8-b74b-370a4f746e8a',
    '-x=800',
    '-y=600'],
    {stdio: 'inherit'})   
    
  const c4 = spawn('node',//临效期预警
    ['main.js', '--target=http://server:5000/embed/query/14/visualization/18?api_key=1GFoIDx8D8TdKyosDb0Al2p9Yw8pyhbwAQEwAg8D&', 
    '--checkpoint="div.ant-table-body"',
    '--hook=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9c3b4b99-e120-46f8-b74b-370a4f746e8a',
    '--cc=true',
    '-x=1500',
    '-y=3000'],
    {stdio: 'inherit'})  
});
var d = new Date()
  d.setTime(d.getTime()+24*60*60*1000)
  d = d.getFullYear().toString() + '-' +
        ('0' + (d.getMonth() + 1).toString()).slice(-2) + '-' +
        ('0' + d.getDate().toString()).slice(-2)
//测试
const c3 = spawn('node',//订单行分布
    ['main.js', '--target=http://server:5000/embed/query/14/visualization/18?api_key=1GFoIDx8D8TdKyosDb0Al2p9Yw8pyhbwAQEwAg8D&', 
    '--checkpoint="div.ant-table-body"',
    '--cc=true',
    '-x=1500',
    '-y=3000'],
    {stdio: 'inherit'})