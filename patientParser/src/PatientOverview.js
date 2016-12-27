var React = require('react');
var ReactDOM = require('react-dom');

require('../sass/PatientOverview.scss');

var PatientOverview = React.createClass({
  decodeString: function(stringToDecode) {
    var decodedString = CryptoJS.AES.decrypt(stringToDecode, this.props.secretCode).toString(CryptoJS.enc.Utf8);
    return decodedString;
  },

  getInitialState() {
      return {
        input: this.props.patientData.input,
        output: this.props.patientData.output,
      }
    },

  handleChange: function(event) {
    this.props.onUpdate(event.target, this.props.patientData._id);

  },

  render: function() {
    return(
      <div id="Overview">
        <textarea className="Overview" onChange={this.handleChange} defaultValue={(this.props.patientData.overview === undefined) ? "" : this.decodeString(this.props.patientData.overview)}/>
      </div>
    )
  }
});

module.exports = PatientOverview;
