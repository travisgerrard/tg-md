import React, { PropTypes } from 'react';

const NavBar = ({
  navClick
}) => (
  <nav role='navigation' className="main-nav" id="main-nav">
    <ul id="main-nav-list">
      <li>
        <a onClick={navClick}>
          <div>
            Rounding Order
          </div>
        </a>
      </li>
      <li>
        <a onClick={navClick}>
          <div>
            Room
          </div>
        </a>
      </li>
      <li>
        <a onClick={navClick}>
          <div>
            Name
          </div>
        </a>
      </li>
      <li>
        <a onClick={navClick}>
          <div>
            Seen
          </div>
        </a>
      </li>
      <li>
        <a onClick={navClick}>
          <div>
            learning
          </div>
        </a>
      </li>
    </ul>
  </nav>
)

NavBar.propTypes = {
  navClick: PropTypes.func.isRequired
};

export default NavBar;
