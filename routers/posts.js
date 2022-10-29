const express= require('express');
const router = express.Router();
require('../db/conn');
const User = require('../models/userSchema');
const Post = require('../models/postSchema')
const bcrypt= require('bcryptjs');
const { findOne } = require('../models/userSchema');
const jwt = require('jsonwebtoken');   // const middleware = (req,res,next)=>{console.log('i am middleware'); next();}
const     cokiparser    = require('cookie-parser');
const jobPost = require('../models/postSchema');
const profile = require('../models/profileSchema');
const e = require('express');

const protect = require('../middleware/authMiddleware.js')

router.get('/findjobs',(req,res)=>{res.send('here you can see jobs offeredd')});


          
// fill post job form 
router.post('/postjob',async(req,res)=>{ 
      const {shopname,img,imgback,jobname,timing,shoploc,age, workersReq,experience,salary,description}= req.body;
      if(!shopname||!jobname||!timing||!shoploc||!workersReq||!salary){ //required credentials
            return res.status(422).json({error:"Please fill the required fields"}); 
      }
      try{
            const post = new jobPost({shopname,img,imgback,jobname,timing,shoploc,age,workersReq,experience,salary,description});
            await post.save();
      } catch(err){
            console.log(err);
      }                       
});


      
          
//apply for a job
router.post('/applyjob',async(req,res)=>{
      //if not fields return error fields are necessary

      try{
            replacements = req.body
            receiverEmail = req.body.receiverEmail
            try {
                  transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                              user: "",
                              pass: ""
                        }
                        
                  });
                  readHTMLFile('./htmlTemplates/email.html', function(err, html) {
                        var template = handlebars.compile(html)
                        const htmlToSend = template(replacements);

                        var mailOptions = {
                        from: 'shopJOB <foobar@example.com>',
                        to: `${receiverEmail}`,
                        subject: "Email for Job Application",
                        html: htmlToSend
                  };

                  transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                              console.log(error);
                        } else {
                              console.log('Email sent: ' + info.response);
                              return info.response
                        }
                  });  
                  }); 
            } catch (error) {
                  console.log(error);          
            } 
            
      } catch(err){
            console.log(err);
      }                       
});
   


router.put('/post/:id',async(req,res) => {
      try {
            let update = req.body
            let post = await Post.findByIdAndUpdate(id, update )
            console.log("user after findByIdAndUpdate", post)
            res.status(200).json({success: true, post: post })
      } catch (error) {
          console.log("error in getting user")
          res.status(400).json({error: "error in getting user info"})
      }
});
  

//search
router.put('/post/search',async(req,res) => {
      try {
            let { job, location, shop_name } = req.query
            let search = {}
            if(job){
                  search["job"] = {job}
            }
            if(location){
                  search["location"] = {location}
            }
            if(shop_name){
                  search["shop_name"] = {shop_name}
            }
            
            let post = await Post.find(search)
            res.status(200).json({ success: true, data: post })
      } catch (error) {
          console.log("error in getting user")
          res.status(400).json({error: "error in getting user info"})
      }
});

 

module.exports = router;




var readHTMLFile = function(path, callback) {
      fs.readFile(path, {encoding: 'utf-8'}, (err, html) => {
          if (err) {
              throw err;
              callback(err);
          }
          else {
              callback(null, html);
          }
      });
};