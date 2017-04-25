var React = require('react');
var ReactDOM = require('react-dom');

import Crypto from '../modules/Crypto';

require('../sass/PatientLearning.scss');

// Patient learning
var PatientLearning = React.createClass({
  decodeString: function(stringToDecode) {
    var decodedString = Crypto.decodeString(stringToDecode, this.props.secretCode);
    return decodedString;
  },

  // Updates model that action was checked
  handleChange: function(event) {
    this.props.onUpdate(event.target, this.props.patientData._id);
  },

  // Adds new learning when enter pressed
  _handleKeyPress: function(e) {
    if (e.key === 'Enter') {
      this.props.onUpdate(e.target, this.props.patientData._id);
      e.currentTarget.value = ""
    }
  },

  render: function() {
    if (this.props.patientData.learningList !== undefined) {
    return (
      <div id="LearningDiv">
      <label>Learning</label>
      <br />
        <ul id="learningUl">
          {this.props.patientData.learningList.map((element, key) =>
            <li key={element.learningText} >
            <input type="checkbox" className="LearningList" name={key} value={this.decodeString(element.learningText)} onChange={this.handleChange} defaultChecked={element.complete} />{this.decodeString(element.learningText)}
            </li>
          )}
        </ul>
      </div>
    )
    } else {
    return (
      <div>
        <div id="LearningDiv">
          <label>Learning</label>
        </div>
      </div>

      )
    }
  }
});

module.exports = PatientLearning;
