import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

const SearchBox = ({
  onKeyPress,
  name,
  searchPrefix
}) => (
  <div className="col">
    <TextField id={searchPrefix} onKeyPress={onKeyPress} hintText={name} floatingLabelText={name} style = {{width: 150}} />
  </div>
)

SearchBox.PropTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  searchPrefix: PropTypes.string.isRequired,
};

export default SearchBox;
