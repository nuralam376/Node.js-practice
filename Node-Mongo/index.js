const express = require("express");
const app = express();

const rootCall = (req, res) => {
  res.send("Hello Node.js!");
};

app.get("/", rootCall);

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
