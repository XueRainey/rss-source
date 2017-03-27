const mongoose = require('mongoose');
const Feed = require('./feed');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const OVERDUE_TIME = 60 * 60 * 24 * 1000 * 30;
const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createTime: {
        type: Number,
        required: true
    },
    updateTime: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    tokenDeadline: {
        type: Number,
        required: false
    }
});
// 校验登陆信息
UserSchema.statics.checkLoginInfo = async function(token) {
    const currentUser = await this.findOne({ token });
    if (!currentUser) return null;
    if (currentUser.tokenDeadline < Date.now()) return null;
    return currentUser;
};

// 判断该账号是否存在
UserSchema.statics.isExistByUsername = async function(username) {
    const currentUser = await this.findOne({ username });
    console.log(currentUser, !!currentUser);
    return !!currentUser;
};
// 注册账号
UserSchema.statics.register = async function(currentUser) {
    if (await this.isExistByUsername(currentUser.username)) {
        return { code: 1, message: '该账号已被注册！' };
    }
    if (!currentUser.password) {
        return { code: 3, message: '请填写正确的密码格式' };
    }
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    currentUser.password = bcrypt.hashSync(currentUser.password, salt);
    currentUser.createTime = Date.now();
    currentUser.updateTime = Date.now();
    currentUser.tokenDeadline = Date.now();
    Feed.add(new Feed({
        userId: currentUser._id,
        name: currentUser.username,
        title: 'default feed title',
        description: 'default feed description',
        feedUrl: 'http://rainey.space',
        siteUrl: 'http://rainey.space',
        master: currentUser.username,
        categories: ['default']
    }));
    try {
        await currentUser.save();
        return { code: 0, message: '注册成功' };
    } catch(e) {
        console.log(e);
        return { code: 2, message: '用户信息格式错误' };
    }
};
// 通过密码登陆
UserSchema.statics.loginByPassword = async function(username, password) {
    const currentUser = await this.findOne({ username });
    console.log('currentUser::', currentUser);
    if (!currentUser) return null;
    if (!bcrypt.compareSync(password, currentUser.password)) return null;
    
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    currentUser.token = bcrypt.hashSync(Date.now().toString(), salt);
    currentUser.tokenDeadline = Date.now() + OVERDUE_TIME;
    return await currentUser.save();
};
// 退出账号
UserSchema.statics.logout = async function(token) {
    const currentUser = await this.findOne({ token });
    if (currentUser) {
        currentUser.tokenDeadline = Date.now();
        await currentUser.save();
    }
};

module.exports = mongoose.model('User', UserSchema);