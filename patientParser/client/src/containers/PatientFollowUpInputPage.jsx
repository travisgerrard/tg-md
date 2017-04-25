import React, { PropTypes } from 'react';
import PatientDynamicInputBox from '../components/PatientDynamicInputBox.jsx';
import Crypto from '../modules/Crypto';

require('../sass/PatientFollowUps.scss');

class PatientFollowUpInputPage extends React.Component {

  /**
    * Class constructor
    */
    // Sets initial state
    constructor(props) {
      super(props);

      this.state = {
        inputBoxClassName: "AddFollowUp",
        name: "Follow Ups"
      }

      this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
      if (e.key === 'Enter') {
        if (e.currentTarget.value != "") {
          this.props.onUpdate(e.target, this.props.patientData._id);
        }
        e.currentTarget.value = ""
      }
    }

    render() {
      return (
        <div>
          <PatientDynamicInputBox handleKeyPress={this.handleKeyPress} inputBoxClassName={this.state.inputBoxClassName} name={this.state.name} />
          <div>
            <br />
          </div>
        </div>
      )
    }
}

export default PatientFollowUpInputPage;
