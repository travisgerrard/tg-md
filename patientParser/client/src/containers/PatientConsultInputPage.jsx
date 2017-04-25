import React, { PropTypes } from 'react';
import PatientDynamicInputBox from '../components/PatientDynamicInputBox.jsx';
import Crypto from '../modules/Crypto';

require('../sass/PatientConsult.scss');

class PatientConsultInputPage extends React.Component {

  /**
    * Class constructor
    */
    // Sets initial state
    constructor(props) {
      super(props);

      this.state = {
        inputBoxClassName: "AddConsult",
        name: "Consults"
      }

      this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
      if (e.key === 'Enter') {
        this.props.onUpdate(e.target, this.props.patientData._id);
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

export default PatientConsultInputPage;
