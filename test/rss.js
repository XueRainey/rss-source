var RSS = require('rss');
var fs = require('fs');

var feed = new RSS({
    title: 'Rainey测试',
    description: '这里应该是一大段的介绍吧',
    feed_url: 'http://rainey.space/atom.xml',
    site_url: 'http://rainey.space/',
    managingEditor: 'Rainey',
    webMaster: 'Rainey',
    copyright: '2016 by Rainey',
    language: 'en',
    categories: ['类型 1','类型 2','类型 3'],
    pubDate: 'May 20, 2012 04:00:00 GMT',
    ttl: '60',
});

feed.item({
    title:  '第一篇测试文章标题',
    description: '第一篇测试文章内容',
    url: 'http://www.rainey.space/2016/11/11/How_To_Build_Knowledge_System/', // link to the item
    categories: ['类型 1'], // optional - array of item categories
    // author: 'Rainey', // optional - defaults to feed author property
    date: 'May 27, 2012', // any format that js Date can parse.
});

// cache the xml to send to clients
var xml = feed.xml();
console.log(xml);
// fs.writeFile('demo.xml', '我是通过写入的文件内容！',  function(err) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("数据写入成功！");
//    console.log("--------我是分割线-------------")
//    console.log("读取写入的数据！");
//    fs.readFile('input.txt', function (err, data) {
//       if (err) {
//          return console.error(err);
//       }
//       console.log("异步读取文件数据: " + data.toString());
//    });
// });