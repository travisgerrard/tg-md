import React, { PropTypes } from 'react';

const PatientDailyTodoList = ({
  handleChange,
  labsback,
  consults,
  andon,
  ivmed,
  mar,
  amlab,
  dispo,
  learning,
  seen,
  lines,
  foley,
  mobility
}) => (
  <div>
    <ul id="dailyToDoUl">
    <li>
        <label>
          <input type="checkbox" className="LabsBack" value="labsback" onChange={handleChange} defaultChecked={labsback} />Labs Back
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" className="Consults" value="consults" onChange={handleChange} defaultChecked={consults} />Consults
        </label>
      </li>
      <li>
        <label>
        <input type="checkbox" className="Andon" value="andon" onChange={handleChange} defaultChecked={andon} />Andon - VTE/Glucose
        </label>
      </li>
      <li>
        <label>
        <input type="checkbox" className="IVMed" value="ivmed" onChange={handleChange} defaultChecked={ivmed} />Micro
        </label>
      </li>
      <li>
        <label>
        <input type="checkbox" className="Mar" value="mar" onChange={handleChange} defaultChecked={mar} />MAR 48
        </label>
      </li>
      <li>
        <label>
        <input type="checkbox" className="AMLab" value="amlab" onChange={handleChange} defaultChecked={amlab} />AM Labs
        </label>
      </li>
      <li>
        <label>
        <input type="checkbox" className="Dispo" value="dispo" onChange={handleChange} defaultChecked={dispo} />Discharge/Dispo
        </label>
      </li>
      <li>
        <label>
        <input type="checkbox" className="Learning" value="learning" onChange={handleChange} defaultChecked={learning} />Learning
        </label>
      </li>
      <li>
        <label>
        <input type="checkbox" className="Seen" value="seen" onChange={handleChange} defaultChecked={seen} />Seen
        </label>
      </li>
      <hr />
        <li>
          <label>
          <input type="checkbox" className="Lines" value="lines" onChange={handleChange} defaultChecked={lines} />Lines
          </label>
        </li>
        <li>
          <label>
          <input type="checkbox" className="Foley" value="foley" onChange={handleChange} defaultChecked={foley} />Foley
          </label>
        </li>
        <li>
          <label>
          <input type="checkbox" className="Mobility" value="mobility" onChange={handleChange} defaultChecked={mobility} />Mobility
          </label>
        </li>
    </ul>
  </div>
);

PatientDailyTodoList.propTypes = {
  handleChange: PropTypes.func.isRequired,
  labsback: PropTypes.bool.isRequired,
  consults: PropTypes.bool.isRequired,
  andon: PropTypes.bool.isRequired,
  ivmed: PropTypes.bool.isRequired,
  mar: PropTypes.bool.isRequired,
  amlab: PropTypes.bool.isRequired,
  dispo: PropTypes.bool.isRequired,
  learning: PropTypes.bool.isRequired,
  seen: PropTypes.bool.isRequired,
  lines: PropTypes.bool.isRequired,
  foley: PropTypes.bool.isRequired,
  mobility: PropTypes.bool.isRequired
};

export default PatientDailyTodoList;
