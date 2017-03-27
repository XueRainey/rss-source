const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger')
const session = require('koa-session');
const router = require('./router');
const config = require('./config');
const User = require('./modles/user');
const app = new Koa();
app.keys = config.keys;
// 连接数据库
require('./connectDb');
app.use(session({
    key: '_key',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
}, app));
app.use(bodyParser());

app.use(logger());
// 启动静态服务
app.use(require('koa-static')(path.join(__dirname, '../public')));
// 用户认证
app.use(async function(ctx, next) {
    const authPathList = ['/api/user', '/api/feed', '/api/feed/update', '/api/article/add'];
    const currentPath = ctx.request.url.split('?')[0];
    if (!authPathList.includes(currentPath)) {
        await next();
        return;
    }
    const token = ctx.request.body.token|| ctx.query.token || ctx.session.token;
    console.log('开始用户信息认证···', token);
    const userInfo = await User.checkLoginInfo(token);
    if (!userInfo) {
        ctx.response.status = 401;
        ctx.response.body = { code: 1, message: '未登录' };
    } else {
        ctx.currentUser = userInfo;
        await next();
    }
});
// 加载路由
app.use(router.routes());

app.listen(3000);