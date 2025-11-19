const jwt = require("jsonwebtoken")
const User = require("../models/user")
require("dotenv").config()

const userAuth = async (req,res,next) =>{
    try{
        const {token} = req.cookie
        if(!token){
            return res.send("Please SignIn!")
        }
        const decodeToken = await jwt.verify(token, process.env.JWT_SECRET, {expiresIn: "3d"})
        const {_id} = decodeToken
        const user = await User.findOne(_id)
        req.user = user
        if(!user){
            throw new Error("User not found!")
        }
        next()
    }catch(err){

    }
}

module.exports = userAuth