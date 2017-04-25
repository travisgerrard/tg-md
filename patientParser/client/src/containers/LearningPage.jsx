import React, { PropTypes } from 'react';
import Learning from '../components/Learning.jsx';
import Auth from '../modules/Auth';

import Crypto from '../modules/Crypto';

import 'whatwg-fetch'


class LearningPage extends React.Component {

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
      webSiteConnect: /*'http://localhost:3000/api/runTheList/',//*/'/api/runTheListLearning/', //Should be one when using for production
      sortBy: 'basic',
      internOne: '',
      internTwo: '',
      userID: '',
      errors: {}
    }

    this.decodeString = this.decodeString.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateTheState = this.updateTheState.bind(this);
    this.addPatient = this.addPatient.bind(this);
    this.resetLabsAndTodos = this.resetLabsAndTodos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

  }

  // decrypts data with a key
  decodeString(stringToDecode) {
    var decodedString = Crypto.decodeString(stringToDecode, this.state.secretCode);
    return decodedString;
  }

    // Handles sort intern button. Will eventually reload request with only desired interns.
  handleSubmit(e) {
      e.preventDefault();
      console.log(`This was pressed. InterOne is ${this.state.internOne} and InternTwo is ${this.state.internTwo}`);
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
                // Second fetch gets the patients who are associated with the logged in user
                var addressToFetch;
                if (this.state.internOne != '' && this.state.internTwo != '') {
                  addressToFetch = `${this.state.webSiteConnect}?userID=${this.state.userID}&intern1=${this.state.internOne}&intern2=${this.state.internTwo}`
                } else if (this.state.internOne != '' && this.state.internTwo == '') {
                  addressToFetch = `${this.state.webSiteConnect}?userID=${this.state.userID}&intern1=${this.state.internOne}`
                } else if (this.state.internOne == '' && this.state.internTwo != '') {
                  addressToFetch = `${this.state.webSiteConnect}?userID=${this.state.userID}&intern2=${this.state.internTwo}`
                } else if (this.state.internOne == '' && this.state.internTwo == '') {
                  addressToFetch = `${this.state.webSiteConnect}?userID=${this.state.userID}`
                }
                console.log(addressToFetch);
                fetch(addressToFetch, {
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
                          // The data that was returned
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

  // When intern textField is updated this runs. Will eventually updated intern State
  handleChange(e) {
    var inputID = e.target.id;
    var inputValue = e.target.value;
    
    if (inputID == "Intern1") {
      this.setState({ internOne: inputValue });
    } else if (inputID == "Intern2") {
      this.setState({ internTwo: inputValue });
    }
  }

  // Runs at initial loading of patient info. calls server for data
  componentDidMount () {
    // First fetch insures that valid user is accessing site
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
              // Second fetch gets the patients who are associated with the logged in user
              fetch(`${this.state.webSiteConnect}?userID=${this.state.userID}`, {
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
                        // The data that was returned
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


  // lets us sort our patient data before we deisplay it
  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    this.sortPatient(nextProps.pageType);
  }

  render() {
    return (
      <div>
        <Learning
          patientsExist={this.state.patientsExist}
          updateTheState={this.updateTheState}
          secretCode={this.state.secretCode}
          webSiteConnect={this.state.webSiteConnect}
          patients={this.state.patients}
          handleSubmit={this.handleSubmit}
          internOne={this.state.internOne}
          internTwo={this.state.internTwo}
          handleChange={this.handleChange}
          resetLabsAndTodos={this.resetLabsAndTodos} />
      </div>
    )
  }
}

export default LearningPage;
