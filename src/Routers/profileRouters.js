const express = require("express")
const userAuth = require("../middlewares/userAuth")
const isUpdateValid = require("../Validators/profileUpdateValidator")
const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async(req,res) =>{
    try{
        const user = req.user
        res.send(user)
    }catch(err){
        res.send(err.message)
    }

} )

profileRouter.patch("/profile/edit", userAuth, async(req,res) =>{
    try{
        if(!isUpdateValid(req)){
            throw new Error("Invalid Update!")
        }
        const loggedinUser = req.user
        Object.keys(req.body).forEach(key =>  loggedinUser[key] = req.body[key] )
        await loggedinUser.save()
        res.send(loggedinUser)
    }catch(err){
        res.send(err.message)
    }   
})



module.exports = profileRouter