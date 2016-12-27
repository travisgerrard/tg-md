var React = require('react');
var ReactDOM = require('react-dom');

require('../sass/PatientConsult.scss');

// Ender and handle follow ups
var PatientConsult = React.createClass({
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

  // Sends actions to delete consult from model
  handelDelete: function(event) {
    //console.log(event.target.name);
    this.props.onUpdate(event.target, this.props.patientData._id);
  },

  render: function() {
    if (this.props.patientData.consult !== undefined) {
    return (
      <div>
      <label>Consults</label>
      <br />
      <input type="text" className="AddConsult" onKeyPress={this._handleKeyPress} />
        <ul id="consultUl">
          {this.props.patientData.consult.map((element, key) =>
            <li key={element.consultText} id="consultLi">
            <input type="checkbox" className="Consult" name={key} value={this.decodeString(element.consultText)} onChange={this.handleChange} defaultChecked={element.complete} />{this.decodeString(element.consultText)}
            <a className="deleteConsult" name={key} onClick={this.handelDelete}>{element.complete ? "_X_" : ""}</a>
            </li>
          )}
        </ul>
      </div>
    )
    } else {
    return (
      <div>
      <label>Consults</label>
      <br />
      <input type="text" className="AddConsult" onKeyPress={this._handleKeyPress} />
      </div>
    )
    }
  }
});

module.exports = PatientConsult;
