// default get method
fetch("http://msndkvn.com");

const response = await fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    Name: "tae",
    age: 30,
  }),
});
