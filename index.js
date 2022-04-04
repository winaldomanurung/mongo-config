const express = require("express");
const cors = require("cors");

const PORT = 2000;
const app = express();

app.use(cors());
app.use(express.json());

let { MongoClient, ObjectId } = require("mongodb");
let url =
  "mongodb+srv://winaldo:admin123@cluster0.twkcp.mongodb.net/kantor?retryWrites=true&w=majority";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to MongoDB Cloud");
});

app.get("/", (req, res) => {
  res.status(200).send("<h4>Integrated Mongo with Express</h4>");
});

app.listen(PORT, () => console.log`API Mongo is running on PORT: ${PORT}`);
