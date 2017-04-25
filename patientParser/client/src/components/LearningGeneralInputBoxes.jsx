import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const LearningGeneralInputBoxes = ({
  handleChange,
  name,
  room,
  dob,
  mrn,
  los,
  ro,
  intern,
  admitDate,
  age
}) => (
  <div>
    <div className="flex-grid">
      <div className="col">
        <TextField id="Name" disabled={true} onChange={handleChange} defaultValue={name} hintText="Name" floatingLabelText="Name" style = {{width: 150}} />
      </div>

      <div className="col">
        <TextField id="DOB" disabled={true} onChange={handleChange} defaultValue={dob} hintText="Date of Birth" floatingLabelText="DOB" style = {{width: 100}}/>
      </div>

      <div className="col">
        <TextField id="Age" value={age} disabled={true} hintText="Age" floatingLabelText="Age" style = {{width: 75}}/>

      </div>

      <div className="col">
        <TextField id="Intern" disabled ={true} onChange={handleChange} defaultValue={intern} hintText="Intern" floatingLabelText="Intern" style = {{width: 150}} />
      </div>

    </div>
    <br />
  </div>
);

LearningGeneralInputBoxes.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  mrn: PropTypes.string.isRequired,
  los: PropTypes.string.isRequired,
  ro: PropTypes.string.isRequired,
  intern: PropTypes.string.isRequired,
  admitDate: PropTypes.number.isRequired,
  age: PropTypes.number.isRequired
};

export default LearningGeneralInputBoxes;
