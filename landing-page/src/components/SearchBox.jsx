import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

const SearchBox = ({
  handleChange,
  name
}) => (
  <div className="col">
    <TextField id="Name" onChange={handleChange} defaultValue={name} hintText="Name" floatingLabelText="Name" style = {{width: 150}} />
  </div>
)

SearchBox.PropTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default SearchBox;
