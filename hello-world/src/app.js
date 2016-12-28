var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, Link, Redirect, browserHistory, withRouter } from 'react-router'

var BugList = require('./BugList');
var BugEdit = require('./BugEdit');

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
        <Route path='/bugs/:id' component={BugEdit} />
        <Redirect from="/" to="/bugs" />
        <Route path="*" component={NoMatch} />
      </Router>
    ),
    document.getElementById('main')
);
