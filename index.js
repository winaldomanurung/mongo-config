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

app.post("/add-data", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    const db = client.db("kantor");
    db.collection("karyawan").insertMany(
      [
        {
          nama: "Budi",
          report: "Laporan Hasil Kerja",
        },
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        console.log("Insert document success:", results);
        res.status(200).send(results);
      }
    );
  });
});

app.get("/get-data", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    const db = client.db("kantor");
    db.collection("karyawan")
      .find({})
      .toArray((err, docs) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        res.status(200).send(docs);
      });
  });
});

app.get("/get-filter", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    const db = client.db("kantor");
    db.collection("karyawan")
      .find({ usia: { $lt: 25 } })
      .toArray((err, docs) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        res.status(200).send(docs);
      });
  });
});

app.listen(PORT, () => console.log`API Mongo is running on PORT: ${PORT}`);
