var React = require('react');
var ReactDOM = require('react-dom');

require('./sass/PatientLearning.scss');

// Patient learning
var PatientLearning = React.createClass({
  decodeString: function(stringToDecode) {
    var decodedString = CryptoJS.AES.decrypt(stringToDecode, this.props.secretCode).toString(CryptoJS.enc.Utf8);
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

  handelDelete: function(event) {
    //console.log(event.target.name);
    this.props.onUpdate(event.target, this.props.patientData._id);
  },

  // Added a buddton to delete patient to this section... This handels that button
  handleDeletePatient: function(event) {
    if(confirm("Are you sure?")) this.props.onUpdate(event.target, this.props.patientData._id);
  },

  render: function() {
    if (this.props.patientData.learningList !== undefined) {
    return (
      <div id="LearningDiv">
      <label>Learning</label>
      <button id="DeleteButton" className="DeleteButton" onClick={this.handleDeletePatient}>X</button>
      <br />
      <input type="textyh" className="AddLearning" onKeyPress={this._handleKeyPress} />
        <ul id="learningUl">
          {this.props.patientData.learningList.map((element, key) =>
            <li key={element.learningText} >
            <input type="checkbox" className="LearningList" name={key} value={this.decodeString(element.learningText)} onChange={this.handleChange} defaultChecked={element.complete} />{this.decodeString(element.learningText)}
            <a className="deleteLearning" name={key} onClick={this.handelDelete}>{element.complete ? "_X_" : ""}</a>
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
          <button id="DeleteButton" className="DeleteButton" onClick={this.handleDeletePatient}>X</button>
          <br />
          <input type="text" className="AddLearning" onKeyPress={this._handleKeyPress} />
        </div>
      </div>

      )
    }
  }
});

module.exports = PatientLearning;
