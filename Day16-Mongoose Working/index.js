// CRUD : create read update delete

const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users");

app.use(express.json());

app.get("/info", async (req, res) => {
  //   res.send("Hello Coder Army");
  const ans = await User.find({});
  res.send(ans);
});

app.post("/info", async (req, res) => {
  //   const ans = new User(req.body);
  //   await ans.save();
  try {
    await User.create(req.body);

    res.send("Successfully updated");
  } catch (err) {
    res.status(404).send(err);
  }
});

app.delete("/info", async (req, res) => {
  await User.deleteOne({ name: "savi" });
  res.send("Deleted succesfully");
});

// app.put("/info", async (req, res) => {
//   const result =  await User.updateOne({ name: "tata" }, { age: 21 });
//   res.send("Update successfully");
// });
app.put("/info", async (req, res) => {
  try {
    const result = await User.updateOne(
      { name: "tata" },
      {  age: 21  }
    );

    res.send("Updated successfully");
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).send("Internal Server Error");
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
