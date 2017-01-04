import React, { PropTypes } from 'react';

const PatientOverviewTextArea = ({
  handleChange,
  overview,
}) => (
  <div id="Overview">
    <textarea className="Overview" onChange={handleChange} defaultValue={(this.props.patientData.overview === undefined) ? "" : this.decodeString(this.props.patientData.overview)}/>
  </div>
);

PatientOverviewTextArea.propTypes = {
  handleChange: PropTypes.func.isRequired,
  overview: PropTypes.string.isRequired
}

export default PatientOverviewTextArea;
