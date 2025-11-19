const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
    },
    password: {
        type: String,
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

module.exports = mongoose.model("User", userSchema)