var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var AddTagSelectBox = require('./AddTagSelectBox.react.js');
var RemoveTagSelectBox = require('./RemoveTagSelectBox.react.js');

var Quotelist = React.createClass({
	mixins: [ParseReact.Mixin],

	// States can change dynamically
	// currentTag = what the dropdown displays
	// tagForQuoteQuery = "" if "All" is selected || the Parse.Object("Tag") is a tag is selected!
	getInitialState: function() {
		return {
			currentTag: "All",
			tagForQuoteQuery: "" 
		};
		
	},

	observe: function() {

		// Checks the state and if a tag is selected, cuts the quoteQuery as such
		// tagQuery gets the list of tags for a user
		if (this.state.tagForQuoteQuery === "") {
			return {
			quoteQuery: (new Parse.Query('Quote'))
				.equalTo("user", Parse.User.current().escape("username"))
				.notEqualTo("hidden", true)
				.descending("date"),

			tagQuery: Parse.User.current()
				.relation("userTags").query()
			};
		} else {
			return {
			quoteQuery: (new Parse.Query('Quote'))
				.equalTo("user", Parse.User.current().escape("username"))
				.notEqualTo("hidden", true)
				.descending("date")
				.equalTo("quoteTags", this.state.tagForQuoteQuery),

			tagQuery: Parse.User.current()
				.relation("userTags").query()
			};
		};
	},

	addTagToQuote: function(tagData, quoteData) {
		
		// This is kind of hacky.
		// I create the quote object to add the relation to
		// Then update quoteData with the quoteTagString. 
		// This is becuase I can't the the former to work with ParseReact.Mutation.AddRelation
		// Can't get the latter to work with a simple quote.save()

		var quote = new Parse.Object('Quote');
		quote.id = quoteData.objectId;
	
		var quoteTagsString = quoteData.tagString;
		if (typeof quoteTagsString === 'undefined' || quoteTagsString === "" || quoteTagsString === "None") {
			quoteTagsString = tagData.tag;
			quote.tagString = quoteTagsString;
		} else {
			quoteTagsString = quoteTagsString + ", " + tagData.tag
        	quote.tagString = quoteTagsString
		}
		
		var tag = new Parse.Object('Tag');
		tag.id = tagData.objectId;

		var relation = quote.relation("quoteTags");
		
		relation.add(tag);
		quote.save(null, {
		  success: function(quote) {
		    // Execute any logic that should take place after the object is saved.
		    ParseReact.Mutation.Set(quoteData, { tagString: quoteTagsString}).dispatch();       
		  },
		  error: function(quote, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
		    alert('Failed to create new object, with error code: ' + error.message);
		  }
		});
	},

	removeTagFromQuote: function(tagData, quoteData) {
		quote = new Parse.Object('Quote');
		quote.id = quoteData.objectId;
	
		var quoteTagsString = quoteData.tagString;
		var newQuoteTagStringOne = quoteTagsString.replace(", " + tagData.tag, "");
        var newQuoteTagStringTwo = newQuoteTagStringOne.replace( tagData.tag + ", ", "");
        var newQuoteTagStringThree = newQuoteTagStringTwo.replace( tagData.tag, "");		
        
		var tag = new Parse.Object('Tag');
		tag.id = tagData.objectId;

		var relation = quote.relation("quoteTags");
		
		relation.remove(tag);
		quote.save(null, {
		  success: function(quote) {
		    // Execute any logic that should take place after the object is saved.
		    console.log(quote); 
		    ParseReact.Mutation.Set(quoteData, { tagString: newQuoteTagStringThree}).dispatch();       
		  },
		  error: function(quote, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
		    alert('Failed to create new object, with error code: ' + error.message);
		  }
		});
	},

	deleteQuote: function(s) {
		quote = new Parse.Object('Quote');
		quote.id = s.data.objectId;

		quote.set("hidden", true);
		quote.save().then(function() {
			this.refreshQueries();
		}.bind(this));
	},

	render: function() {
		// Gettings quotes
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

		// Getting tags
		var tags = [{ value: "All", label:"All"}];
		for (var i = 0; i < this.data.tagQuery.length; i++) {
			tags.push({ value:this.data.tagQuery[i].tag ,
						label:this.data.tagQuery[i].tag,
						data:this.data.tagQuery[i] });
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
					<label className='quoteTags centered'>Tags: {s.tagString}<br/><AddTagSelectBox quote={s} tagString={s.tagString} userTags={tags} onTagAdded={this.addTagToQuote} /><RemoveTagSelectBox quote={s} tagString={s.tagString} userTags={tags} onTagRemoved={this.removeTagFromQuote} /></label>
					<label className='quoteInteractions centered'><i className="fa fa-trash-o" onClick={this.deleteQuote.bind(this, s)}></i></label>
				</div>
			);
		}.bind(this));

		if (this.pendingQueries().length) {
			quoteContent = <div className='loading' />;
		} else if (quotes.length < 1) {
			quoteContent = (
				<div className='emptyTable'>
					<h2>You have no quotes yet</h2>
				</div>
			);
		}

		// Getting tags
		var tags = [{ value: "All", label:"All"}];
		for (var i = 0; i < this.data.tagQuery.length; i++) {
			tags.push({ value:this.data.tagQuery[i].tag ,
						label:this.data.tagQuery[i].tag,
						data:this.data.tagQuery[i] });
		}

		var Select = require('react-select');
		var options = tags;

		// selected = the dropdown box
		// The .bind is in tehre so that you can call functions outside of this function
		var select = <Select name="form-field-name" value={this.state.currentTag} options={options} onChange={logChange.bind(this)} />

		// When the dropdown box is changed this get called
		function logChange(val) {
		    var result = $.grep(tags, function(e){ return e.value == val; });
		    var tag = result[0];

		    if (tag.value === "All") {
		    	this.setState({tagForQuoteQuery: ""});
		    	this.setState({currentTag: "All"});
		    } else {
		    	 var parseTag = new Parse.Object("Tag");
		    	 parseTag.id = tag.data.objectId;
		   		 this.setState({tagForQuoteQuery: parseTag});
		   		 this.setState({currentTag: tag.value});
		    }
		  
		    this.refreshQueries(); // Need this in there to make sure that the setState's are actaully set
		}

		// This is what is displayed when it comes to QuoteList
		return (
			<div className='appContent'>
				{select}
				{quoteContent}
			</div>
		);
	}
});

module.exports = Quotelist;
