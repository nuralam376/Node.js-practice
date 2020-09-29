const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const serviceAccount = require("./configs/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB,
});

const PORT = 5000;
const dbname = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
let bookings;

app.get("/", (req, res) => {
  res.send("Hello Node.js");
});

app.post("/addBooking", (req, res) => {
  const newBooking = req.body;
  bookings
    .insertOne(newBooking)
    .then((data) => res.send(data.insertedCount > 0))
    .catch((err) => res.send(err));
});

app.get("/bookings", (req, res) => {
  const queryEmail = req.query.email;
  const bearer = req.headers.authorization;

  if (bearer && bearer.startsWith("Bearer ")) {
    const idToken = bearer.split(" ")[1];

    // idToken comes from the client app
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(function (decodedToken) {
        let userEmail = decodedToken.email;
        if (userEmail === queryEmail) {
          bookings.find({ email: userEmail }).toArray((err, documents) => {
            res.status(200).send(documents);
          });
        } else {
          return res.status(401).send("Unauthorized access");
        }
      })
      .catch(function (error) {
        // Handle error
        return res.status(401).send("Unauthorized access");
      });
  }
});

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.r0hn7.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  bookings = client.db(dbname).collection("bookings");
  // perform actions on the collection object
  console.log("Database Connected");
  app.listen(PORT, () => console.log("Server Started"));
});
