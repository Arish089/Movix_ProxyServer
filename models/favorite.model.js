const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema({
    name:{type: String, required: true},
    content_id :{type:Number}
})

const FavoriteModel = mongoose.model('Favorite',FavoriteSchema)

module.exports = FavoriteModel