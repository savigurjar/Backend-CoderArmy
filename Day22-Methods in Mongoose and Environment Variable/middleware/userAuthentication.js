const jwt = require("jsonwebtoken");
const User = require("../Models/users");

const userAuth = async (req, res, next) => {
  try {
    //  authenciate krne ke liye bhi code likhna pdhega
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const { _id } = payload;
    if (!_id) {
      throw new Error("Id is missing");
    }
    const result = await User.findById(_id);
    if (!result) {
      return res.status(404).send("User not found");
    }
    req.result = result;
    console.log("user authentication");
    next();
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};
module.exports = userAuth;
