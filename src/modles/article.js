const mongoose = require('mongoose');
const ArticleSchema = new mongoose.Schema({
    feedId: {
        type: String,
        required: true
    },
    title: { 
        type: String,
        required: true
    },
    content: {
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
});
// 校验登陆信息
UserSchema.statics.checkLoginInfo = async function(token) {
    const currentUser = await this.findOne({ token });
    if (!currentUser) return null;
    if (currentUser.tokenDeadline < Date.now()) return null;
    return currentUser;
};


module.exports = mongoose.model('User', UserSchema);