const router = require('koa-router')();
const userApiRouter = require('./user/api');
const userPageRouter = require('./user/page');
router.use('/api/user', userApiRouter.routes(), userApiRouter.allowedMethods());
router.use('/user', userPageRouter.routes(), userPageRouter.allowedMethods());

module.exports = router;
