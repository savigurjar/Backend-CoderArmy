const fs = require("fs");
setTimeout(() => {
  console.log("konnichiwa");
}, 3000);

// v8-engine -> libuv -> os

fs.readFile("./Day3/data.json", "utf-8", (err, res) => {
  console.log(res);
});
