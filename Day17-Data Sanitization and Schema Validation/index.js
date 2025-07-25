// CRUD : create read update delete

const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users");

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.send("User Registered successfully");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

app.get("/info", async (req, res) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (err) {
    res.send("Error" + err.message);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    if (!result) {
      return res.status(404).send("User not found");
    }
    res.send(result);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("Deleted successfully");
  } catch (err) {
    res.send("error" + err.message);
  }
});

app.patch("/user", async (req, res) => {
  try {
    const { _id, ...update } = req.body;
    await User.findByIdAndUpdate(_id, update);
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
