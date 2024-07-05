const mongoose = require('mongoose')

const FavoriteListSchema = new mongoose.Schema({
    profile_id:{type:String, required:true},
    content_id:{type:Number, required:true,unique:true},
    mediaType:{type:String,required:true},
    title:{type:String, required:true}
})

const FavoriteListModel = mongoose.model('favorite',FavoriteListSchema)
module.exports = FavoriteListModel