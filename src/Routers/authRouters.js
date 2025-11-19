const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
  try {
    const { firstName, lastName, emailID, password, age, gender } = req.body;
    const existingUser = await User.findOne({ emailID });
    if (existingUser) {
      return res.status(409).send("User already exists!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: hashedPassword,
      age,
      gender,
    });
    const saveData = await user.save();
    const token = await saveData.getJWT();
    res.cookie("token", token);
    res.status(201).send(saveData);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

authRouter.post("/signIn", async (req, res) => {
  try {
    const { emailID, password } = req.body;
    const user = await User.findOne({ emailID });
    if (!user) {
      return res.send("Invalid credentials");
    }
    const passwordCheck = await user.dehashPassword(password);
    if (!passwordCheck) {
      return res.send("Invalid Password");
    } else {
      const token = user.getJWT();
      res.cookie("token", token);
      res.send("Login successful!!");
    }
  } catch (err) {
    res.send(err.message);
  }
});

authRouter.post("/signOut", async(req,res) =>{
    try{
        res.cookie("token", null).send("SignOut Successful!!")
    }catch(err){
        res.send(err.message)
    }
})

module.exports = authRouter;
