const {Router} = require('express');
const UserModel = require('../models/user.model');
require('dotenv').config()

const UserRouter = Router();

UserRouter.post('/signup',async (req,res)=>{
    const {email,name} = req.body
    const newUser = new UserModel({email,name})
    await UserModel.create(newUser)
    res.status(200).json({message:"User registered successfully"})
})

module.exports = UserRouter