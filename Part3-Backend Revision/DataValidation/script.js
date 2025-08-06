const express = require("express");
const app = express();
const main = require("./data");
const User = require("./models/user");

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).send("client added successfully");
  } catch (err) {
    res.status(401).send("error " + err);
  }
});
app.get("/info", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).send(result);
  } catch (err) {
    res.status(401).send("error " + err);
  }
});
app.get("/info/:id", async (req, res) => {
  try {
    const id = await User.findById(req.params.id);
    res.status(200).send(id);
  } catch (err) {
    res.status(401).send("error " + err);
  }
});
app.delete("/info/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("delete sucessfully");
  } catch (err) {
    res.status(401).send("error " + err);
  }
});
app.put("/info", async (req, res) => {
  try {
    const { _id, ...update } = req.body;
    await User.findByIdAndUpdate(_id, update, { runValidators: true });
    res.status(200).send("update sucessfully");
  } catch (err) {
    res.status(401).send("error " + err);
  }
});

main()
  .then(() => {
    console.log("connect to DB ");
    app.listen(3000, (req, res) => {
      console.log("listening at port 3000");
    });
  })
  .catch((err) => console.log("error : " + err));
