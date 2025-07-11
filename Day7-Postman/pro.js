const express = require("express");
const app = express();

const BookStore = [
  { id: 1, name: "Beyond the Scene", author: "BTS" },
  { id: 2, name: "Friends", author: "David Crane" },
  { id: 3, name: "Nexus", author: "Coder" },
  { id: 4, name: "The Alchemist", author: "Paulo" },
  { id: 5, name: "The Power of Now", author: "Eckhart Tolle" },
];
app.use(express.json());

// Get all books
app.get("/book", (req, res) => {
  res.send(BookStore);
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
app.post("/book",(req,res)=>{
    BookStore.push(req.body);
    res.send("Data Saved Successfully")
})

app.listen(4000, () => {
  console.log("Listening at port 4000");
});
