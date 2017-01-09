import React, { PropTypes } from 'react';
import PatientDynamicList from '../components/PatientDynamicList.jsx';
import PatientDynamicInputBox from '../components/PatientDynamicInputBox.jsx';
import Crypto from '../modules/Crypto';

require('../sass/PatientFollowUps.scss');

class PatientFollowUps extends React.Component {
  /**
    * Class constructor
    */
    constructor(props) {
      super(props);

      this.state = {
        listCss: "followUpUl",
        listContents: this.props.patientData.followup,
        listClassName: "FollowUp",
        deleteText: "deleteFollowUp"
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }
}
