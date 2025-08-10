const express = require("express");
const authRouter = express.Router();
const User = require("../Models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateUser = require("../utils/validate");

authRouter.post("/register", async (req, res) => {
  try {
    validateUser(req.body);

    // converting password into hashing
    req.body.password = await bcrypt.hash(req.body.password, 10);

    await User.create(req.body);
    res.send("User Registered successfully");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    // validate karna

    // const people = await User.findById(req.body._id);
    const people = await User.findOne({ emailId: req.body.emailId });

    const IsAllowed = people.getVerify(req.body.password);
    if (!IsAllowed) {
      throw new Error("Invalid credentials");
    }

    // jwt tokan - cookie ki help se bhejege
    const token = people.getJwt();
    res.cookie("token", token);
    // res.cookie("token", "hksihrighlshjghgfjkhgmkhgjkgg");

    res.send("login successfully");
  } catch (err) {
    res.send("Error " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    // res.cookie("token", "hsdjkfkd");
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).send("logout successfully");
  } catch (err) {
    res.send("Error " + err.message);
  }
});

module.exports = authRouter;
