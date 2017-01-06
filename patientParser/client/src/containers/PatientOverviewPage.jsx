import React, { PropTypes } from 'react';
import PatientOverviewTextArea from '../components/PatientOverviewTextArea.jsx';
import Crypto from '../modules/Crypto';

require('../sass/PatientOverview.scss');

class PatientOverviewPage extends React.Component {
  /**
    * Class constructor
    */
    constructor(props) {
      super(props);

      this.state = {
        overview: Crypto.decodeString(this.props.patientData.overview, this.props.secretCode)
      };

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.props.onUpdate(event.target, this.props.patientData._id);
    }

    /**
      * Render the component.
      */
    render() {
      console.log(this.handleChange);
      return (
        <PatientOverviewTextArea handleChange={this.handleChange} overview={this.state.overview} />
      );
    }
}

export default PatientOverviewPage;
