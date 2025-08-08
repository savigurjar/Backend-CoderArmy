// Using Node.js `require()`
const mongoose = require("mongoose");
// add schema
const { Schema } = mongoose;
async function main() {
  // connect to cluster
  await mongoose.connect(
    process.env.DB_CONNECT_KEY,
  );
}

module.exports = main;
