// Using Node.js `require()`
const mongoose = require("mongoose");
// add schema
const { Schema } = mongoose;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true, //firstname require rhega
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
      min: 14,
      max: 78,
      required: true,
    },
    gender: {
      type: String,
      // enum: ["male", "female", "others"],
      validate(value) {
        if (!["male", "female", "others"].includes(value))
          throw new Error("Invalid Gender");
      },
    },
    emailId: {
      type: String,
      required: true, // this also nhi to platform ke under register kr paoge
      unique: true,
      trim: true, //duplicate and space find ,
      lowercase: true,
      immutable: true, // change nhi kr skte ab email id
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String, //link store hogi
      default: "This is the default photo ",
    },
  },
  { timestamps: true }
);
userSchema.methods.getJwt = function () {
  const ans = jwt.sign(
    { _id: this._id, emailId: this.emailId },
    process.env.SECRET_KEY,
    {
      expiresIn: 100,
    }
  );
  return ans;
};
userSchema.methods.getVerify = async function (userpassword) {
  const ans = await bcrypt.compare(userpassword, this.password);
  return ans;
};
const User = mongoose.model("user", userSchema);

module.exports = User;
