// Using Node.js `require()`
const mongoose = require("mongoose");
// add schema
const { Schema } = mongoose;

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
const User = mongoose.model("user", userSchema);

module.exports = User;
