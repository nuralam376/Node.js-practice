const express = require("express");
const app = express();

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


app.get("/", (req,res) => {
    res.send("Root Response");
});

app.get("/:username/:id", (req,res) => {
    const {username, id} = req.params;
    let htmlStr = `<h1>Welcome to the page of @${username}</h1>`;
    res.send(htmlStr);
});

app.get("/search", (req,res) => {
    const { q } = req.query;

    if(!q) {
        return res.send("Nothing searched");
    }
    res.send(`<h1>Search query ${q}</h1>`);
});

app.post("/", (req,res) => {
    res.send("Post Request Response");
});

app.use((req,res) => {
    res.status(404).send("Route not found");
})
