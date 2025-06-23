const express = require("express");
const app = express();

// Default route (will match any request if no other route matches first)

// app.use((req, res) => {
//     res.send({ "name": "tae", "age": 29, "occupation": "singer", "band": "BTS" });
// });

// Specific route for "/about"
app.use("/about/:id", (req, res) => {
    console.log(req.params)
    res.send({ "band": "BTS" });
});
app.use("/contact", (req, res) => {
    res.send( "i am your contact");
});
app.use("/",(req, res) => {
    res.send("homepage")
});

app.listen(3000, () => {
    console.log("Listening at port 3000");
});
