const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bcryptinzi = require('bcrypt-inzi');
const { select } = require('underscore');
const jwt = require('jsonwebtoken');
const { options } = require('nodemon/lib/config');


const userSchema = mongoose.Schema({
  email:{ type: String , required: true, Unique:true} ,
  password:{ type: String , required : true} ,
   cpassword:{ type: String , required : true} ,

   name:{ type: String , required : true} ,
    city:{ type: String , required: true},
    dob:{ type: Date , required: true} ,

   address:{ type: String , required:true} ,
   phoneno:{ type: Number } ,
   
   qualification:{ type: String },
   tokens:[
    {
      token:{type: String , required:true   }
    }
   ] });

//middleware for pass hashing
userSchema.pre('save', async  function(next){
    console.log('middeleware called before save');
   if (this.isModified('password')){
     this.password =  await bcrypt.hash(this.password,12); // const this.password = .. (not working)
     this.cpassword = await bcrypt.hash(this.cpassword,12);
     console.log('hashed');
    }  
    next();
});

//token 
userSchema.methods.generateAuthToken = async function(){
     try{
       let token= jwt.sign({_id: this._id},process.env.SECRET_KEY);//left id is of schema
       this.tokens= this.tokens.concat({token:token}); //LEFT TOKEN is of userschema.right is of upper generated
        await this.save();
        // console.log('my token',token);
        return token; //
      }
      catch(err){
          console.log(err); 
        }
}
//wanna save signup fileds in  profile schema
 

const User = mongoose.model('USER',userSchema);
module.exports = User;


