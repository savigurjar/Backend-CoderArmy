const express = require('express');
const app = express();

// app.use("/user",(req,res)=>{
//     res.send("Hello Coder Army");
// })
app.get("/user",(req,res)=>{
    res.send("Hello Coder Army");
})

app.post("/user",(req,res)=>{
    console.log("Data saved successfully");
    res,send("Data saved successfully");
})
// get-server se data lena fetch krke
// ,post- server ko data dena
// ,patch- data update krna
// ,put- data ko replace krna
// ,delete- data ko delete krna
app.listen(5000,()=>{
    console.log("Listening at port 5000");
})