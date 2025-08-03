const express = require("express");
const app = express();

const restaurant = [
  { id: 1, foodname: "dal bati", price: 300 },
  { id: 2, foodname: "noodles", price: 50 },
  { id: 3, foodname: "momos", price: 30 },
];
// parser
app.use(express.json());

app.get("/food", (req, res) => {
  res.send(restaurant);
});
app.get("/food/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const Food = restaurant.find((info) => info.id === id);
  res.send(Food);
});
app.post("/food", (req, res) => {
  restaurant.push(req.body);
  res.send("Data saved Successfully");
});


app.listen(5000, (req, res) => {
  console.log("listening at 5000");
});
