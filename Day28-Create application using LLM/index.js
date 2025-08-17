const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./aichat");

app.use(express.json()); //data json format me aata use object me convert krte h

const chatHistory = {};
// database
//we will install our user chat history here

app.post("/chat", async (req, res) => {
  const { id, msg } = req.body;
  if (!chatHistory[id]) {
    chatHistory[id] = [];
  }
  // history+ques : array
  const History = chatHistory[id];
  const promptMsg = [
    ...History,
    {
      role: "user",
      parts: [{ text: msg }],
    },
  ];

  const answer = await main(promptMsg);
  History.push({ role: "user", parts: [{ text: msg }] });
  History.push({ role: "model", parts: [{ text: answer }] });

  res.send(answer);
});

app.listen(process.env.PORT, () => {
  console.log(`app is listening at port ${process.env.PORT}`);
});
