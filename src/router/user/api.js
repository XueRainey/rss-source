const User = require('../../modles/user');
const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    const userInfo = await User.checkLoginInfo(ctx.session.token);
    console.log(userInfo);
    if (!userInfo) {
        ctx.response.body = { code: 1, message: '未登录' };
    } else {
        ctx.response.body = { code: 1, message: '获取成功', userInfo };
    }
});

router.post('/register', async (ctx, next) => {
    const username = ctx.request.body.username || '';
    const password = ctx.request.body.password || '';
    const currentUser = new User({
        username,
        password
    });
    ctx.response.body = await User.register(currentUser);
});

router.post('/login', async (ctx, next) => {
    const username = ctx.request.body.username || '';
    const password = ctx.request.body.password || '';
    const loginResult = await User.loginByPassword(username, password);
    if (loginResult) {
        ctx.session.token = loginResult.token;
        ctx.response.body = { code: 0, message: '登陆成功' };
    } else {
        ctx.response.status = 401;
        ctx.response.body = { code: 1, message: '登陆失败' };
    }
});

router.post('/logout', async (ctx, next) => {
    const { token } = ctx.session;
    if (token) {
        const loginResult = await User.logout(token);
        ctx.session.token = null;
    }
    ctx.response.body = { code: 0, message: '退出账号成功' };
});

module.exports = router;
