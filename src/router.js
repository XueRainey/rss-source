const router = require('koa-router')();
const User = require('./modles/user');

router.get('/user/login', async (ctx, next) => {
    ctx.response.body = `<h1>账号登陆</h1>
        <form action="/user/login" method="post">
            <p>UserName: <input name="username" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.get('/user/logout', async (ctx, next) => {
    ctx.response.body = `<h1>账号退出</h1>
        <form action="/user/logout" method="post">
            <p>退出：<input type="submit" value="Submit"></p>
        </form>`;
});

router.get('/user/register', async (ctx, next) => {
    ctx.response.body = `<h1>账号注册</h1>
        <form action="/user/register" method="post">
            <p>Name: <input name="username" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/user/register', async (ctx, next) => {
    const username = ctx.request.body.username || '';
    const password = ctx.request.body.password || '';
    const currentUser = new User({
        username,
        password
    });
    ctx.response.body = await User.register(currentUser);
});

router.post('/user/login', async (ctx, next) => {
    const username = ctx.request.body.username || '';
    const password = ctx.request.body.password || '';
    const loginResult = await User.loginByPassword(username, password);
    console.log(`login with name: ${username}, password: ${password}`);
    console.log(loginResult);
    if (loginResult) {
        ctx.cookies.set('token', loginResult.token);
        ctx.response.body = { code: 0, message: '登陆成功' };
    } else {
        ctx.response.status = 401;
        ctx.response.body = { code: 1, message: '登陆失败' };
    }
});

router.post('/user/logout', async (ctx, next) => {
    const token = ctx.cookies.get('token');
    if (token) {
        const loginResult = await User.logout(token);
        ctx.cookies.set('token', null);
    }
    ctx.response.body = { code: 0, message: '退出账号成功' };
});


// // add url-route:
// router.get('/hello/:name', async (ctx, next) => {
//     var name = ctx.params.name;
//     const _key = ctx.cookies.get('_key');
//     ctx.response.body = `<h1>Hello, ${name} ${_key}!</h1>`;
// });

module.exports = router;
