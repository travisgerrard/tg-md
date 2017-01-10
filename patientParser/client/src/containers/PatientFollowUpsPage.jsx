import React, { PropTypes } from 'react';
import PatientDynamicList from '../components/PatientDynamicList.jsx';
import PatientDynamicInputBox from '../components/PatientDynamicInputBox.jsx';
import Crypto from '../modules/Crypto';

require('../sass/PatientFollowUps.scss');

class PatientFollowUpsPage extends React.Component {
  /**
    * Class constructor
    */
    constructor(props) {
      super(props);

      this.state = {
        listCss: "followUpUl",
        listContents: this.props.patientData.followup,
        listClassName: "FollowUp",
        deleteText: "deleteFollowUp",
        inputBoxClassName: "AddFollowUp"
      }


      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.decodeString = this.decodeString.bind(this);
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
      console.log(this.state.listCss);

      if (this.state.listContents !== undefined) {
      return (
        <div>
          <label>Follow Ups</label>
          <br />
          <PatientDynamicInputBox handleKeyPress={this.handleKeyPress} inputBoxClassName={this.state.inputBoxClassName} />
          <PatientDynamicList listCss={this.state.listCss} listContents={this.state.listContents} listClassName={this.state.listClassName} deleteText={this.stat.deleteText} handleDelete={this.handelDelete} decodeString={this.decodeString} />
        </div>
      )
    } else {
      return (
        <div>
          <label>Follow Ups</label>
          <br />
          <PatientDynamicInputBox handleKeyPress={this.handleKeyPress} inputBoxClassName={this.state.inputBoxClassName} />
        </div>
      )
    }
    }
}

export default PatientFollowUpsPage;
