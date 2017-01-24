import React, { PropTypes } from 'react';
import PatientGeneralInputBoxes from '../components/PatientGeneralInputBoxes.jsx';
import Crypto from '../modules/Crypto';

require('../sass/PatientGeneral.scss');

class PatientGeneralPage extends React.Component {
  /**
    * Class constructor
    */
    constructor(props) {
      super(props);
      this.state = {
        name: Crypto.decodeString(this.props.patientData.name, this.props.secretCode),
        room: this.props.patientData.room,
        dob: Crypto.decodeString(this.props.patientData.dob, this.props.secretCode),
        mrn: Crypto.decodeString(this.props.patientData.mrn, this.props.secretCode),
        los: this.props.patientData.los, // this is the admission date
        admitDate: this.calcDays(this.props.patientData.los), //This is actually how long they've been in hospital
        ro: this.props.patientData.ro,
        age: this.calcAge(Crypto.decodeString(this.props.patientData.dob, this.props.secretCode))
      }

      this.handleChange = this.handleChange.bind(this);
      this.calcAge = this.calcAge.bind(this);
      this.calcDays = this.calcDays.bind(this);
    }

    handleChange(event) {
      this.props.onUpdate(event.target, this.props.patientData._id);

      if (event.target.className === "DOB") this.setState({ age: this.calcAge(event.target.value)});
      if (event.target.className === "LOS") this.setState({ admitDate: this.calcDays(event.target.value)});
    }

    // updates state with props from PatientAll with they get reloaded
    /*componentWillReceiveProps(nextProps) {
      console.log(nextProps);
      //this.setState ({ listContents: nextProps.patientData.followup });
    }*/

    calcAge(dob) {
      var birthdate = new Date(dob);
      var cur = new Date();
      var diff = cur-birthdate;
      var age = Math.floor(diff/31536000000);
      return age;
    }

    //Number of days patient has been in the hospital
    calcDays(admitDate) {
      var one_day=1000*60*60*24;
      var startDate = new Date(admitDate);
      var cur = new Date();
      var diff = cur-startDate;
      var days = Math.floor(diff/one_day);
      return days;
    }

    render() {
      console.log(this.state.ro);
      return (
        <PatientGeneralInputBoxes
          handleChange={this.handleChange}
          name={this.state.name}
          room={this.state.room}
          dob={this.state.dob}
          mrn={this.state.mrn}
          los={this.state.los}
          ro={this.state.ro}
          admitDate={this.state.admitDate}
          age={this.state.age} />
      );
    }
}

export default PatientGeneralPage;
