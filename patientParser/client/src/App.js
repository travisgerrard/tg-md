var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

import NavBarControl from './containers/NavBarControl.jsx'

require('./sass/App.scss');

// The master model and set up for individual patients
//var PatientAll = require('./PatientAll');

import PatientViewControllerPage from './containers/PatientViewControllerPage.jsx';

// Manages all the patient data
var PatientAllList = React.createClass({

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
        secretCode: 'frisky', //Should be null when using for production
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
    fetch(this.state.webSiteConnect).then(function(data) {
        return data.json();
    }).then(function(data) {
      this.setState({ patients: data });
    }.bind(this));
/*    $.ajax(this.state.webSiteConnect).done(function (data) {
        this.setState({ patients: data });
    }.bind(this));
*/
  },

  // When we need to reload server data this runs
  updateTheState: function() {
    fetch(this.state.webSiteConnect).then(function(data) {
        return data.json();
    }).then(function(data) {
      this.setState({ patients: data });
      this.sortPatient(this.state.sortBy);
    }.bind(this));
  },

  // Saves new patient to the data base
  addPatient: function(patientToAdd) {
    fetch(this.state.webSiteConnect, {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(patientToAdd)
    }).then(function(data) {
      console.log("the Data is", data);
      var patient = data;
      // We're advised not to modify the state, it's immutable. So, make a copy.
      var patientsModified = this.state.patients.concat(patient);
      this.setState({patients: patientsModified});
    }.bind(this));

  },

  // Does what it says...
  resetLabsAndTodos: function() {
    this.state.patients.map(element =>
      {
        var patient = {wbc: "", hg: "", hct: "", plt: "", na: "", k: "", cl: "", bicarb: "", bun: "", cr: "", gluc: "", input: "", output: "", labsback: false, consults: false, andon: false, mar: false, ivmed: false, amlab: false, dispo: false, learning: false, seen: false, lines: false, foley: false, mobility: false, ro: "" };

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
              {this.state.patients.map(element => <li key={element._id}><PatientViewControllerPage patientData={element} updateTheState={this.updateTheState} secretCode={this.state.secretCode} url={this.state.webSiteConnect}/><br /><hr /></li>)}
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
        <NavBarControl changeSort={this.changeSort}/>
        <PatientAllList pageType={this.state.pageType}/>
      </div>
    )
  }
});


var formRendered = ReactDOM.render(
  <TopLevel />,
  document.getElementById('main')
);
