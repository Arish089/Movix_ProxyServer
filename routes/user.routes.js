const {Router} = require('express');
const UserModel = require('../models/user.model');
require('dotenv').config()

const UserRouter = Router();

UserRouter.post('/signup',async (req,res)=>{
    const {email,name} = req.body
    try {
        const newUser = new UserModel({ email, name });
        await UserModel.create(newUser);
        res.status(200).json({ message: "User registered successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

UserRouter.post('/login',async (req,res)=>{
    const {email,name} = req.body
    console.log(email,name);
    try {
        const user = await UserModel.findOne({email})
        console.log(user);
        if(!user){
            const newUser = new UserModel({email,name})
            await UserModel.create(newUser)
            res.status(200).json({message:"User registered successfully"})
        }else{
            res.status(201).send('User already exists')
        }

    } catch (error) {
        res.status(500).send({message: error})
    }
})

module.exports = UserRouter