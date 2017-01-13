var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var PatientGeneral = require('./PatientGeneral');
var PatientLabs = require('./PatientLabs');
var PatientDailyTodo = require('./PatientDailyTodo');
var PatientFollowUps = require('./PatientFollowUps');
var PatientLearning = require('./PatientLearning');
var PatientConsult = require('./PatientConsult');
var PatientOverview = require('./PatientOverview');

import Crypto from './modules/Crypto';

import PatientOverviewPage from './containers/PatientOverviewPage.jsx';
import PatientDailyTodoPage from './containers/PatientDailyTodoPage.jsx';
import PatientFollowUpsPage from './containers/PatientFollowUpsPage.jsx';

require('./sass/PatientAll.scss');

// The master model and set up for individual patients
var PatientAll = React.createClass({
  // encrypts data with a key
  encodeString: function(stringToEncode) {
    var encodedString = CryptoJS.AES.encrypt(stringToEncode, this.props.secretCode).toString();
    return encodedString;
  },

  // decrypts data with a key
  decodeString: function(stringToDecode) {
    var decodedString = CryptoJS.AES.decrypt(stringToDecode, this.props.secretCode).toString(CryptoJS.enc.Utf8);
    return decodedString;
  },

  // The called from children when models needs to be updated
  onUpdate: function(val, patientID){

    var secretCode = this.props.secretCode;
    var patient = {}; //Serves as vessel to be delivered to the backend on update

    // Standard Info
    if (val.className === "Name") patient = {name: Crypto.encodeString(val.value, secretCode)};
    if (val.className === "Room") patient = {room: val.value};
    if (val.className === "DOB") patient = {dob: Crypto.encodeString(val.value, secretCode)};
    if (val.className === "MRN") patient = {mrn: Crypto.encodeString(val.value, secretCode)};
    if (val.className === "LOS") patient = {los: val.value};
    if (val.className === "RO") patient = {ro: val.value};


    // CBC
    if (val.className === "WBC") patient = {wbc: this.encodeString(val.value)};
    if (val.className === "Hg") patient = {hg: this.encodeString(val.value)};
    if (val.className === "Hct") patient = {hct: this.encodeString(val.value)};
    if (val.className === "plt") patient = {plt: this.encodeString(val.value)};

    // BMR
    if (val.className === "Na") patient = {na: this.encodeString(val.value)};
    if (val.className === "K") patient = {k: this.encodeString(val.value)};
    if (val.className === "Cl") patient = {cl: this.encodeString(val.value)};
    if (val.className === "Bicarb") patient = {bicarb: this.encodeString(val.value)};
    if (val.className === "BUN") patient = {bun: this.encodeString(val.value)};
    if (val.className === "Cr") patient = {cr: this.encodeString(val.value)};
    if (val.className === "Gluc") patient = {gluc: this.encodeString(val.value)};

    // I/O
    if (val.className === "Input") patient = {input: val.value};
    if (val.className === "Output") patient = {output: val.value};
    if (val.className === "OtherLabs") patient = {otherLabs: this.encodeString(val.value)};

    // Overview
    if (val.className === "Overview") patient = {overview: this.encodeString(val.value)};

    // DailyTodos, using a ternary operator
    if (val.className === "LabsBack") patient = (val.trueFalse === true) ? {labsback: false} : {labsback: true};
    if (val.className === "Consults") patient = (val.trueFalse === true) ? {consults: false} : {consults: true};
    if (val.className === "Andon") patient = (val.trueFalse === true) ? {andon: false} : {andon: true};
    if (val.className === "Mar") patient = (val.trueFalse === true) ? {mar: false} : {mar: true};
    if (val.className === "IVMed") patient = (val.trueFalse === true) ? {ivmed: false} : {ivmed: true};
    if (val.className === "AMLab") patient = (val.trueFalse === true) ? {amlab: false} : {amlab: true};
    if (val.className === "Dispo") patient = (val.trueFalse === true) ? {dispo: false} : {dispo: true};
    if (val.className === "Learning") patient = (val.trueFalse === true) ? {learning: false} : {learning: true};
    if (val.className === "Seen") patient = (val.trueFalse === true) ? {seen: false} : {seen: true};
    if (val.className === "Lines") patient = (val.trueFalse === true) ? {lines: false} : {lines: true};
    if (val.className === "Foley") patient = (val.trueFalse === true) ? {foley: false} : {foley: true};
    if (val.className === "Mobility") patient = (val.trueFalse === true) ? {mobility: false} : {mobility: true};

    // Adding to list of followups, again using ternary operator!
    if (val.className === "AddFollowUp") patient = (this.props.patientData.followup === undefined) ? {followup: [{complete: false, followUpText: this.encodeString(val.value), hidden: false}]} : {followup: this.props.patientData.followup.concat({complete: false, followUpText: this.encodeString(val.value), hidden: false})};
    // checking off a followup
    if (val.className === "FollowUp") {
      var tempArray = this.props.patientData.followup.concat();
      var object = tempArray[val.name];
      object = (object.complete === true) ? object.complete = false : object.complete = true;
      patient = {followup: tempArray};
    }
    // deleting a followup
    if (val.className === "deleteFollowUp") {
      var tempArray = this.props.patientData.followup.concat();
      tempArray.splice(val.name, 1);
      patient = {followup: tempArray};
    }

    // Adding to list of consults, again using ternary operator!
    if (val.className === "AddConsult") patient = (this.props.patientData.consult === undefined) ? {consult: [{complete: false, consultText: this.encodeString(val.value), hidden: false}]} : {consult: this.props.patientData.consult.concat({complete: false, consultText: this.encodeString(val.value), hidden: false})};
    // checking off a followup
    if (val.className === "Consult") {
      var tempArray = this.props.patientData.consult.concat();
      var object = tempArray[val.name];
      object = (object.complete === true) ? object.complete = false : object.complete = true;
      patient = {consult: tempArray};
    }
    // deleting a followup
    if (val.className === "deleteConsult") {
      var tempArray = this.props.patientData.consult.concat();
      tempArray.splice(val.name, 1);
      patient = {consult: tempArray};
    }

    // Adding to list of learning, again using ternary operator!
    if (val.className === "AddLearning") patient = (this.props.patientData.learningList === undefined) ? {learningList: [{complete: false, learningText: this.encodeString(val.value), hidden: false}]} : {learningList: this.props.patientData.learningList.concat({complete: false, learningText: this.encodeString(val.value), hidden: false})};

    // checking off a learning
    if (val.className === "LearningList") {
      var tempArray = this.props.patientData.learningList.concat();
      var object = tempArray[val.name];
      object = (object.complete === true) ? object.complete = false : object.complete = true;
      patient = {learningList: tempArray};
    }

    // deleting a learning
    if (val.className === "deleteLearning") {
      var tempArray = this.props.patientData.learningList.concat();
      tempArray.splice(val.name, 1);
      patient = {learningList: tempArray};
    }

    // Deleteing a patient
    if (val.className === "DeleteButton") patient = {hidden: true};

    // POSTs new data to the server using ajax. Updates local info if change is warrented
    $.ajax({
      url: this.props.url + patientID, type: 'PUT', contentType:'application/json',
      data: JSON.stringify(patient),
      dataType: 'json',
      success: function(patient) {
        //Update the state if were clicking a checkbox
        if (val.className === "AddFollowUp" ||
          val.className === "FollowUp" ||
          val.className === "deleteFollowUp" ||
          val.className === "AddConsult" ||
          val.className === "Consult" ||
          val.className === "deleteConsult" ||
          val.className === "AddLearning" ||
          val.className === "LearningList" ||
          val.className === "deleteLearning" ||
          val.className === "DeleteButton") {
            this.props.updateTheState();
            console.log("State updated...");
          }
      }.bind(this),
    });
  },

  // using flexbox to layout everything
  render: function() {
    return (
      <div>
      <div className="flex-grid">
        <div className="col">
          <PatientGeneral onUpdate={this.onUpdate} patientData={this.props.patientData} secretCode={this.props.secretCode}/>
        </div>
      </div>
      <div className="flex-grid">
        <div className="col">
          <PatientOverviewPage onUpdate={this.onUpdate} patientData={this.props.patientData} secretCode={this.props.secretCode}/>
        </div>
      </div>
      <div className="flex-grid">
        <div className="col">
          <PatientLabs onUpdate={this.onUpdate} patientData={this.props.patientData} secretCode={this.props.secretCode}/>
        </div>
        <div className="col">
          <PatientDailyTodoPage onUpdate={this.onUpdate} patientData={this.props.patientData}/>
        </div>
        <div className="col">
          <PatientFollowUpsPage onUpdate={this.onUpdate} patientData={this.props.patientData} secretCode={this.props.secretCode} />
        </div>

        <div className="col">
          <PatientConsult onUpdate={this.onUpdate} patientData={this.props.patientData} secretCode={this.props.secretCode} />
        </div>
        <div className="col">
          <PatientLearning onUpdate={this.onUpdate} patientData={this.props.patientData} secretCode={this.props.secretCode} />
        </div>
      </div>
      </div>
    )
  }
});

module.exports = PatientAll;
