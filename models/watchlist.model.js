const mongoose = require('mongoose')

const WatchlistSchema = new mongoose.Schema({
    name:{type: String, required: true},
    content_id :{type:Number}
})

const WatchListModel = mongoose.model('watchlist',WatchlistSchema)

module.exports = WatchListModel