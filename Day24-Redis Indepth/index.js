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
require("dotenv").config();
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter")

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", userRouter);

main()
  .then(async () => {
    console.log("connected to DB");

    // Start server
    app.listen(process.env.PORT, () => {
      console.log("Listening at port 4000");
    });

    // Sample query: find user
    const result = await User.find({ name: "savi" });
    // console.log(result);
  })
  .catch((err) => console.log(err));
