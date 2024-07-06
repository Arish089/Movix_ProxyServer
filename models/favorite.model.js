const mongoose = require('mongoose');

const FavoriteListSchema = new mongoose.Schema({
    profile_id: { type: String, required: true},
    content_id: { type: String, required: true },
    mediaType: { type: String, required: true },
    title: { type: String, required: true }
});

FavoriteListSchema.index({ profile_id: 1, content_id: 1 }, { unique: true });

const FavoriteListModel = mongoose.model('favorite', FavoriteListSchema);
module.exports = FavoriteListModel;
