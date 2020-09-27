const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbName = "organicDB";
const dbUser = "organicUser";
const dbPassword = "rGflBHE0WyTvdzOd";

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.r0hn7.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

client.connect((err) => {
  const collection = client.db("organicDB").collection("products");
  // perform actions on the collection object
  console.log("Database connected");
  //   const product = { name: "Apple", price: 200, quantity: 15 };
  //   collection
  //     .insertOne(product)
  //     .then(() => console.log("Product added"))
  //     .catch((err) => console.log(err));

  app.get("/products", (req, res) => {
    collection
      .find({})
      .toArray()
      .then((result) => res.json(result));
  });

  app.post("/addProduct", (req, res) => {
    const { name, price, quantity } = req.body;
    const product = { name, price, quantity };
    collection
      .insertOne(product)
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  });

  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectId(id) })
      .then((result) => {
        res.send(result.deletedCount > 0);
      })
      .catch((err) => console.log(err));
  });

  app.patch("/update/:id", (req, res) => {
    collection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            price: req.body.price,
            quantity: req.body.quantity,
            name: req.body.name,
          },
        }
      )
      .then((product) => res.send(product));
  });

  app.get("/product/:id", (req, res) => {
    collection
      .findOne({ _id: ObjectId(req.params.id) })
      .then((product) => res.send(product));
  });

  app.listen(5000, () => console.log("Server started on port 3000"));
});
