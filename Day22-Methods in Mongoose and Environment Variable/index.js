// CRUD : create read update delete

const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users");
const validateUser = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middleware/userAuthentication");

app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    // validate karna

    // const people = await User.findById(req.body._id);
    const people = await User.findOne({ emailId: req.body.emailId });

    const IsAllowed = await bcrypt.compare(req.body.password, people.password);
    if (!IsAllowed) {
      throw new Error("Invalid credentials");
    }

    // jwt tokan - cookie ki help se bhejege
    const token = jwt.sign(
      { _id: people._id, emailId: people.emailId },
      "SAVIV1230",
      { expiresIn: 100 }
    );
    res.cookie("token", token);
    // res.cookie("token", "hksihrighlshjghgfjkhgmkhgjkgg");

    res.send("login successfully");
  } catch (err) {
    res.send("Error " + err.message);
  }
});

app.get("/user", userAuth, async (req, res) => {
  try {
    //  authenciate krne ke liye bhi code likhna pdhega

    res.send(req.result);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.delete("/user/:id", userAuth, async (req, res) => {
  try {
    // authenticate the user : token

    await User.findByIdAndDelete(req.params.id);
    res.send("Deleted successfully");
  } catch (err) {
    res.send("error" + err.message);
  }
});

app.patch("/user", userAuth, async (req, res) => {
  try {
    const { _id, ...update } = req.body;
    await User.findByIdAndUpdate(_id, update, { runValidators: true });
    res.send("Updated Successfully");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

main()
  .then(async () => {
    console.log("connected to DB");

    // Start server
    app.listen(4000, () => {
      console.log("Listening at port 4000");
    });

    // Sample query: find user
    const result = await User.find({ name: "savi" });
    // console.log(result);
  })
  .catch((err) => console.log(err));
