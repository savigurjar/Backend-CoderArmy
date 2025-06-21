const http = require("http");
const server = http.createServer((req, res) => {
  // res.end("Hello Coder Army")
  if (req.url == "/") {
    res.end("Hello Coder Army");
  } else if (req.url == "/contact") {
    res.end("This is our contact page");
  } else if (req.url == "/about") {
    res.end("This is our about page");
  } else {
    res.end("Error: Page not found");
  }
});
// dafult 80
server.listen(4000, () => {
  console.log("i am listening at port number 4000");
});
