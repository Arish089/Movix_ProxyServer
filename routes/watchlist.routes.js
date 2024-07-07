const express = require('express')
const axios = require('axios')
const UserModel = require('../models/user.model')
const WatchListModel = require('../models/watchlist.model')
require('dotenv').config()

const WatchListRouter = express.Router()

WatchListRouter.get('/', async(req, res)=>{
    const {user} = req.query
    try {
        const foundUser = await UserModel.findOne({ email: user });
        if (foundUser) {
            const watchlist = await WatchListModel.find({ profile_id: foundUser._id });
            res.status(200).json(watchlist);
        } else {
            res.status(400).send('User not found');
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})


WatchListRouter.post('/list', async (req, res) => {
    const { list_id, media_type, name, ActiveUser } = req.body;

    try {
        const user = await UserModel.findOne({ email: ActiveUser });
        if (!user) {
            return res.status(400).send('You are not logged in to access this feature');
        }

        const existingEntry = await WatchListModel.findOne({ profile_id: user._id, content_id: list_id });
        if (existingEntry) {
            return res.status(400).send(`This item is already in the watchlist for this user: ${ActiveUser}.`);
        }

        const entry = new WatchListModel({
            profile_id: user._id,
            content_id: list_id,
            mediaType: media_type,
            title: name
        });
        await entry.save();
        res.status(200).send('Added to Watchlist successfully');
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

WatchListRouter.delete('/delete/:id', async(req, res)=>{
    const {id} = req.params
    try {
        const item = await WatchListModel.findByIdAndDelete({_id:id})
        if (item.deletedCount === 0) {
            res.status(404).send('Item not found in watchlist');
        } else {
            res.status(200).send('Item removed from watchlist successfully');
        }
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

module.exports = WatchListRouter