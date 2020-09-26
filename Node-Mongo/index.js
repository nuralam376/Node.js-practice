const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const users = ["Abc", "Def", "Ghi", "jkl"];

const rootCall = (req, res) => {
  res.send("Hello Node.js!");
};

app.get("/", rootCall);

app.get("/fruits", (req, res) => {
  const fruits = {
    fruit: "Potato",
    price: 20,
  };
  res.send(fruits);
});

app.get("/fruit/banana", (req, res) => {
  const fruit = {
    fruit: "banana",
    quantity: 100,
    price: 1000,
  };
  res.send(fruit);
});

app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  const name = users[userId];
  const query = req.query.sort;
  res.send({ userId, name });
});

app.post("/user", (req, res) => {
  console.log("Body", req.body);
  const user = req.body;
  user.id = users.length + 1;
  user.name = user.name;
  res.send(user);
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
