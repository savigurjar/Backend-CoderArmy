// // Using Node.js `require()`
// const mongoose = require("mongoose");
// // add schema
// const { Schema } = mongoose;
// async function main() {
//   // connect to cluster
//   await mongoose.connect(
//     process.env.DB_CONNECT_KEY
//   );

//   // code likhna start kr do
//   const userSchema = new Schema({
//     name: String,
//     age: Number,
//     city: String,
//     gender: String,
//   });

//   // model create:collection create krna(table create krna)
//   // class create ki h
//   const User = mongoose.model("user", userSchema);

//   // document ko create kiya h ya fir object ko
// //   const user1 = new User({
// //     name: "Tae",
// //     age: 29,
// //     city: "Seoul",
// //     gender: "Male",
// //   });
// //   await user1.save(); //save to DB
// //   // or
// //   await User.create({ name: "savi", city: "Indore", age: 30 });
// //   // or
// //  await User.insertMany([
// //     { name: "luffy", age: 19 },
// //     { age: 21, gender: "male" }
// //   ]);

//   // find all document
//   // const ans = await User.find({});
//   // console.log(ans);

//   // find doc by particular field
// //  const result = await User.find({name:"savi"})
// //  console.log(result);
// }

// main()
//   .then(() => console.log("connected to DB"))
//   .catch((err) => console.log(err));
