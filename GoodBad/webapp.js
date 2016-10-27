var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var db;

app.use(express.static('static'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.get('/api/gdaybday', function(req, res) {
  db.collection("gdaybday").find().toArray(function(err, docs) {
    res.json(docs);
  });
});

app.use(bodyParser.json());
app.post('/api/gdaybday/', function(req, res) {
  console.log("Req body:", req.body);
  var newSubmission = req.body;
  db.collection("gdaybday").insertOne(newSubmission, function(err, result) {
    var newId = result.insertedId;
    db.collection("gdaybday").find({_id: newId}).next(function(err, doc) {
      res.json(doc);
    });
  });
});

MongoClient.connect('mongodb://localhost/gdaybday', function(err, dbConnection) {
  db = dbConnection;
  var server = app.listen(3000, function() {
	  var port = server.address().port;
	  console.log("Started server at port", port);
  });
});
