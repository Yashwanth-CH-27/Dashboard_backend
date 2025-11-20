const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const userSchema = mongoose.Schema( {
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    emailID: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        unique: true,
        require: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    }
},
{
    timestamps: true
}
 )

userSchema.methods.getJWT = async function(){
    const user = this
    const token = await jwt.sign( {_id: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"} )
    return token
}

userSchema.methods.dehashPassword = async function(password) {
    const user = this
    const validatePassword = await bcrypt.compare(password,user.password)
    return validatePassword
}

module.exports = mongoose.model("User", userSchema)