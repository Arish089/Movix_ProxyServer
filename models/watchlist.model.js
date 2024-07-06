const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const WatchlistSchema = new mongoose.Schema({
    profile_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'user'},
    content_id:{type:Number, required:true},
    mediaType:{type:String,required:true},
    title:{type:String, required:true}
})

WatchlistSchema.index({ profile_id: 1, content_id: 1 },{unique: true});

const WatchListModel = mongoose.model('watchlist',WatchlistSchema)

module.exports = WatchListModel