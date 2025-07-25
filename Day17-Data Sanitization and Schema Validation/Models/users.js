// Using Node.js `require()`
const mongoose = require("mongoose");
// add schema
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  photo: {
    type: String, //link store hogi
  },
});
const User = mongoose.model("user", userSchema);

module.exports = User;
