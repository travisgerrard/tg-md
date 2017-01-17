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
        handleChange,
        name: Crypto.decodeString(this.props.patientData.name, this.props.secretCode),
        room: this.props.patientData.room,
        dob: Crypto.decodeString(this.props.patientData.dob, this.props.secretCode),
        mrn: Crypto.decodeString(this.props.patientData.mrn, this.props.secretCode),
        admitDate: this.props.patientData.los,
        ro: this.props.patientData.ro,
        age:
      }

      this.handleChange = this.handleChange.bind(this);
      this.calcAge = this.calcAge.bind(this);
      this.calcDays = this.calcDays.bind(this);
    }

    handleChange(event) {
      this.props.onUpdate(event.target, this.props.patientData._id);

      if (event.target.className === "DOB") this.setState({ dob: event.target.value});
      if (event.target.className === "LOS") this.setState({ admitDate: event.target.value});
    }

    calcAge(dob) {
      var birthdate = new Date(dob);
      var cur = new Date();
      var diff = cur-birthdate;
      var age = Math.floor(diff/31536000000);
      return age;
    },

    //Number of days patient has been in the hospital
    calcDays(admitDate) {
      var one_day=1000*60*60*24;
      var startDate = new Date(admitDate);
      var cur = new Date();
      var diff = cur-startDate;
      var days = Math.floor(diff/one_day);
      return days;
    },
}

export default PatientGeneralPage;
