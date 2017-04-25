import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import LearningViewControllerPage from '../containers/LearningViewControllerPage.jsx';

const Learning = ({
  patientsExist,
  updateTheState,
  secretCode,
  webSiteConnect,
  patients,
  handleSubmit,
  internOne,
  internTwo,
  resetLabsAndTodos,
  handleChange
}) => (
  <div>

        <ul>
          {patients.map(element => {
            if(element.learningList.length != 0) {
              return (
                <li key={element._id}><LearningViewControllerPage patientData={element} updateTheState={updateTheState} secretCode={secretCode} url={webSiteConnect}/><br /><hr /></li>
              )
            }
          }
        )}
        </ul>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <TextField id="Intern1" defaultValue={internOne} onChange={handleChange} hintText="Intern 1" floatingLabelText="Intern 1" style = {{width: 150}} />
        </div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <TextField id="Intern2" defaultValue={internTwo} onChange={handleChange} hintText="Intern 2" floatingLabelText="Intern 2 " style = {{width: 150}} />
        </div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <RaisedButton id="learningButton" label="Learning for Interns" onClick={handleSubmit} primary={true} />
        </div>
  </div>
);

Learning.propTypes = {
  patientsExist: PropTypes.bool.isRequired,
  updateTheState: PropTypes.func.isRequired,
  secretCode: PropTypes.string.isRequired,
  webSiteConnect: PropTypes.string.isRequired,
  internOne: PropTypes.string.isRequired,
  internTwo: PropTypes.string.isRequired,
  patients: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetLabsAndTodos: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Learning;
