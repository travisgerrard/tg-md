var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var app = express();
var db;

app.use(express.static('static'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.get('/api/runTheList', function(req, res) {
  console.log("A request");
  db.collection("runTheList").find({hidden: false}).sort({ro: 1}).toArray(function(err, docs) {
    res.json(docs);
  });
});

app.get('/api/runTheListLearning', function(req, res) {
  console.log("A request");
  db.collection("runTheList").find().sort({ro: 1}).toArray(function(err, docs) {
    res.json(docs);
  });
});

app.use(bodyParser.json());

app.post('/api/runTheList/', function(req, res) {
  console.log("Req body:", req.body);
  var newSubmission = req.body;
  db.collection("runTheList").insertOne(newSubmission, function(err, result) {
    var newId = result.insertedId;
    db.collection("runTheList").find({_id: newId}).next(function(err, doc) {
      res.json(doc);
    });
  });
});

app.put('/api/runTheList/:id', function(req, res) {
  var patient = req.body;
  console.log("Modifying patient", req.params.id, patient);
  var old = ObjectId(req.params.id);

  db.collection("runTheList").updateOne({_id: old}, { $set: patient }, function(err, result) {
    db.collection("runTheList").find({_id: old}).next(function(err, doc) {
      res.send(doc);
    });
  });
});

MongoClient.connect('mongodb://localhost/runTheList', function(err, dbConnection) {
  db = dbConnection;
  var server = app.listen(3000, function() {
	  var port = server.address().port;
	  console.log("Started server at port", port);
  });
});
