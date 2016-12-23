var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

// The master model and set up for individual patients
var PatientAll = require('./PatientAll');

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
