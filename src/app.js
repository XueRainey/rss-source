const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger')
const router = require('./router');
const app = new Koa();

// 连接数据库
require('./connectDb');

app.use(bodyParser());

app.use(logger());
// 启动静态服务
app.use(require('koa-static')(path.join(__dirname, '../public')));
// 加载路由
app.use(router.routes());

app.listen(3000);