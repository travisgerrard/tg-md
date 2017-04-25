import React, { PropTypes } from 'react';
import AllPatients from '../components/AllPatients.jsx';
import Auth from '../modules/Auth';

import Crypto from '../modules/Crypto';

import 'whatwg-fetch'


class AllPatientsPage extends React.Component {

// Bitnami origin password bp9kERz59guN

/**
  * Class constructor
  */
  // Sets initial state
  constructor(props) {
    super(props);


    this.state = {
      patientsExist: false,
      secretCode: 'frisky',
      step: 2,
      pageType: 'basic',
      patients: [],
      webSiteConnect: /*'http://localhost:3000/api/runTheList/',//*/'/api/runTheList/', //Should be one when using for production
      sortBy: 'basic',
      userID: '',
      errors: {}
    }

    this.decodeString = this.decodeString.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateTheState = this.updateTheState.bind(this);
    this.addPatient = this.addPatient.bind(this);
    this.resetLabsAndTodos = this.resetLabsAndTodos.bind(this);
    this.sortPatient = this.sortPatient.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

  }

  // decrypts data with a key
  decodeString(stringToDecode) {
    var decodedString = Crypto.decodeString(stringToDecode, this.state.secretCode);
    return decodedString;
  }

    // Handles add patient button click, calls add patient function
  handleSubmit(e) {
      e.preventDefault();
      this.addPatient({_creator: this.state.userID})
  }

  // Runs at initial loading of patient info. calls server for data
  componentDidMount () {
    fetch("/api/userID/", {
      method: 'get',
      headers: {
        "Content-type": "application/json",
        'Authorization': `bearer ${Auth.getToken()}`
      },
    }).then(response => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
            // Examine the text in the response
            response.json().then(userID => {
              //console.log(userID);
              this.setState({ userID: userID });
              fetch(this.state.webSiteConnect + "?userID=" + this.state.userID, {
                method: 'get',
                headers: {
                  "Content-type": "application/json",
                  'Authorization': `bearer ${Auth.getToken()}`
                },
              }).then(response => {
                      if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                      }
                      // Examine the text in the response
                      response.json().then(data => {
                        //console.log(data);
                        this.setState({ patients: data });
                        if (data.length > 0) this.setState({ patientsExist: true })
                      });
                }
              )
              .catch(function(err) {
                console.log('Fetch Error :' + err);
              });            });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :' + err);
    });


  }

  // When we need to reload server data this runs
  updateTheState() {
    fetch(this.state.webSiteConnect + "?userID=" + this.state.userID, {
      method: 'get',
      headers: {
        "Content-type": "application/json",
        'Authorization': `bearer ${Auth.getToken()}`
      },
    }).then(response => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
            // Examine the text in the response
            response.json().then(data => {
              this.setState({ patients: data });
              if (data.length > 0) this.setState({ patientsExist: true })
              this.sortPatient(this.state.sortBy);
            });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :' + err);
    });
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log("next props ", nextProps);
    //console.log("next state ", nextState);
    //this.setState ({ data: nextProps.patientData });
  }

  // Saves new patient to the data base
  addPatient(patientToAdd) {

    console.log("Add patient with ID ", this.state.userID);

    fetch(this.state.webSiteConnect, {
      method: 'post',
      headers: {
        "Content-type": "application/json",
        'Authorization': `bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(patientToAdd)
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log("the Data is", data);
      console.log("patient to add", patientToAdd);
      var patient = data;
      // We're advised not to modify the state, it's immutable. So, make a copy.
      var patientsModified = this.state.patients.concat(patient);
      console.log("patientsModified", patientsModified);

      this.setState({patients: patientsModified});
      this.updateTheState();
    });

  }

  // Does what it says...
  resetLabsAndTodos() {
    this.state.patients.map(element =>
      {
        var patient = {wbc: "", hg: "", hct: "", plt: "", na: "", k: "", cl: "", bicarb: "", bun: "", cr: "", gluc: "", input: "", output: "", labsback: false, consults: false, andon: false, mar: false, ivmed: false, amlab: false, dispo: false, learning: false, seen: false, lines: false, foley: false, mobility: false, ro: "" };
        fetch(this.state.webSiteConnect + element._id, {
          method: 'put',
          headers: {
            "Content-type": "application/json",
            'Authorization': `bearer ${Auth.getToken()}`
          },
          body: JSON.stringify(patient)
        }).then(function(data) {

        }.bind(this));
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
          patientsExist={this.state.patientsExist}
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
