import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


//check token
const protect = asyncHandler(async(req, res, next) => {
    let token

    //if token is in headers
    if(
        req.headers.authorization 
        && req.headers.authorization.startsWith('Bearer')
        )
        {
            
            try{
                //get the token from header
                //[0] = Bearer , [1] = token
                token = req.headers.authorization.split(' ')[1]
                //verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                
                //get user and remove password
                req.user = await User.findById(decoded.id).select('-password')
                
                next()
            } catch(error){
                console.error(error)
                res.status(401)
                throw new Error('Not authorized, token failed')
            }

    }

    
    if(!token){
        res.status(401)
        throw new Error('Not authorized')
    }
    
})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized, admin only')
    }

}

export {
    protect,
    admin
}