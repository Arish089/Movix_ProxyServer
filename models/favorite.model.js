const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const FavoriteListSchema = new mongoose.Schema({
    profile_id:{type:ObjectId, required:true, ref:'user'},
    content_id: { type: Number, required: true },
    mediaType: { type: String, required: true },
    title: { type: String, required: true }
});

FavoriteListSchema.index({ profile_id: 1, content_id: 1 }, { unique: true });

const FavoriteListModel = mongoose.model('favorite', FavoriteListSchema);
module.exports = FavoriteListModel;
