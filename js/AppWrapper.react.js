var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var Quotelist = require('./Quotelist.react.js')
var Taglist = require('./Taglist.react.js')

var contents = [
  <Quotelist />,
  <Taglist />
];

var AppWrapper = React.createClass({

	getInitialState: function() {
		return {
			currentTab: 0
		};
	},

	render: function() {
	return (
	  <div>
	    <div className='menu'>
	      <a
	        className={this.state.currentTab === 0 ? 'selected' : ''}
	        onClick={this.selectTab.bind(this, 0)}>
	        Quote List
	      </a>
	      <a
	        className={this.state.currentTab === 1 ? 'selected' : ''}
	        onClick={this.selectTab.bind(this, 1)}>
	        Tag List
	      </a>
	    </div>
	    <div className='mainPanel'>
	      {contents[this.state.currentTab]}
	    </div>
	  </div>
	);
	},

	selectTab: function(tab) {
	this.setState({ currentTab: tab });
	}
	/*
	render: function() {

		var quoteList = <Quotelist />

		return (
			// What may need to happen is the following.
			// AppWrapper call the TaglistDropdown
			// TagListDropdown calls the quoteList
			// This way when tags selection changes, the quotes can update.
			<div className='tagList'>
				{quoteList}
			</div>
		);
	}*/
});

module.exports = AppWrapper;