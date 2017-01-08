import React, { PropTypes } from 'react';

const PatientDynamicList = ({
  componentName,
  listContents,
  listClassName,
  handleChange
}) => (
  <ul id="followUpUl">
    {this.props.patientData.followup.map((element, key) =>
      <li key={element.followUpText} >
      <input type="checkbox" className="FollowUp" name={key} value={this.decodeString(element.followUpText)} onChange={this.handleChange} defaultChecked={element.complete} />{this.decodeString(element.followUpText)}
      <a className="deleteFollowUp" name={key} onClick={this.handelDelete}>{element.complete ? "_X_" : ""}</a>
      </li>
    )}
  </ul>
);

PatientDynamicLis.propTypes = {

};

export default PatientDynamicList;
