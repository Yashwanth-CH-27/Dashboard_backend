const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please SignIn!");
    }

    const decodeToken = await jwt.verify(
      token,
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    const { _id } = decodeToken;
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(404).send("User not found!");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).send(err.message || "Unauthorized");
  }
};

module.exports = userAuth;
