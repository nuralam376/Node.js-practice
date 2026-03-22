const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname,"public")));

const PORT = 8080;

app.get("/", (req,res) => {
    res.send("Welcome!");
});


app.get("/home", (req,res) => {
    let followers = ["Abc", "Def", "Ghi", "Jkl"];
    let random = Math.floor(Math.random() * 6) + 1;
    res.render("home" ,{ random, followers });
});

app.get("/:username", (req,res) => {
    const { username } = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data) {
        res.render("instagram.ejs", {
            data
        }); 
    } else {
        res.render("error");
    }
});


app.listen(PORT,() => console.log(`Server started on port ${PORT}`));