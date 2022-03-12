var express = require("express");
var cors = require("cors");
var MongoClient = require("mongodb").MongoClient;

var app = express();
var port = 3500;

var url = "mongodb://localhost:27017/";

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello worldsssssssss");
});

app.get("/api/students", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("friends");
    dbo
      .collection("bit")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
        db.close();
      });
  });
});

app.post("/api/students", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("friends");
    var myobj = {
      id: Math.random(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      semester: req.body.semester,
    };
    dbo
      .collection("bit")
      .insertOne(myobj, { ordered: false }, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
  });
});

app.delete("/api/students", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("friends");
    var myquery = req.body;
    dbo.collection("bit").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      res.send("Cusomter Deleted");
      db.close();
    });
  });
});
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
