import React, { PropTypes } from 'react';

const PatientDynamicInputBox =({
  handleKeyPress,
  inputBoxClassName
}) => (
  <input type="text" className={inputBoxClassName} onKeyPress={handleKeyPress} />
);

PatientDynamicInputBox.PropTypes = {
  handleKeyPress: PropTypes.func.isRequired,
  inputBoxClassName: PropTypes.string.isRequired
};

export default PatientDynamicInputBox;
