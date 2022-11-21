const express= require('express');
const router = express.Router();
require('../db/conn');
const User = require('../models/userSchema');
const bcrypt= require('bcryptjs');
const { findOne } = require('../models/userSchema');
const jwt = require('jsonwebtoken');   // const middleware = (req,res,next)=>{console.log('i am middleware'); next();}
const cokiparser    = require('cookie-parser');
const jobPost = require('../models/postSchema');
const profile = require('../models/profileSchema');
const e = require('express');
// const User = require('../models/userSchema');



router.get('/user/:id',async(req,res) => {
    try {
        let user = await User.find({ id: req.params.id })
        // console.log("user after find", user)
        res.status(200).json({success: true, user: user })
    } catch (error) {
        console.log("error in getting user")
        res.status(400).json({error: "error in getting user info"})
    }
});



router.put('/user/:id',async(req,res) => {
    try {
        let update = req.body
        let user = await User.findByIdAndUpdate(req.params.id, update, { new: true } )
        // console.log("user after findByIdAndUpdate", user)
        res.status(200).json({success: true, user: user })
    } catch (error) {
        console.log("error in updating user info",error )
        res.status(400).json({error: "error in getting user info"})
    }
});
  

module.exports = router;

