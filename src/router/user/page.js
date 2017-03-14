const User = require('../../modles/user');
const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    const token = ctx.cookies.get('token');
    const userInfo = await User.checkLoginInfo(token);
    if (!userInfo) {
        ctx.status = 301;
        ctx.redirect('/user/login');
        ctx.body = 'Redirecting to loginPage';
    } else {
        ctx.response.body = `<h1>Hello, ${userInfo.username}!</h1>`;
    }
});

router.get('/login', async (ctx, next) => {
    ctx.response.body = `<h1>账号登陆</h1>
        <form action="/api/user/login" method="post">
            <p>UserName: <input name="username" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.get('/logout', async (ctx, next) => {
    ctx.response.body = `<h1>账号退出</h1>
        <form action="/api/user/logout" method="post">
            <p>退出：<input type="submit" value="Submit"></p>
        </form>`;
});

router.get('/register', async (ctx, next) => {
    ctx.response.body = `<h1>账号注册</h1>
        <form action="/api/user/register" method="post">
            <p>Name: <input name="username" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

module.exports = router;
