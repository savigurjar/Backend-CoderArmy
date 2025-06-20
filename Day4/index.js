const http = require('http');
const server = http.createServer((req,res)=>{
res.end("Hello Coder Army")
});
// dafult 80 
server.listen(4000,()=>{
    console.log("i am listening at port number 4000");
})