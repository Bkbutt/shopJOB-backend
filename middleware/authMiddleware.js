const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

const protect = async (req, res, next) => {
    let token

    
    // console.log("hearder", req.headers.authorization)
    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decode =  jwt.verify(token, process.env.SECRET_KEY)
            req.user = await User.findById(decode._id)
            next()
        } catch (error) {
            return res.status(401).json({
                msg: 'not authorize , no token'
            })
        }

        
    }
    

    if(!token){
        // console.log('no token')
        return res.status(401).json({
            msg: 'not authorize , no token'
        })  
    }
}


module.exports = protect 