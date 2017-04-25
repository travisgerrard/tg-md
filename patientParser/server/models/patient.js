/*jshint esversion: 6 */

const mongoose = require('mongoose');
const User = require('mongoose').model('User');

// defune the patient Schema
const PatientSchema = new mongoose.Schema({
  hidden: { type: Boolean, default: false },
  name: { type: String, default: "" },
  room: { type: String, default: "" },
  dob: { type: String, default: "" },
  mrn: { type: String, default: "" },
  los: { type: String, default: "" },
  ro: { type: String, default: "" },
  otherLabs: { type: String, default: "" },
  wbc: { type: String, default: "" },
  hg: { type: String, default: "" },
  hct: { type: String, default: "" },
  plt: { type: String, default: "" },
  na: { type: String, default: "" },
  k: { type: String, default: "" },
  cl: { type: String, default: "" },
  bicarb: { type: String, default: "" },
  bun: { type: String, default: "" },
  cr: { type: String, default: "" },
  gluc: { type: String, default: "" },
  input: { type: String, default: "" },
  output: { type: String, default: "" },
  intern: { type: String, default: "" },
  labsback: { type: Boolean, default: false },
  consults: { type: Boolean, default: false },
  andon: { type: Boolean, default: false },
  mar: { type: Boolean, default: false },
  ivmed: { type: Boolean, default: false },
  amlab: { type: Boolean, default: false },
  dispo:  { type: Boolean, default: false },
  learning: { type: Boolean, default: false },
  seen: { type: Boolean, default: false },
  lines: { type: Boolean, default: false },
  foley: { type: Boolean, default: false },
  mobility: { type: Boolean, default: false },
  overview: { type: String, default: "" },
  followup: [{ complete: Boolean, followUpText: String, hidden: Boolean, isEditing: Boolean }],
  learningList: [{ complete: Boolean, learningText: String, hidden: Boolean, isEditing: Boolean }],
  consult: [{ complete: Boolean, consultText: String, hidden: Boolean, isEditing: Boolean }],
  _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, { collection: 'runTheList'});

module.exports = mongoose.model('Patient', PatientSchema);
