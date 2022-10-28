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
const User = require('../models/userSchema');



router.get('/user/:id',(req,res) => {
    try {
        let user = await User.find({ id: req.params.id })
        console.log("user after find", user)
        res.status(200).json({success: true, user: user })
    } catch (error) {
        console.log("error in getting user")
        res.status(400).json({error: "error in getting user info"})
    }
});



router.put('/user/:id',(req,res) => {
    try {
        let update = req.body
        let user = await User.findByIdAndUpdate(id, update )
        console.log("user after findByIdAndUpdate", user)
        res.status(200).json({success: true, user: user })
    } catch (error) {
        console.log("error in getting user")
        res.status(400).json({error: "error in getting user info"})
    }
});







router.get('/myposts',(req,res)=>{res.send('POST A JOB FORML FILL KRNY K BAD YAHA SHOW HONA CHAIE USY USKI JOB POSTS ');});

router.get('/settings',(req,res)=>{ res.send('change password');
res.send('change email address');res.send('update my profile');});
   
router.get('/messages',(req,res)=>{ res.send('hello from messages'); });  

// router.get('/signup',(req,res)=>{ res.send('hello from signup'); });    
//  router.get('/login',middleware(),(req,res)=>{ res.send('hello from login'); });    

module.exports = router;

