const express = require("express");
const app = express();

app.use(
  "/user",
  (req, res) => {
    console.log("first");
    res.send("Hello jii");
  }
//   ek hi response send kr skte h 
//   ,
//   (req, res) => {
//     console.log("second");
//     res.send("Hello i am second");
//   }
);

app.listen(4000, () => {
  console.log("Listening at port 4000");
});
