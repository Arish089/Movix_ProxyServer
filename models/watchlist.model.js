const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const WatchlistSchema = new mongoose.Schema({
    profile_id:{type:String, required:true},
    content_id:{type:String, required:true},
    mediaType:{type:String,required:true},
    title:{type:String, required:true}
})

WatchlistSchema.index({ profile_id: 1, content_id: 1 });

const WatchListModel = mongoose.model('watchlist',WatchlistSchema)

module.exports = WatchListModel