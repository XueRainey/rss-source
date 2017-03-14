const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger')
const session = require('koa-session');
const router = require('./router');
const app = new Koa();
app.keys = ['SyJ9Jn1IWzLlNueGVYG'];
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
// 加载路由
app.use(router.routes());

app.listen(3000);