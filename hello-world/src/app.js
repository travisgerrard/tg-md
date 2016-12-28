import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router'

import BugList from './BugList.js';
import BugEdit from './BugEdit';

const NoMatch = () => <h2>No match for the route</h2>;
/*
var NoMatch = React.createClass({
  render: function() {
    return (
    );
  }
});
*/

ReactDOM.render(
    (
      <Router history={browserHistory}>
        <Route path='/bugs' component={BugList} />
        <Route path='/bugs/:id' component={BugEdit} />
        <Redirect from="/" to="/bugs" />
        <Route path="*" component={NoMatch} />
      </Router>
    ),
    document.getElementById('main')
);
