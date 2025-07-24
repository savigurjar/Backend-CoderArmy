// Using Node.js `require()`
const mongoose = require("mongoose");
// add schema
const { Schema } = mongoose;
async function main() {
  // connect to cluster
  await mongoose.connect(
    "mongodb+srv://savigurjar:Hunter12@cluster0.rapodec.mongodb.net/BookStore"
  );
}

module.exports = main;
