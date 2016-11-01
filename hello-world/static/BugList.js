var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugRow = React.createClass({
  displayName: 'BugRow',

  render: function () {
    console.log("Rendering BugRow:", this.props.bug);
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        null,
        this.props.bug._id
      ),
      React.createElement(
        'td',
        null,
        this.props.bug.status
      ),
      React.createElement(
        'td',
        null,
        this.props.bug.priority
      ),
      React.createElement(
        'td',
        null,
        this.props.bug.owner
      ),
      React.createElement(
        'td',
        null,
        this.props.bug.title
      )
    );
  }
});

var BugTable = React.createClass({
  displayName: 'BugTable',

  render: function () {
    console.log("Rendering bug table, num items:", this.props.bugs.length);
    var bugRows = this.props.bugs.map(function (bug) {
      return React.createElement(BugRow, { key: bug._id, bug: bug });
    });
    return React.createElement(
      'table',
      null,
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            null,
            'Id'
          ),
          React.createElement(
            'th',
            null,
            'Status'
          ),
          React.createElement(
            'th',
            null,
            'Priority'
          ),
          React.createElement(
            'th',
            null,
            'Owner'
          ),
          React.createElement(
            'th',
            null,
            'Title'
          )
        )
      ),
      React.createElement(
        'tbody',
        null,
        bugRows
      )
    );
  }
});

var BugList = React.createClass({
  displayName: 'BugList',

  getInitialState: function () {
    return { bugs: [] };
  },
  render: function () {
    console.log("Rendering bug list, num items:", this.state.bugs.length);
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Bug Tracker'
      ),
      React.createElement(BugFilter, null),
      React.createElement('hr', null),
      React.createElement(BugTable, { bugs: this.state.bugs }),
      React.createElement('hr', null),
      React.createElement(BugAdd, { addBug: this.addBug })
    );
  },

  componentDidMount: function () {
    $.ajax('/api/bugs').done(function (data) {
      this.setState({ bugs: data });
    }.bind(this));
  },

  addBug: function (bug) {
    console.log("Adding bug:", bug);
    // We're advised not to modify the state, it's immutable. So, make a copy.
    $.ajax({
      type: 'POST', url: '/api/bugs', contentType: 'application/json',
      data: JSON.stringify(bug),
      success: function (data) {
        var bug = data;
        // We're advised not to modify the state, it's immutable. So, make a copy
        var bugsModified = this.state.bugs.concat(bug);
        this.setState({ bugs: bugsModified });
      }.bind(this),
      error: function (xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding bug:", err);
      }
    });
  }
});

module.exports = BugList;