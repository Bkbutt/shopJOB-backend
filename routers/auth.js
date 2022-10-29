const express= require('express');
const router = express.Router();
require('../db/conn');
const User = require('../models/userSchema');
const bcrypt= require('bcryptjs');
const { findOne } = require('../models/userSchema');
const jwt = require('jsonwebtoken');   // const middleware = (req,res,next)=>{console.log('i am middleware'); next();}
const     cokiparser    = require('cookie-parser');
const jobPost = require('../models/postSchema');
const profile = require('../models/profileSchema');
const e = require('express');




//sgnup
router.post('/register',async (req, res)=>{
       const {email,password,cpassword,name,city,dob,address,phoneno,qualification}= req.body;
        if(!email || !password ||!cpassword ||!name||!city||!dob ||!address)
              {  return res.status(422).json({error:"Please fill the required fields"}); }
         try{
            const userExists= await User.findOne({email:email});
            if(userExists){
                 return res.status(422).json({error:'Email already exists!'});
             } 
             else if(password != cpassword) {
                return res.status(422).json({error:'passwords dont match!'}); 
             }
             else{
                 const user = new User({email,password,cpassword,name,city,dob,address,phoneno,qualification});//dbname:nameoffrontendField
                //pre middleware for password hsshing will be called before save()
                 await user.save();
                 res.status(201).json({message:'User registered successfully'});
             }
             
            } 
            catch(err){
            console.log(err);
            }                           
    });

 //login

    router.post('/login',async (req,res)=>{
    try{
         // console.log(req.body);
            const {email, password} = req.body;
            if(!email || !password){
               return res.status(400).json({message:"please fill both credendials!"});
                                   }
      
                const userLogin  =await User.findOne({email:email}); //returns whole.left email isdb email
                                          //    console.log(userLogin);
            
                if(userLogin){            //if mail correct

                const isPassMatch =await bcrypt.compare(password, userLogin.password); //left db
                var token =await  userLogin.generateAuthToken();//return token generated by userscheme.method fnc
                console.log(token);
                 res.cookie("jwtoken", token,{             //nameof cokke and val of token
                    expires:new Date(Date.now()+25892000000), httpOnly:true
                    } );

                  if (!isPassMatch)
                      {  res.json({message:"invalid credendial1s !"});}//inval pass
                  else{
                     console.log('token',token);
                  res.json({
                     message:"login successful",
                     token:token, 
                     user: userLogin   
                  });
                  }
            } 
            else {
                 res.json({message:"Invalid Cdredentials!"});//invalid email
                  }

                  }  catch(err){
            console.log(err);}
         });
          

//settings
   // 
   
   router.post('/settings/changepass', async (req,res)=>{
         console.log("in the settinngs");
         const {email,oldpass,newpass, cfmpass} = req.body;
         if(!email || !oldpass ||!newpass || !cfmpass){
         return res.status(400).json({message:"please fill credendials!"});
         }

         try{     

            const user = await User.findOne({email:email});  
            if(user) {
                   console.log('i am the user',user);
                  const PassMatch =await bcrypt.compare(oldpass,user.password);
                  if(PassMatch){
                     console.log('inside match password');
                     if(newpass != cfmpass) {
                        console.log('checking new passes');
                        return res.status(422).json({error:' New passwords dont match!'}); 
                     }else{
                        user.set({password:newpass});
                        await user.save();
                        return res.status(200).json({message: "pasword changes successfully"})
                     }
                  }else{ 
                     console.log('pass old not match');
                     return res.status(422).json({error:'invalid credential'}); 
                  }
            }else{ 
               console.log('user with this email not found');
               return res.status(422).json({error:'user with this email not found'});  
            }     
         }catch(err){
            console.log(err);
            return res.status(400).json({message: "error in changing password"})
         }
});




router.get('/settings',(req,res)=>{ res.send('change password');
res.send('change email address');res.send('update my profile');});
   
router.get('/messages',(req,res)=>{ res.send('hello from messages'); });  

// router.get('/signup',(req,res)=>{ res.send('hello from signup'); });    
//  router.get('/login',middleware(),(req,res)=>{ res.send('hello from login'); });    

module.exports = router;





















// User.findOne({email:email}).then((userExists)=> {
//     if (userExists){ return res.status(422).json({error:'Email already exists!'});
//                    }
//  const user = new User({name,password,cpassword,age,email,address,phoneno,experience,salary,description});//dbname:nameoffrontendField
    
//  user.save().then(()=>{
//     res.status(201).json({message:'User registered successfully'});
//  }).catch((err)=>{res.status(500).json({message:'registration failed'});})
