/*jshint esversion: 6 */

var express = require('express');
var bodyParser = require('body-parser');

// adding Mongoose
var mongoose = require('mongoose');
const config = require('./config');

// connect to the database and load models
require('./server/models').connect(config.dbUri);
const Patient = require('mongoose').model('Patient');

var app = express();

app.use(express.static('static'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.get('/api/runTheList', function(req, res) {
  console.log("A request");
  const filter = { hidden: false };
  Patient.find(filter).sort({ro: 1}).exec((err, docs) => {
    if (err) {
      return console.error(err);
    }
    return res.json(docs);
  });
});

app.get('/api/runTheListLearning', function(req, res) {
  console.log("A request");
  Patient.find({"learningList":{$exists:true}}, {learningList: 1, name: 1, los: 1}).sort({los: 1}).exec((err, docs) => {
    if (err) {
      return console.error(err);
    }
    return res.json(docs);
  });
});

app.use(bodyParser.json());
app.post('/api/runTheList/', function(req, res) {
  const patient = Patient(req.body);
  console.log("Adding patient with Req body:", req.body);
  patient.save((err, savedPatient) => {
    if (err) {
      console.error(err);
    }
    return res.json(savedPatient);
  });
});

app.put('/api/runTheList/:id', function(req, res) {
  const id = new mongoose.mongo.ObjectId(req.params.id);
  const patient = req.body;
  console.log("Modifying patient", req.params.id, patient);
  Patient.findOneAndUpdate({
    _id: id,
  }, patient, {
    new: true,
  }, (err, updatedPatient) => {
    if (err) {
      return console.error(err);
    }
    return res.json(updatedPatient);
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
