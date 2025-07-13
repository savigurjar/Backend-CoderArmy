const express = require("express");
const app = express();

// route handlers - function
// route handler ko array ke ander bhi rkh skte h
// app.use(route,[RH,RH,RH,RH]);
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("first");
//     // res.send("Hello jii");
//     next();
//     console.log("sixth");
//   },
//   //   ek hi response send kr skte h
//   (req, res, next) => {
//     console.log("second");
//     // res.send("Hello i am second");
//     next();
//     console.log("fifth");
//   },
//   app.use("/user", (req, res) => {
//     console.log("third");
//     res.send("Hello i am third");
//     console.log("fourth");
//   })
// );


// maintain logs through middleware
app.use("/user",(req,res,next)=>{
 console.log(`${Date.now()} ${req.method} ${req.url}`)
//  authentication , authorization 
 next();
})
app.get("/user", (req, res) => {
  // console.log(`${Date.now()} ${req.method} ${req.url}`);
  res.send("Info about user");
});
app.post("/user", (req, res) => {
  // console.log(`${Date.now()} ${req.method} ${req.url}`);
  res.send("info saved");
});
app.delete("/user", (req, res) => {
  // console.log(`${Date.now()} ${req.method} ${req.url}`);
  res.send("Info deleted");
});

// reques : log ko maintain krna hota h
// timing: kis tupe ki request thi  , url kya tha

app.listen(4000, () => {
  console.log("Listening at port 4000");
});
