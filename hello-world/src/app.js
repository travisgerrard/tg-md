var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, Link, Redirect, browserHistory } from 'react-router'

var BugList = require('./BugList');

var NoMatch = React.createClass({
  render: function() {
    return (
      <h2>No match for the route</h2>
    );
  }
});

ReactDOM.render(
    (
      <Router history={browserHistory}>
        <Route path='/bugs' component={BugList} />
        <Redirect from="/" to="/bugs" />
        <Route path="*" component={NoMatch} />
      </Router>
    ),
    document.getElementById('main')
);
