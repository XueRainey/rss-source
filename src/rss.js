var RSS = require('rss');
var fs = require('fs');

var feed = new RSS({
    title: 'Rainey测试',
    description: '这里应该是一大段的介绍吧',
    feed_url: 'http://rainey.space/atom.xml',
    site_url: 'http://rainey.space/',
    // image_url: 'http://example.com/icon.png',
    // docs: 'http://example.com/rss/docs.html',
    managingEditor: 'Rainey',
    webMaster: 'Rainey',
    copyright: '2016 by Rainey',
    language: 'en',
    categories: ['类型 1','类型 2','类型 3'],
    pubDate: 'May 20, 2012 04:00:00 GMT',
    ttl: '60',
    // custom_namespaces: {
    //   'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    // },
    // custom_elements: [
    //   {'itunes:subtitle': 'A show about everything'},
    // ]
});

/* loop over data and add to feed */
feed.item({
    title:  '第一篇测试文章标题',
    description: '第一篇测试文章内容',
    url: 'http://www.rainey.space/2016/11/11/How_To_Build_Knowledge_System/', // link to the item
    // guid: '1123', // optional - defaults to url
    categories: ['类型 1'], // optional - array of item categories
    author: 'Rainey', // optional - defaults to feed author property
    date: 'May 27, 2012', // any format that js Date can parse.
    // lat: 33.417974, // 经度
    // long: -111.933231, // 纬度
    // enclosure: {url:'...', file:'path-to-file'}, // optional enclosure
    // custom_elements: [
    //   {'itunes:author': 'John Doe'},
    //   {'itunes:subtitle': 'A short primer on table spices'},
    //   {'itunes:image': {
    //     _attr: {
    //       href: 'http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg'
    //     }
    //   }},
    //   {'itunes:duration': '7:04'}
    // ]
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