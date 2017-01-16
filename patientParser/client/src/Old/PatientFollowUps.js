var React = require('react');
var ReactDOM = require('react-dom');
import Crypto from './modules/Crypto';

require('./sass/PatientFollowUps.scss');

// Ender and handle follow ups
var PatientFollowUps = React.createClass({
  decodeString: function(stringToDecode) {
      return Crypto.decodeString(stringToDecode, this.props.secretCode);
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
    var listCss = "followUpUl";
    var listClassName = "FollowUp";
    var componentName = "followup";
    var textName = "followUpText";
    var deleteText = "deleteFollowUp";
    //console.log(this.props.patientData.followup);
    if (this.props.patientData.followup !== undefined) {
      var followUp = this.props.patientData[componentName];
    return (
      <div>
      <label>Follow Ups</label>
      <br />
      <input type="text" className="AddFollowUp" onKeyPress={this._handleKeyPress} />
        <ul id={listCss}>
          {followUp.map((element, key) =>
            <li key={element[textName]} >
            <input type="checkbox" className={listClassName} name={key} value={this.decodeString(element[textName])} onChange={this.handleChange} defaultChecked={element.complete} />{this.decodeString(element[textName])}
            <a className={deleteText} name={key} onClick={this.handelDelete}>{element.complete ? "_X_" : ""}</a>
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
