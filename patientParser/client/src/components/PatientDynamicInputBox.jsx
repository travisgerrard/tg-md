import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const PatientDynamicInputBox =({
  handleKeyPress,
  inputBoxClassName,
  name
}) => (
  <TextField id={inputBoxClassName} onKeyPress={handleKeyPress} hintText={name} floatingLabelText={name} style = {{width: 150}} />
);

PatientDynamicInputBox.PropTypes = {
  handleKeyPress: PropTypes.func.isRequired,
  inputBoxClassName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default PatientDynamicInputBox;
