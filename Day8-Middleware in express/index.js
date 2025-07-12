const express = require("express");
const app = express();

const BookStore = [
  { id: 1, name: "Beyond the Scene", author: "BTS" },
  { id: 2, name: "Friends", author: "David Crane" },
  { id: 3, name: "Nexus", author: "Coder" },
  { id: 4, name: "The Alchemist", author: "Paulo" },
  { id: 5, name: "The Power of Now", author: "Eckhart Tolle" },
  { id: 6, name: "Now", author: "Eckhart Tolle" },
];
app.use(express.json());

// Get all books
app.get("/book", (req, res) => {
  console.log(req.query);
  const Book = BookStore.filter((info) => info.author === req.query.author);
  res.send(Book);
});

// Get book by ID
app.get("/book/:id", (req, res) => {
  const id = parseInt(req.params.id); // Convert id from string to number
  const book = BookStore.find((info) => info.id === id);

  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: "Book not found" });
  }
});
app.post("/book", (req, res) => {
  BookStore.push(req.body);
  res.send("Data Saved Successfully");
});

app.patch("/book", (req, res) => {
  console.log(req.body);
  const book = BookStore.find((info) => info.id === req.body.id);
  if (req.body.author) book.author = req.body.author;

  if (req.body.name) book.name = req.body.name;

  res.send("Patch Updated");
});

app.put("/book", (req, res) => {
  const book = BookStore.find((info) => info.id === req.body.id);

  book.author = req.body.author;
  book.name = req.body.name;

  res.send("changes updated successfully");
});
app.delete("/book/:id", (req, res) => {
  const id = parseInt(req.params.id); // Convert to number
  const index = BookStore.findIndex((info) => info.id === id);

  BookStore.splice(index, 1);
  res.send("Successfully deleted");
});

app.listen(4000, () => {
  console.log("Listening at port 4000");
});
