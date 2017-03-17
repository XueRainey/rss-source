const mongoose = require('mongoose');
const FeedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        require: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    feedUrl: {
        type: String,
        required: true
    },
    siteUrl: {
        type: String,
        required: true
    },
    master: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
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

FeedSchema.statics.add = async function(currentFeed) {
    currentFeed.createTime = Date.now();
    currentFeed.updateTime = Date.now();
    if (await this.findOne({ name: currentFeed.name, userId: currentFeed.userId })) throw new Error('请勿创建重复的订阅源');
    return await currentFeed.save();
};

// FeedSchema.static.update = async function({}) {
//     return await this.findOneAndUpdate(
//         { "name" : "R. Stiles" },
//         { $set: { "points" : 5 } }
//     )
// }


module.exports = mongoose.model('Feed', FeedSchema);