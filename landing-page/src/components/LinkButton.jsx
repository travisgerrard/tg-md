import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

const LinkButton = ({
  onPress,
  name,
  link
}) => (
  <div className="col">
    <FlatButton
      label={name}
      id={link}
      labelPosition="after"
      primary={true}
      onTouchTap={onPress}
      />
  </div>
)

LinkButton.PropTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default LinkButton;
