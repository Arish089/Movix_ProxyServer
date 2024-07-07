const express = require('express');
const UserModel = require('../models/user.model');
const FavoriteListModel = require('../models/favorite.model');
require('dotenv').config();

const FavoriteRouter = express.Router();

FavoriteRouter.get('/', async (req, res) => {
    const { user } = req.query;
    try {
        const foundUser = await UserModel.findOne({ email: user });
        if (foundUser) {
            const favorite = await FavoriteListModel.find({ profile_id: foundUser._id });
            res.status(200).json(favorite);
        } else {
            res.status(400).send('User not found');
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

FavoriteRouter.post('/list', async (req, res) => {
    const { list_id, media_type, name, ActiveUser } = req.body;

    try {
        const user = await UserModel.findOne({ email: ActiveUser });
        if (user) {
            const entry = new FavoriteListModel({
                profile_id: user._id,
                content_id: list_id,
                mediaType: media_type,
                title: name
            });

            await entry.save();
            res.status(200).send('Added to Favorite successfully');
        } else {
            res.status(400).send('You are not logged in to access this feature');
        }
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send(`This item is already in the favorites for this ${ActiveUser}.`);
        } else {
            res.status(500).send(`An error occurred: ${error.message}`);
        }
    }
});

FavoriteRouter.delete('/delete/:id', async(req, res)=>{
    const {id} = req.params
    try {
        const item = await FavoriteListModel.findByIdAndDelete({_id:id})
        if (item.deletedCount === 0) {
            res.status(404).send('Item not found in favorites');
        } else {
            res.status(200).send('Item removed from favorites successfully');
        }
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

module.exports = FavoriteRouter;
