const Feed = require('../../modles/feed');
const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    const { currentUser } = ctx;
    const feedName = ctx.request.body.feedName || ctx.query.feedName || currentUser.username;
    const feedInfo = await Feed.findOne({ name: feedName, userId: currentUser._id });
    if (feedInfo) {
        ctx.response.body = { 
            code: 0,
            message: '获取成功',
            feedInfo
        };
    } else {
        ctx.response.body = { 
            code: 1,
            message: '获取失败',
            feedInfo
        };
    }
});

router.post('/update', async (ctx, next) => {
    const { currentUser } = ctx;
    const { feedName, title, description, feedUrl, siteUrl, categories } = ctx.request.body;    
    const updateInfo = { title, description, feedUrl, siteUrl, categories };
    Object.keys(updateInfo).forEach(key => {
        if(!updateInfo[key]) delete updateInfo[key];
    });
    const feedInfo = await Feed.findOneAndUpdate(
        { name: feedName, userId: currentUser._id },
        { $set: updateInfo },
        { new: true }
    );
    if (feedInfo) {
        ctx.response.body = { 
            code: 0,
            message: '修改成功',
            feedInfo
        };
    } else {
        ctx.response.body = { 
            code: 1,
            message: '修改失败'
        };
    }
});

module.exports = router;
