import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import PatientViewControllerPage from '../containers/PatientViewControllerPage.jsx';

const AllPatients = ({
  patientsExist,
  updateTheState,
  secretCode,
  webSiteConnect,
  patients,
  handleSubmit,
  resetLabsAndTodos
}) => (
  <div>
    {patientsExist ? (
      <div>
        <ul>
          {patients.map(element => <li key={element._id}><PatientViewControllerPage patientData={element} updateTheState={updateTheState} secretCode={secretCode} url={webSiteConnect}/><br /><hr /></li>)}
        </ul>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <RaisedButton id="addPatientButton" label="Add Patient" onClick={handleSubmit} primary={true}/>
        </div>
        <br/>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <RaisedButton label="ResetLabsAndTodos" onClick={resetLabsAndTodos} primary={true}  />
        </div>
      </div>
    ) : (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <RaisedButton id="addPatientButton" label="Add Patient" onClick={handleSubmit} primary={true} />
      </div>
    )}
  </div>
);

AllPatients.propTypes = {
  patientsExist: PropTypes.bool.isRequired,
  updateTheState: PropTypes.func.isRequired,
  secretCode: PropTypes.string.isRequired,
  webSiteConnect: PropTypes.string.isRequired,
  patients: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetLabsAndTodos: PropTypes.func.isRequired,
};

export default AllPatients;
