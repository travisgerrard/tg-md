var React = require('react');
var ReactDOM = require('react-dom');

var BugFilter = React.createClass({
  displayName: 'BugFilter',

  render: function () {
    console.log("Rendering BugFilter");
    return React.createElement(
      'div',
      null,
      'A way to filter the list of bugs would come here.'
    );
  }
});

module.exports = BugFilter;