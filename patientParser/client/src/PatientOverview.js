import React from 'react';
import ReactDOM from 'react-dom';

require('./sass/PatientOverview.scss');

export default class PatientOverview extends React.Component {
  decodeString(stringToDecode) {
    var decodedString = CryptoJS.AES.decrypt(stringToDecode, this.props.secretCode).toString(CryptoJS.enc.Utf8);
    return decodedString;
  }

  constructor(props) {
    super(props);
    this.state = {
      patientData: this.props.patientData
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onUpdate(event.target, this.props.patientData._id);
  }

  render() {
    return(
      <div id="Overview">
        <textarea className="Overview" onChange={this.handleChange} defaultValue={(this.props.patientData.overview === undefined) ? "" : this.decodeString(this.props.patientData.overview)}/>
      </div>
    )
  }

}

module.exports = PatientOverview;
