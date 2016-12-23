var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var PatientGeneral = require('./PatientGeneral');
var PatientLabs = require('./PatientLabs');
var PatientDailyTodo = require('./PatientDailyTodo');
// Labs setup and display


var PatientOverview = React.createClass({
  handleChange: function(event) {
    console.log(event.target.value);
  },

  render: function() {
    return (
      <textarea className="Overview" onChange={this.handleChange} />
    )
  }
})



// Ender and handle follow ups
var PatientFollowUps = React.createClass({
  decodeString: function(stringToDecode) {
    var decodedString = CryptoJS.AES.decrypt(stringToDecode, this.props.secretCode).toString(CryptoJS.enc.Utf8);
    return decodedString;
  },

  // Updates model that action was checked
  handleChange: function(event) {
    this.props.onUpdate(event.target, this.props.patientData._id);
  },

  // sends new followUp to model
  _handleKeyPress: function(e) {
    if (e.key === 'Enter') {
      this.props.onUpdate(e.target, this.props.patientData._id);
      e.currentTarget.value = ""
    }
  },

  // Sends actions to delete follow up from model
  handelDelete: function(event) {
    //console.log(event.target.name);
    this.props.onUpdate(event.target, this.props.patientData._id);
  },

  render: function() {
    //console.log(this.props.patientData.followup);
    if (this.props.patientData.followup !== undefined) {
    return (
      <div>
      <label>Follow Ups</label>
      <br />
      <input type="text" className="AddFollowUp" onKeyPress={this._handleKeyPress} />
        <ul id="followUpUl">
          {this.props.patientData.followup.map((element, key) =>
            <li key={element.followUpText} id="followUpLi">
            <input type="checkbox" className="FollowUp" name={key} value={this.decodeString(element.followUpText)} onChange={this.handleChange} defaultChecked={element.complete} />{this.decodeString(element.followUpText)}
            <a className="deleteFollowUp" name={key} onClick={this.handelDelete}>{element.complete ? "_X_" : ""}</a>
            </li>
          )}
        </ul>
      </div>
    )
    } else {
    return (
      <div>
      <label>Follow Ups</label>
      <br />
      <input type="text" className="AddFollowUp" onKeyPress={this._handleKeyPress} />
      </div>
    )
    }
  }
})

// Patient learning
var PatientLearning = React.createClass({
  decodeString: function(stringToDecode) {
    var decodedString = CryptoJS.AES.decrypt(stringToDecode, this.props.secretCode).toString(CryptoJS.enc.Utf8);
    return decodedString;
  },

  // Updates model that action was checked
  handleChange: function(event) {
    this.props.onUpdate(event.target, this.props.patientData._id);
  },

  // Adds new learning when enter pressed
  _handleKeyPress: function(e) {
    if (e.key === 'Enter') {
      this.props.onUpdate(e.target, this.props.patientData._id);
      e.currentTarget.value = ""
    }
  },

  handelDelete: function(event) {
    //console.log(event.target.name);
    this.props.onUpdate(event.target, this.props.patientData._id);
  },

  // Added a buddton to delete patient to this section... This handels that button
  handleDeletePatient: function(event) {
    if(confirm("Are you sure?")) this.props.onUpdate(event.target, this.props.patientData._id);
  },

  render: function() {
    if (this.props.patientData.learningList !== undefined) {
    return (
      <div id="LearningDiv">
      <label>Learning</label>
      <button id="DeleteButton" className="DeleteButton" onClick={this.handleDeletePatient}>X</button>
      <br />
      <input type="textyh" className="AddLearning" onKeyPress={this._handleKeyPress} />
        <ul id="followUpUl">
          {this.props.patientData.learningList.map((element, key) =>
            <li key={element.learningText} id="followUpLi">
            <input type="checkbox" className="LearningList" name={key} value={this.decodeString(element.learningText)} onChange={this.handleChange} defaultChecked={element.complete} />{this.decodeString(element.learningText)}
            <a className="deleteLearning" name={key} onClick={this.handelDelete}>{element.complete ? "_X_" : ""}</a>
            </li>
          )}
        </ul>
      </div>
    )
    } else {
    return (
      <div>
        <div id="LearningDiv">
          <label>Learning</label>
          <button id="DeleteButton" className="DeleteButton" onClick={this.handleDeletePatient}>X</button>
          <br />
          <input type="text" className="AddLearning" onKeyPress={this._handleKeyPress} />
        </div>
      </div>

      )
    }
  }
})

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
    /*
    console.log("val is", val);
    console.log("Entered Text is", val.value);
    console.log("Where it was entered into was", val.className);
    console.log("Patient ID is ", patientID);
    */

    var patient = {}; //Serves as vessel to be delivered to the backend on update

    // Standard Info
    if (val.className === "Name") patient = {name: this.encodeString(val.value)};
    if (val.className === "Room") patient = {room: val.value};
    if (val.className === "DOB") patient = {dob: this.encodeString(val.value)};
    if (val.className === "MRN") patient = {mrn: this.encodeString(val.value)};
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
          val.className === "AddLearning" ||
          val.className === "LearningList" ||
          val.className === "deleteLearning" ||
          val.className === "DeleteButton") this.props.updateTheState();
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
          <PatientLabs onUpdate={this.onUpdate} patientData={this.props.patientData} secretCode={this.props.secretCode}/>
        </div>
        <div className="col">
          <PatientDailyTodo onUpdate={this.onUpdate} patientData={this.props.patientData}/>
        </div>
        <div className="col">
          <PatientFollowUps onUpdate={this.onUpdate} patientData={this.props.patientData} secretCode={this.props.secretCode} />
        </div>
        <div className="col">
          <PatientLearning onUpdate={this.onUpdate} patientData={this.props.patientData} secretCode={this.props.secretCode} />
        </div>
      </div>
      </div>
    )
  }
});

// Manages all the patient data
var PatientAllList = React.createClass({

  //var webSiteConnect = 'http://a58d4232.ngrok.io/api/runTheList/';
  //var webSiteConnect = 'http://localhost:3000/api/runTheList';

  encodeString: function(stringToEncode, secretCode) {
    var encodedString = CryptoJS.AES.encrypt(stringToEncode, secretCode).toString();
    return encodedString;
  },

  // decrypts data with a key
  decodeString: function(stringToDecode) {
    var decodedString = CryptoJS.AES.decrypt(stringToDecode, this.state.secretCode).toString(CryptoJS.enc.Utf8);
    return decodedString;
  },

  getInitialState: function() {
      return {
        patients: [],
        secretCode: 'frisky',//null, //Should be null when using for production
        step: 2, //1 in productino
        pageType: 'basic',
        webSiteConnect: 'http://localhost:3000/api/runTheList/', //'http://a58d4232.ngrok.io/api/runTheList/', //Should be one when using for production
        sortBy: 'basic'
      }
    },

    // On entering our key, this runs
    _handleKeyPress: function(e) {
      if (e.key === 'Enter') {
        this.setState({ secretCode: e.target.value});
        this.setState({	step : this.state.step + 1 });

      }
    },

    // Handles add patient button click, calls add patient function
  handleSubmit: function(e) {
      e.preventDefault();
      this.addPatient({hidden: false})
  },

  // Runs at initial loading of patient info. calls server for data
  componentDidMount: function () {
    $.ajax(this.state.webSiteConnect).done(function (data) {
        this.setState({ patients: data });
    }.bind(this));
  },

  // When we need to reload server data this runs
  updateTheState: function() {
    $.ajax(this.state.webSiteConnect).done(function (data) {
      this.setState({ patients: data });
      this.sortPatient(this.state.sortBy);
    }.bind(this));
  },

  // Saves new patient to the data base
  addPatient: function(patientToAdd) {
    $.ajax({
      type: 'POST', url: this.state.webSiteConnect, contentType: 'application/json',
      data: JSON.stringify(patientToAdd),
      success: function(data) {
        console.log("the Data is", data);
        var patient = data;
        // We're advised not to modify the state, it's immutable. So, make a copy.
        var patientsModified = this.state.patients.concat(patient);
        this.setState({patients: patientsModified});
      }.bind(this),
      error: function(xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding pateint:", err);
      }
    });
  },

  // Does what it says...
  resetLabsAndTodos: function() {
    this.state.patients.map(element =>
      {
        var patient = {wbc: "", hg: "", hct: "", plt: "", na: "", k: "", cl: "", bicarb: "", bun: "", cr: "", gluc: "", input: "", output: "", labsback: false, consults: false, andon: false, mar: false, ivmed: false, amlab: false, dispo: false, learning: false, seen: false};

        $.ajax({
          url: this.state.webSiteConnect + element._id, type: 'PUT', contentType:'application/json',
          data: JSON.stringify(patient),
          dataType: 'json',
          success: function(patient) {

          }

      });
    });
  },

  sortPatient: function(sortBy) {

    if (sortBy === 'Room') {
      var tempData = this.state.patients.slice();
      tempData.sort(function (a, b) {
        if (a.room > b.room) {
          return 1;
        }
        if (a.room < b.room) {
          return -1;
        }
        return 0;
      });
      this.setState({ patients: tempData });
      this.setState({ step: 2 });
      this.setState({ sortBy: sortBy })

    }
    if (sortBy === 'Rounding Order') {
      var tempData = this.state.patients.slice();
      tempData.sort(function (a, b) {
        if (a.ro > b.ro) {
          return 1;
        }
        if (a.ro < b.ro) {
          return -1;
        }
        return 0;
      });
      this.setState({ patients: tempData });
      this.setState({ step: 2 });
      this.setState({ sortBy: sortBy })

    }
    if (sortBy === 'Name') {
      var tempData = this.state.patients.slice();
      tempData.sort(function (a, b) {
        if (this.decodeString(a.name) > this.decodeString(b.name)) {
          return 1;
        }
        if (this.decodeString(a.name) < this.decodeString(b.name)) {
          return -1;
        }

        return 0;
      }.bind(this));
      this.setState({ patients: tempData });
      this.setState({ step: 2 });
      this.setState({ sortBy: sortBy })

    }
    if (sortBy === 'Seen') {
      var tempData = this.state.patients.slice();
      tempData.sort(function (a, b) {
        return (a.seen === b.seen)? 0 : a.seen? 1 : -1;
      });
      this.setState({ patients: tempData });
      this.setState({ step: 2 });
      this.setState({ sortBy: sortBy })
    }
    if (sortBy === 'printOutRO') {
      var tempData = this.state.patients.slice();
      tempData.sort(function (a, b) {
        if (a.ro > b.ro) {
          return 1;
        }
        if (a.ro < b.ro) {
          return -1;
        }
        return 0;
      });
      this.setState({ patients: tempData });
      this.setState({ step: 3 });
    }
  },

  // lets us sort our patient data before we deisplay it
  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    this.sortPatient(nextProps.pageType);
  },

  // Renders side. Case 1 is enter password. 2 is normale display, 3 print out rounding order, 4 dispay learning
  render: function() {
    switch (this.state.step) {
      case 1: //Enter password
      return (
        <div className="flexbox-login-container">
            <input type="password" className="SecretCodeInput" placeholder='key' onKeyPress={this._handleKeyPress} autoFocus />
        </div>
      )
      case 2: //The main site
        if (this.state.patients === undefined || this.state.patients.length == 0) {
          return (
            <button onClick={this.handleSubmit} className="btn btn-primary center-block">Add Patient</button>
          )
        } else {
          return (
            <div>
            <ul>
              {this.state.patients.map(element => <li key={element._id}><PatientAll patientData={element} updateTheState={this.updateTheState} secretCode={this.state.secretCode} url={this.state.webSiteConnect}/><br /><hr /></li>)}
            </ul>
            <button id="addPatientButton" onClick={this.handleSubmit} className="btn btn-primary center-block">Add Patient</button>
            <button onClick={this.resetLabsAndTodos} className="btn btn-primary center-block">ResetLabsAndTodos</button>
            </div>
          )
        }
      case 3: //Case 3 is for learning site...
      if (this.state.patients === undefined || this.state.patients.length == 0) {
        return (
          <button onClick={this.handleSubmit} className="btn btn-primary center-block">Add Patient</button>
        )
      } else {
        return (
          <div>
          <ul>
            Hello
          </ul>
          </div>
        )
      }
    }
  }
});

// our navbar
var NavBar = React.createClass({
  navClick: function(e) {
    this.props.changeSort(e.target.outerText);
  },

  render: function() {
    return(
      <nav role='navigation' className="main-nav" id="main-nav">
        <ul id="main-nav-list">
          <li>
            <a onClick={this.navClick}>
              <div>
                Rounding Order
              </div>
            </a>
          </li>
          <li>
            <a onClick={this.navClick}>
              <div>
                Room
              </div>
            </a>
          </li>
          <li>
            <a onClick={this.navClick}>
              <div>
                Name
              </div>
            </a>
          </li>
          <li>
            <a onClick={this.navClick}>
              <div>
                Seen
              </div>
            </a>
          </li>
          <li>
            <a onClick={this.navClick}>
              <div>
                printOutRO
              </div>
            </a>
          </li>
          <li>
            <a onClick={this.navClick}>
              <div>
                learning
              </div>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
});

// Makes it so we have both navebar and regular
var TopLevel = React.createClass({
  getInitialState: function() {
      return {
        pageType: 'basic',
      }
    },

  changeSort: function(val) {
      console.log(val);
      this.setState({ pageType: val });
    },

  render: function() {
    return (
      <div>
        <NavBar changeSort={this.changeSort}/>
        <PatientAllList pageType={this.state.pageType}/>
      </div>
    )
  }
});


var formRendered = ReactDOM.render(
  <TopLevel />,
  document.getElementById('main')
);
