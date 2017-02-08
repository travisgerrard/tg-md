import React, { PropTypes } from 'react';
import AllPatients from '../components/AllPatients.jsx';

import Crypto from '../modules/Crypto';

class AllPatientsPage extends React.Component {

/**
  * Class constructor
  */
  // Sets initial state
  constructor(props) {
    super(props);


    this.state = {
      patientExist: false,
      secretCode: 'frisky',
      step: 2,
      pageType: 'basic',
      patients: [],
      webSiteConnect: 'http://localhost:3000/api/runTheList/', //'http://a58d4232.ngrok.io/api/runTheList/', //Should be one when using for production
      sortBy: 'basic',
      errors: {}
    }

    this.navClick = this.navClick.bind(this);
  }

  // decrypts data with a key
  decodeString(stringToDecode) {
    var decodedString = CryptoJS.AES.decrypt(stringToDecode, this.state.secretCode).toString(CryptoJS.enc.Utf8);
    return decodedString;
  }

    // Handles add patient button click, calls add patient function
  handleSubmit(e) {
      e.preventDefault();
      this.addPatient({hidden: false})
  }

  // Runs at initial loading of patient info. calls server for data
  componentDidMount () {
    fetch(this.state.webSiteConnect)
      .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
              this.setState({ patients: data });
            });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :' + err);
    });
  }

  // When we need to reload server data this runs
  updateTheState() {
    fetch(this.state.webSiteConnect)
      .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
            // Examine the text in the response
            response.json().then(function(data) {
              this.setState({ patients: data });
              this.sortPatient(this.state.sortBy);
            });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :' + err);
    });
  }

  // Saves new patient to the data base
  addPatient(patientToAdd) {
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
  }

  // Does what it says...
  resetLabsAndTodos() {
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
  }

  sortPatient(sortBy) {

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
  }

  // lets us sort our patient data before we deisplay it
  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    this.sortPatient(nextProps.pageType);
  }

  render() {
    return (
      <div>
        <AllPatients
          patientExist={this.state.patientExist}
          updateTheState={this.updateTheState}
          secretCode={this.state.secretCode}
          webSiteConnect={this.state.webSiteConnect}
          patients={this.state.patients}
          handleSubmit={this.handleSubmit}
          resetLabsAndTodos={this.resetLabsAndTodos} />
      </div>
    )
  }
}

export default AllPatientsPage;
