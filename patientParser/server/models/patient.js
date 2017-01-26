/*jshint esversion: 6 */

const mongoose = require('mongoose');

// defune the patient Schema
const PatientSchema = new mongoose.Schema({
  hidden: Boolean,
  name: String,
  room: String,
  dob: String,
  mrn: String,
  los: String,
  ro: String,
  otherLabs: String,
  wbc: String,
  hg: String,
  hct: String,
  plt: String,
  na: String,
  k: String,
  cl: String,
  bicarb: String,
  bun: String,
  cr: String,
  gluc: String,
  input: String,
  output: String,
  labsback: Boolean,
  consults: Boolean,
  andon: Boolean,
  mar: Boolean,
  ivmed: Boolean,
  amlab: Boolean,
  dispo:  Boolean,
  learning: Boolean,
  seen: Boolean,
  lines: Boolean,
  foley: Boolean,
  mobility: Boolean,
  followup: [{ complete: Boolean, followUpText: String, hidden: Boolean, isEditing: Boolean }],
  learningList: [{ complete: Boolean, learningText: String, hidden: Boolean }],
  consult: [{ complete: Boolean, consultText: String, hidden: Boolean, isEditing: Boolean }],
  overview: String
}, { collection: 'runTheList'});

module.exports = mongoose.model('Patient', PatientSchema);
