import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const PatientGeneralInputBoxes = ({
  handleChange,
  name,
  room,
  dob,
  mrn,
  los,
  ro,
  intern,
  admitDate,
  age,
  handleDeletePatient
}) => (
  <div>
    <div className="flex-grid">
      <div className="col">
        <TextField id="Name" onChange={handleChange} defaultValue={name} hintText="Name" floatingLabelText="Name" style = {{width: 150}} />
      </div>

      <div className="col">
        <TextField id="Room" onChange={handleChange} defaultValue={room} hintText="Room" floatingLabelText="Room" style = {{width: 75}} />
      </div>

      <div className="col">
        <TextField id="DOB" onChange={handleChange} defaultValue={dob} hintText="Date of Birth" floatingLabelText="DOB" style = {{width: 100}}/>
      </div>

      <div className="col">
        <TextField id="Age" value={age} disabled={true} hintText="Age" floatingLabelText="Age" style = {{width: 75}}/>

      </div>

      <div className="col">
        <TextField id="MRN" onChange={handleChange} defaultValue={mrn} hintText="MRN" floatingLabelText="MRN" style = {{width: 100}}/>

      </div>

      <div className="col">
        <TextField id="LOS" onChange={handleChange} defaultValue={los} hintText="Admit date" floatingLabelText="Admit date" style = {{width: 100}}/>

      </div>

      <div className="col">
        <TextField id="Day" value={admitDate} disabled={true} hintText="Day" floatingLabelText="Day" style = {{width: 75}}/>

      </div>

      <div className="col">
        <TextField id="Intern" onChange={handleChange} defaultValue={intern} hintText="Intern" floatingLabelText="Intern" style = {{width: 100}}/>

      </div>

      <div className="col">
        <TextField id="RO" onChange={handleChange} defaultValue={ro} hintText="Order" floatingLabelText="Order" style = {{width: 75}}/>
          <button id="DeleteButton" className="DeleteButton" onClick={handleDeletePatient} >X</button>
      </div>



    </div>
    <br />
  </div>
);

PatientGeneralInputBoxes.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleDeletePatient: PropTypes.func.isRequired,
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

export default PatientGeneralInputBoxes;
