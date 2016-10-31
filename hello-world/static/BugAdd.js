var React = require('react');
var ReactDOM = require('react-dom');

var BugAdd = React.createClass({
  displayName: 'BugAdd',

  render: function () {
    console.log("Rendering BugAdd");
    return React.createElement(
      'div',
      null,
      React.createElement(
        'form',
        { name: 'bugAdd' },
        React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
        React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
        React.createElement(
          'button',
          { onClick: this.handleSubmit },
          'Add Bug'
        )
      )
    );
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var form = document.forms.bugAdd;
    this.props.addBug({ owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1' });
    // clear the form for the next input
    form.owner.value = "";form.title.value = "";
  }
});

module.exports = BugAdd;