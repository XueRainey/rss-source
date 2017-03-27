const RSS = require('rss');
const fs = require('fs');
const path = require('path');
const updateRss = (userInfo, feedInfo, articleList) => {
    const feed = new RSS({
        title: feedInfo.title,
        description: feedInfo.description,
        feed_url: feedInfo.feedUrl,
        site_url: feedInfo.sitUrl,
        managingEditor: feedInfo.master,
        webMaster: feedInfo.master,
        copyright: `2017 by ${feedInfo.master}`,
        // language: 'en',
        categories: feedInfo.categories,
        pubDate: new Date().toString(),
        // ttl: '10',
    });
    articleList.forEach(article => {
        feed.item({
            title: article.title,
            description: article.content,
            url: article.url,
            categories: article.categories,
            // author: article.author,
            date: new Date(article.createTime).toString(),
        });
    });
    const rssPath = path.resolve(__dirname, `../../public/${userInfo.username}/${feedInfo.name}.rss.xml`);
    fs.writeFileSync(rssPath, feed.xml());
};


module.exports = updateRss;

