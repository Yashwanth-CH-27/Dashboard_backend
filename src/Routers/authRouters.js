const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const authRouter = express.Router()

authRouter.post("/signUp", async(req,res) => {
    try{
        const {firstName, lastName, emailID, password, age, gender} = req.body;
        const existingUser = await User.findOne({emailID})
        if(existingUser){
            return res.status(409).send("User already exists!")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            firstName,
            lastName,
            emailID,
            password: hashedPassword,
            age,
            gender
        })
        const saveData = await user.save()
        res.status(201).send(saveData)

    }catch(err){
        res.status(404).send(err.message)
    }
})

module.exports = authRouter