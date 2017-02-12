var ReactDOM = require('react-dom');

import React, { PropTypes } from 'react';
import AllPatientsPage from './containers/AllPatientsPage.jsx';
import NavBarControl from './containers/NavBarControl.jsx';

//import App from './App.jsx';

require('./sass/App.scss');

class TopLevel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageType: 'basic'
    }

    this.changeSort = this.changeSort.bind(this);
  }

  changeSort(val) {
      console.log(val);
      this.setState({ pageType: val });
    }

  render() {
    return (
      <div>
        <NavBarControl changeSort={this.changeSort}/>
        <AllPatientsPage pageType={this.state.pageType}/>
      </div>
    )
  }
};


var formRendered = ReactDOM.render(
  <TopLevel />,
  document.getElementById('main')
);
