const router = require('koa-router')();
const userApiRouter = require('./user/api');
const userPageRouter = require('./user/page');
router.use('/api/user', userApiRouter.routes(), userApiRouter.allowedMethods());
router.use('/user', userPageRouter.routes(), userPageRouter.allowedMethods());

router.get('/', async (ctx, next) => {
    ctx.status = 301;
    ctx.redirect('/user');
    ctx.body = 'Redirecting to user';
});

module.exports = router;
