import React, { PropTypes } from 'react';

const PatientGeneralInputBoxes = ({
  handleChange,
  name,
  room,
  dob,
  mrn,
  los,
  ro,
  admitDate,
  age
}) => (
  <div>
    <div className="flex-grid">
      <div className="col">

        <input id="PatientInput" type="text" className="Name" placeholder="Name" onChange={handleChange} defaultValue={name} />
      </div>

      <div className="col">
        <label id="PatientGen">Room:</label>
        <input id="PatientInput" type="text" className="Room" onChange={handleChange} defaultValue={room}/>
      </div>

      <div className="col">

        <label id="PatientGen">DOB:</label>
        <input id="PatientInput" type="text" className="DOB" onChange={handleChange} defaultValue={dob}/>
      </div>

      <div className="col">

        <label>Age: {age}</label>
      </div>

      <div className="col">

        <label id="PatientGen">MRN:</label>
        <input id="PatientInput" type="text" className="MRN" onChange={handleChange} defaultValue={mrn}/>
      </div>

      <div className="col">

        <label id="PatientGen">Admit:</label>
        <input id="PatientInput" type="text" className="LOS" onChange={handleChange} defaultValue={los}/>
      </div>

      <div className="col">

        <label>Day: {admitDate}</label>
      </div>

      <div className="col">

        <label id="PatientGen">RO:</label>
        <input id="PatientInput" type="text" className="RO" onChange={handleChange} defaultValue={ro}/>
      </div>

    </div>
    <br />
  </div>
);

PatientGeneralInputBoxes.propTypes = {
  handleChange: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  mrn: PropTypes.string.isRequired,
  los: PropTypes.string.isRequired,
  ro: PropTypes.string.isRequired,
  admitDate: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired
};

export default PatientGeneralInputBoxes;
