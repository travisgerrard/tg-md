/*jshint esversion: 6 */
/* patient parser */

const express = require('express');

const router = new express.Router();

var mongoose = require('mongoose');
const Patient = require('mongoose').model('Patient');

router.get('/dashboard', (req, res) => {
  console.log(res);
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

router.get('/runTheList', (req, res) => {
  console.log("A request");
  const filter = { hidden: false };
  Patient.find(filter).sort({ro: 1}).exec((err, docs) => {
    if (err) {
      return console.error(err);
    }
    return res.json(docs);
  });
});

router.post('/runTheList/', function(req, res) {
  const patient = Patient(req.body);
  console.log("Adding patient with Req body:", req.body);
  patient.save((err, savedPatient) => {
    if (err) {
      console.error(err);
    }
    return res.json(savedPatient);
  });
});

router.put('/runTheList/:id', function(req, res) {
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

router.get('/runTheListLearning', function(req, res) {
  console.log("A learning request");
  Patient.find({"learningList":{$exists:true}}, {learningList: 1, name: 1, los: 1}).sort({los: 1}).exec((err, docs) => {
    if (err) {
      return console.error(err);
    }
    return res.json(docs);
  });
});

module.exports = router;
