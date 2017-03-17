const User = require('../../modles/user');
const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    const { currentUser } = ctx;
    ctx.response.body = { 
        code: 0,
        message: '获取成功',
        userInfo: {
            nickname: currentUser.username,
        } 
    };
});

router.post('/register', async (ctx, next) => {
    const { username = '', password = '' } = ctx.request.body;
    ctx.response.body = await User.register(new User({
        username,
        password
    }));
});

router.post('/login', async (ctx, next) => {
    const { username = '', password = '' } = ctx.request.body;
    console.log('body::', username, password, ctx.request.body);
    const loginResult = await User.loginByPassword(username, password);
    if (loginResult) {
        ctx.session.token = loginResult.token;
        ctx.response.body = { code: 0, message: '登陆成功', userInfo: { nickname: loginResult.username, token: loginResult.token } };
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
