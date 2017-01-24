import React, { PropTypes } from 'react';

const PatientOverviewTextArea = ({
  handleChange,
  overview,
  className
}) => (
  <div id="Overview">
    <textarea className={className} onChange={handleChange} defaultValue={overview}/>
  </div>
);

PatientOverviewTextArea.propTypes = {
  handleChange: PropTypes.func.isRequired,
  overview: PropTypes.string.isRequired
};

export default PatientOverviewTextArea;
