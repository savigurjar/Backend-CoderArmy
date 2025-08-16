const express = require("express");
const userRouter = express.Router();
const User = require("../Models/users");
const userAuth = require("../middleware/userAuthentication")

userRouter.get("/", userAuth, async (req, res) => {
  try {
    //  authenciate krne ke liye bhi code likhna pdhega

    res.send(req.result);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

userRouter.delete("/:id", userAuth, async (req, res) => {
  try {
    // authenticate the user : token

    await User.findByIdAndDelete(req.params.id);
    res.send("Deleted successfully");
  } catch (err) {
    res.send("error" + err.message);
  }
});

userRouter.patch("/", userAuth, async (req, res) => {
  try {
    const { _id, ...update } = req.body;
    await User.findByIdAndUpdate(_id, update, { runValidators: true });
    res.send("Updated Successfully");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = userRouter
