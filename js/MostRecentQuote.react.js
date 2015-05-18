var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var MostRecentQuote = React.createClass({
	mixins: [ParseReact.Mixin],

	observe: function() {
		// Checks the state and if a tag is selected, cuts the quoteQuery as such
		// tagQuery gets the list of tags for a user
		return {
		quoteQuery: (new Parse.Query('Quote'))
			.notEqualTo("hidden", true)
			.descending("date")
			.limit(1)	
		};
	},

	render: function() {
		var quotes = [];
		for (var i = 0; i < this.data.quoteQuery.length; i++) {
			var tagData = this.data.quoteQuery[i].tagString;
			var tagString = (typeof tagData === 'undefined' || tagData === "" ? 'None' : this.data.quoteQuery[i].tagString)
			quotes.push({ date:this.data.quoteQuery[i].date,
							selection: this.data.quoteQuery[i].selection, 
							title: this.data.quoteQuery[i].title,
							url: this.data.quoteQuery[i].url,
							tagString: tagString,
							data: this.data.quoteQuery[i]
						});
		}

		var SmartTimeAgo = require('react-smart-time-ago'); // Gives us the date format 1 second ago, 5 mintues ago, etc

		// What will be displayed!
		var quoteContent = quotes.map(function(s) {
			return (
				<div className='quoteBlock' key={s.selection}>
					<label className='quoteDate'><SmartTimeAgo value={s.date} /></label>
					<label className='quoteSelection centered'>{s.selection}</label>
					<label className='quoteTitle centered'>{s.title}</label>
					<a href={s.url} target="_blank" className='quoteUrl centered'>{s.url}</a>
					<label className='quoteTags recentQuoteTag centered'>Tags: {s.tagString}</label>
				</div>
			);
		}.bind(this));

		if (this.pendingQueries().length) {
			quoteContent = <div className='loading' />;
		} else if (quotes.length < 1) {
			quoteContent = (
				<div className='emptyTable'>
					<h2>There are no quotes</h2>
				</div>
			);
		}

		return (
			<div className='mostRecentQuote'>
				{quoteContent}
			</div>
		);

	}

});

module.exports = MostRecentQuote;