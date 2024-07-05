const express = require('express')
const axios = require('axios')
const UserModel = require('../models/user.model')
const WatchListModel = require('../models/watchlist.model')
require('dotenv').config()

const WatchlistRouter = express.Router()

WatchlistRouter.get('/', async(req, res)=>{
    const {user} = req.query
    console.log(user);
    try {
        const foundUser = await UserModel.findOne({ email: user });
        console.log(foundUser);
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


WatchlistRouter.post('/list',async(req, res)=>{
    const {list_id,media_type,name,ActiveUser} = req.body
    try {
        const user = await UserModel.findOne({email:ActiveUser})
        if(user){
            try {
                const entry = new WatchListModel({profile_id:user._id,content_id:list_id,mediaType:media_type,title:name})
                await WatchListModel.create(entry)
                res.status(200).send('Added to Watchlist successfully')
                
            } catch (error) {
                res.status(500).send({message:error.message})
            }
        }else{
            res.status(400).send('You are not logged in to access this feature')
        }
        
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

module.exports = WatchlistRouter