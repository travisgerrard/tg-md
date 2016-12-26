var React = require('react');
var ReactDOM = require('react-dom');

require('../sass/PatientLabs.scss');

var PatientLabs = React.createClass({
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

    // Caclulates from input and output
  handleChange: function(event) {
    this.props.onUpdate(event.target, this.props.patientData._id);

    if (event.target.className === "Input") this.setState({ input: event.target.value});
    if (event.target.className === "Output") this.setState({ output: event.target.value});

  },

  render: function() {
    return (
      <div id="cbcAndBmr">
      <div id="parentTop">
          <input type="text" id="textInputLower" className="WBC" onChange={this.handleChange} defaultValue={(this.props.patientData.wbc === undefined) ? "" : this.decodeString(this.props.patientData.wbc)}/>
          <label>\</label>
          <input type="text" id="underlineInput" className="Hg" onChange={this.handleChange} defaultValue={(this.props.patientData.hg === undefined) ? "" : this.decodeString(this.props.patientData.hg)}/>
          <label>/</label>
      </div>
      <div id="parentBottom">
          <label>/</label>
          <input type="text" className="Hct" onChange={this.handleChange} defaultValue={(this.props.patientData.hct === undefined) ? "" : this.decodeString(this.props.patientData.hct)}/>
          <label>\</label>
          <input type="text" id="edgeBoxBottom" className="plt" onChange={this.handleChange} defaultValue={(this.props.patientData.plt === undefined) ? "" : this.decodeString(this.props.patientData.plt)}/>
      </div>
      <br />
      <div id="BMRTop">
          <input type="text" id="underlineInput" className="Na" onChange={this.handleChange} defaultValue={(this.props.patientData.na === undefined) ? "" : this.decodeString(this.props.patientData.na)}/>
          <label>|</label>
          <input type="text" id="underlineInput" className="Cl" onChange={this.handleChange} defaultValue={(this.props.patientData.cl === undefined) ? "" : this.decodeString(this.props.patientData.cl)}/>
          <label>|</label>
          <input type="text" id="underlineInput" className="BUN" onChange={this.handleChange} defaultValue={(this.props.patientData.bun === undefined) ? "" : this.decodeString(this.props.patientData.bun)}/>
          <label>/</label>
          <input type="text" id="textInputLower" className="Gluc" onChange={this.handleChange} defaultValue={(this.props.patientData.gluc === undefined) ? "" : this.decodeString(this.props.patientData.gluc)}/>
      </div>
      <div id="BMRBottom">
          <input type="text" id="potassium" className="K" onChange={this.handleChange} defaultValue={(this.props.patientData.k === undefined) ? "" : this.decodeString(this.props.patientData.k)}/>
          <label>|</label>
          <input type="text" className="Bicarb" onChange={this.handleChange} defaultValue={(this.props.patientData.bicarb === undefined) ? "" : this.decodeString(this.props.patientData.bicarb)}/>
          <label>|</label>
          <input type="text" className="Cr" onChange={this.handleChange} defaultValue={(this.props.patientData.cr === undefined) ? "" : this.decodeString(this.props.patientData.cr)}/>
          <label>\</label>
      </div>
      <br />
      <div id="InAndOut">
        <label>I/O</label>
        <input type="text" id="underlineInput" className="Input" onChange={this.handleChange} defaultValue={this.props.patientData.input}/>
        <label>/</label>
        <input type="text" id="underlineInput" className="Output" onChange={this.handleChange} defaultValue={this.props.patientData.output}/>
        <label>: {this.state.input - this.state.output}</label>
      </div>
      <br />
      <div id="OtherLabs">
        <textarea className="OtherLabs" onChange={this.handleChange} defaultValue={(this.props.patientData.otherLabs === undefined) ? "" : this.decodeString(this.props.patientData.otherLabs)}/>
      </div>
    </div>
    )
  }
});

module.exports = PatientLabs;
