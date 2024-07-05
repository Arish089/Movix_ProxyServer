const mongoose = require('mongoose')

const WatchlistSchema = new mongoose.Schema({
    profile_id:{type:String, required:true},
    content_id:{type:Number, required:true,unique:true},
    mediaType:{type:String,required:true},
    title:{type:String, required:true}
})

const WatchListModel = mongoose.model('watchlist',WatchlistSchema)

module.exports = WatchListModel