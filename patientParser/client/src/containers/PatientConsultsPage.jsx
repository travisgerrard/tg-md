import React, { PropTypes } from 'react';
import PatientDynamicList from '../components/PatientDynamicList.jsx';
import PatientDynamicInputBox from '../components/PatientDynamicInputBox.jsx';
import Crypto from '../modules/Crypto';

require('../sass/PatientConsult.scss');

class PatientFollowUpsPage extends React.Component {
  /**
    * Class constructor
    */
    // Sets initial state
    constructor(props) {
      super(props);

      this.state = {
        listCss: "consultUl",
        listContents: this.props.patientData.consult,
        listClassName: "Consult",
        deleteText: "deleteConsult",
        textName: "consultText",
        inputBoxClassName: "AddConsult"
      }


      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.decodeString = this.decodeString.bind(this);
    }

    // updates state with props from PatientAll with they get reloaded
    componentWillReceiveProps(nextProps) {
      this.setState ({ listContents: nextProps.patientData.followup });
    }

    decodeString(stringToDecode) {
        return Crypto.decodeString(stringToDecode, this.props.secretCode);
    }

    // Updates model that action was checked
    handleChange(event) {
      this.props.onUpdate(event.target, this.props.patientData._id);
    }

    handleKeyPress(e) {
      if (e.key === 'Enter') {
        this.props.onUpdate(e.target, this.props.patientData._id);
        e.currentTarget.value = ""
      }
    }

    handleDelete(event) {
      //console.log(event.target.name);
      this.props.onUpdate(event.target, this.props.patientData._id);
    }

    render() {
      if (this.state.listContents !== undefined) {
      return (
        <div>
          <label>Consults</label>
          <br />
          <PatientDynamicInputBox handleKeyPress={this.handleKeyPress} inputBoxClassName={this.state.inputBoxClassName} />
          <PatientDynamicList listCss={this.state.listCss} listContents={this.state.listContents} listClassName={this.state.listClassName} deleteText={this.state.deleteText} textName={this.state.textName} handleDelete={this.handleDelete} decodeString={this.decodeString} handleChange={this.handleChange} />
        </div>
      )
    } else {
      return (
        <div>
          <label>Consults</label>
          <br />
          <PatientDynamicInputBox handleKeyPress={this.handleKeyPress} inputBoxClassName={this.state.inputBoxClassName} />
        </div>
      )
    }
    }
}

export default PatientFollowUpsPage;
