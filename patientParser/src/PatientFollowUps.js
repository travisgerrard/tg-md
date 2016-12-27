var React = require('react');
var ReactDOM = require('react-dom');

require('../sass/PatientFollowUps.scss');

// Ender and handle follow ups
var PatientFollowUps = React.createClass({
  decodeString: function(stringToDecode) {
    var decodedString = CryptoJS.AES.decrypt(stringToDecode, this.props.secretCode).toString(CryptoJS.enc.Utf8);
    return decodedString;
  },

  // Updates model that action was checked
  handleChange: function(event) {
    this.props.onUpdate(event.target, this.props.patientData._id);
  },

  // sends new followUp to model
  _handleKeyPress: function(e) {
    if (e.key === 'Enter') {
      this.props.onUpdate(e.target, this.props.patientData._id);
      e.currentTarget.value = ""
    }
  },

  // Sends actions to delete follow up from model
  handelDelete: function(event) {
    //console.log(event.target.name);
    this.props.onUpdate(event.target, this.props.patientData._id);
  },

  render: function() {
    //console.log(this.props.patientData.followup);
    if (this.props.patientData.followup !== undefined) {
    return (
      <div>
      <label>Follow Ups</label>
      <br />
      <input type="text" className="AddFollowUp" onKeyPress={this._handleKeyPress} />
        <ul id="followUpUl">
          {this.props.patientData.followup.map((element, key) =>
            <li key={element.followUpText} >
            <input type="checkbox" className="FollowUp" name={key} value={this.decodeString(element.followUpText)} onChange={this.handleChange} defaultChecked={element.complete} />{this.decodeString(element.followUpText)}
            <a className="deleteFollowUp" name={key} onClick={this.handelDelete}>{element.complete ? "_X_" : ""}</a>
            </li>
          )}
        </ul>
      </div>
    )
    } else {
    return (
      <div>
      <label>Follow Ups</label>
      <br />
      <input type="text" className="AddFollowUp" onKeyPress={this._handleKeyPress} />
      </div>
    )
    }
  }
});

module.exports = PatientFollowUps;
