const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// username password cluster 
// @ === %40(hexadecimal: 0x40) is used to encode special character 
const url = process.env.DB_CONNECT_KEY;
 
const client = new MongoClient(url);

// Database Name
const dbName = "OnePiece";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("user");

  // the following code examples can be pasted here...
//   const findResult = await collection.find({}).toArray();
// console.log('Found documents =>', findResult);

// const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
// console.log('Inserted documents =>', insertResult);

const deleteResult = await collection.deleteMany({ a: 3 });
console.log('Deleted documents =>', deleteResult);
  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
