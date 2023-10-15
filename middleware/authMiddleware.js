const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const users = require('../models/user')

const protect = asyncHandler( async(req, res, next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get bearer token
            token = req.headers.authorization.split(' ')[1]
            //token verification
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
            //get user from the derived token
            req.user=await users.findById(decoded.id).select('-password')

            //call next middleware
            next();
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized, no token available')
    }
})

module.exports = protect