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
    url: {
        type: String,
        required: true
    },
    createTime: {
        type: Number,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
});

// ArticleSchema.statics.addArticle = async function(token) {
//     const currentUser = await this.findOne({ token });
//     if (!currentUser) return null;
//     if (currentUser.tokenDeadline < Date.now()) return null;
//     return currentUser;
// };


module.exports = mongoose.model('Article', ArticleSchema);