import React, { PropTypes } from 'react';
import NavBar from '../components/NavBar.jsx';

class NavBarControl extends React.Component {

/**
  * Class constructor
  */
  // Sets initial state
  constructor(props) {
    super(props);

/*
    this.state = {
      inputBoxClassName: "AddConsult"
    }
*/
    this.navClick = this.navClick.bind(this);
  }

  navClick(e) {
    this.props.changeSort(e.target.outerText);
  }


  render() {
    return (
      <div>
        <NavBar navClick={this.navClick} />
      </div>
    )
  }
}

export default NavBarControl;
