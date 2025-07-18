const express = require("express");
const app = express();
const { auth } = require("./middleware/authentication");

// CURD: Create Read Update Delete

// Database : array

app.use(express.json());

const FoodMenu = [
  { id: 1, food: "Chowmein", category: "veg", price: 500 },
  { id: 2, food: "Paneer Butter Masala", category: "veg", price: 350 },
  { id: 3, food: "Chicken Biryani", category: "non-veg", price: 450 },
  { id: 4, food: "Veg Burger", category: "veg", price: 150 },
  { id: 5, food: "Egg Roll", category: "non-veg", price: 120 },
  { id: 6, food: "Momos", category: "veg", price: 100 },
  { id: 7, food: "Fish Curry", category: "non-veg", price: 400 },
  { id: 8, food: "Dal Tadka", category: "veg", price: 200 },
  { id: 9, food: "Butter Chicken", category: "non-veg", price: 480 },
  { id: 10, food: "Aloo Paratha", category: "veg", price: 80 },
  { id: 11, food: "Spring Rolls", category: "veg", price: 180 },
  { id: 12, food: "Mutton Rogan Josh", category: "non-veg", price: 550 },
  { id: 13, food: "Palak Paneer", category: "veg", price: 320 },
  { id: 14, food: "Grilled Chicken", category: "non-veg", price: 470 },
  { id: 15, food: "Veg Fried Rice", category: "veg", price: 220 },
  { id: 16, food: "Chicken Lollipop", category: "non-veg", price: 300 },
  { id: 17, food: "Rajma Chawal", category: "veg", price: 150 },
  { id: 18, food: "Prawn Curry", category: "non-veg", price: 600 },
  { id: 19, food: "Masala Dosa", category: "veg", price: 130 },
  { id: 20, food: "Chicken Shawarma", category: "non-veg", price: 250 },
];

const AddToCart = [];
// user ke jo bhi food add hoga , wo idhr cart me add hoga

app.get("/food", (req, res) => {
  res.status(200).send(FoodMenu);
});

//  Aunthentication admin here - middlware
// app.use("/admin", auth);

app.post("/admin", auth, (req, res) => {
  //   const token = "ABCDEF";
  //   const Access = token === "ABCDEF" ? 1 : 0;

  FoodMenu.push(req.body);
  res.status(201).send({ message: "Item Added Successfully", FoodMenu });
});

app.delete("/admin/:id", auth, (req, res) => {
  //   const token = "ABCDEF";
  //   const Access = token === "ABCDEF" ? 1 : 0;

  const id = parseInt(req.params.id);
  const index = FoodMenu.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).send("Item does not exist");
  } else {
    FoodMenu.splice(index, 1);
    res.status(200).send("Item successfully deleted");
  }
});
app.patch("/admin", auth, (req, res) => {
  //   const token = "ABCDEF";
  //   const Access = token === "ABCDEF" ? 1 : 0;

  const id = req.body.id;
  const fooddata = FoodMenu.find((item) => item.id === id);

  if (!fooddata) {
    return res.status(404).send("Item not found");
  }

  if (req.body.food) fooddata.food = req.body.food;
  if (req.body.category) fooddata.category = req.body.category;
  if (req.body.price) fooddata.price = req.body.price;

  res
    .status(200)
    .send({ message: "Item updated successfully", updatedItem: fooddata });
});

app.post("/user/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const foodItem = FoodMenu.find((item) => item.id === id);
    if (foodItem) {
      AddToCart.push(foodItem);
      res.status(200).send("item added successfully");
    } else {
      res.send("item out of stock");
    }
  } catch (err) {
    res.send(err);
  }
});

app.delete("/user/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = AddToCart.findIndex((item) => item.id === id);
    if (index !== -1) {
      AddToCart.splice(index, 1);
      res.status(200).send("Item removed from cart successfully");
    } else {
      res.send("Item not found in cart");
    }
  } catch (err) {
    res.send("Some error: " + err);
  }
});

app.get("/user", (req, res) => {
  if (AddToCart.length === 0) {
    res.send("Cart is empty");
  } else {
    res.send(AddToCart);
  }
});
app.get("/dummy", (req, res) => {
  try {
    // JSON.parse("Invalid json");
    // JSON.parse('{"name" : "thv"}');
    throw new Error("BROKEN");
    res.send("Hello Coder");
  } catch (error) {
    res.send("some error occured" + error);
  }

  // throw new Error('DB cant connected');
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
