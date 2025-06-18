const fs = require("fs");
setTimeout(() => {
  console.log("konnichiwa");
}, 3000);

// v8-engine -> libuv -> os

fs.readFile("./data.json", (err, res) => {
  console.log(res);
});
