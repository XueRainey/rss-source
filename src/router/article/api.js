const Article = require('../../modles/article');
const Feed = require('../../modles/feed');
const router = require('koa-router')();
const updateRss = require('../../script/updateRss');

router.post('/add', async (ctx, next) => {
    const { currentUser } = ctx;
    const { feedName = currentUser.username, title, content, categories = ['default'], url } = ctx.request.body;    
    const feedInfo = await Feed.findOne({
        userId: currentUser._id,
        name: feedName
    });

    const article = new Article({
        feedId: feedInfo._id,
        title,
        content,
        categories,
        url,
        createTime: Date.now()
    })
    try {
        await article.save();
        const articleList = await Article.find({
            feedId: feedInfo._id
        });
        updateRss(currentUser, feedInfo, articleList);
        ctx.response.body = { 
            code: 0,
            message: '增加文章成功'
        };
    } catch(e) {
        console.log(e);
        ctx.response.body = { code: 1, message: '增加文章失败' };
    }
});

module.exports = router;
