var React = require('react');
var ReactDOM = require('react-dom');

require('./sass/PatientGeneral.scss');

var PatientGeneral = React.createClass({
  getInitialState() {
      return {
        dob: (this.props.patientData.dob === undefined) ? "" : this.decodeString(this.props.patientData.dob),
        admitDate: this.props.patientData.los,
      }
    },

  decodeString: function(stringToDecode) {
    var decodedString = CryptoJS.AES.decrypt(stringToDecode, this.props.secretCode).toString(CryptoJS.enc.Utf8);
    return decodedString;
  },

  calcAge: function(dob) {
    var birthdate = new Date(dob);
    var cur = new Date();
    var diff = cur-birthdate;
    var age = Math.floor(diff/31536000000);
    return age;
  },

  //Number of days patient has been in the hospital
  calcDays: function(admitDate) {
    var one_day=1000*60*60*24;
    var startDate = new Date(admitDate);
    var cur = new Date();
    var diff = cur-startDate;
    var days = Math.floor(diff/one_day);
    return days;
  },

  // updates calculations for age or length of stay when data is input
  handleChange: function(event) {
    this.props.onUpdate(event.target, this.props.patientData._id);

    if (event.target.className === "DOB") this.setState({ dob: event.target.value});
    if (event.target.className === "LOS") this.setState({ admitDate: event.target.value});

  },

  render: function() {
    return (
    <div>
    <div className="flex-grid">
    <div className="col">

    <input id="PatientInput" type="text" className="Name" placeholder="Name" onChange={this.handleChange} defaultValue={(this.props.patientData.name === undefined) ? "" : this.decodeString(this.props.patientData.name)} />
    </div>
    <div className="col">

    <label id="PatientGen">Room:</label>
    <input id="PatientInput" type="text" className="Room" onChange={this.handleChange} defaultValue={this.props.patientData.room}/>
    </div>

    <div className="col">

    <label id="PatientGen">DOB:</label>
    <input id="PatientInput" type="text" className="DOB" onChange={this.handleChange} defaultValue={(this.props.patientData.dob === undefined) ? "" : this.decodeString(this.props.patientData.dob)}/>
    </div>

    <div className="col">

    <label>Age: {this.calcAge(this.state.dob)}</label>
    </div>

    <div className="col">

    <label id="PatientGen">MRN:</label>
    <input id="PatientInput" type="text" className="MRN" onChange={this.handleChange} defaultValue={(this.props.patientData.mrn === undefined) ? "" : this.decodeString(this.props.patientData.mrn)}/>
    </div>

    <div className="col">

    <label id="PatientGen">Admit:</label>
    <input id="PatientInput" type="text" className="LOS" onChange={this.handleChange} defaultValue={this.props.patientData.los}/>
    </div>

    <div className="col">

    <label>Day: {this.calcDays(this.state.admitDate)}</label>
    </div>

    <div className="col">

    <label id="PatientGen">RO:</label>
    <input id="PatientInput" type="text" className="RO" onChange={this.handleChange} defaultValue={this.props.patientData.ro}/>
    </div>

    </div>
    <br />
    </div>
    )
  }
});

module.exports = PatientGeneral;
