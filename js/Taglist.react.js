var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var AddTag = require('./AddTag.react.js')

var Taglist = React.createClass({
	mixins: [ParseReact.Mixin],

	observe: function() {
		return {
			tagQuery: Parse.User.current()
				.relation("userTags").query()
				.ascending("tag")
		};
	},

	render: function() {
		var tags = [];
		for (var i = 0; i < this.data.tagQuery.length; i++) {
			tags.push({ value:this.data.tagQuery[i].tag ,
						label:this.data.tagQuery[i].tag,
						data:this.data.tagQuery[i] });
		}
					    
		var tagContent = tags.map(function(s) {
			return (
				<div className="tagBlock centered" key={s.value}>
					<label className="tagInList ">{s.value}</label>
				    <div className="options">
				        <a onClick={this.removeItem.bind(this, s)}>X</a>
				    </div>
					<div className="tagListBottomBorder"></div>
				</div>
			);
		}.bind(this));

		// adding the onChange={this.handleChange} here
		// makes it so that when this.props.onChange() is called in child, this.handleChange is ran in parent
		return (
			<div className="appContent">
				<AddTag onChange={this.handleChange} />
				{tagContent}
			</div>
		)

	},

	handleChange: function() {
	    console.log("Handle change in parent ran");
		this.refreshQueries()
  	},


	removeItem: function(s) {

		var tag = new Parse.Object('Tag');
		tag.id = s.data.objectId;

	    var user = Parse.User.current();
		var Quotes = Parse.Object.extend("Quote");
		var query = new Parse.Query(Quotes);
		query.equalTo("user", Parse.User.current().escape("username"));
		query.notEqualTo("hidden", true)
		query.equalTo("quoteTags", tag)

		query.find({
		  success: function(results) {
		    // Do something with the returned Parse.Object values
		    for (var i = 0; i < results.length; i++) { 
		      var object = results[i];
		      this.removeTagFromQuote(s.data, object);
		    }
		  }.bind(this),
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});

	    //Here we pass in the item that is clicked, and the object is in s.data!
	    var tagObject = s.data;
	    var user = Parse.User.current();
		var relation = user.relation("userTags");
		var tag = new Parse.Object('Tag');
		tag.id = tagObject.objectId;
		relation.remove(tag)
		user.save().then(function() {
			this.refreshQueries();
		}.bind(this));
	},

	removeTagFromQuote: function(tagData, quoteData) {
		// Since quoteData here is an acutale Quote Object, this is more direct then the method used 
		// in the Quotelist.react.js file
		var quoteTagsString = quoteData.get("tagString");
		var newQuoteTagStringOne = quoteTagsString.replace(", " + tagData.tag, "");
        var newQuoteTagStringTwo = newQuoteTagStringOne.replace( tagData.tag + ", ", "");
        var newQuoteTagStringThree = newQuoteTagStringTwo.replace( tagData.tag, "");
        
		var tag = new Parse.Object('Tag');
		tag.id = tagData.objectId;

		var relation = quoteData.relation("quoteTags");
		
		relation.remove(tag);
		quoteData.set("tagString", newQuoteTagStringThree)
		quoteData.save(null, {
		  success: function(quote) {
		    // Execute any logic that should take place after the object is saved.
		  },
		  error: function(quote, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
		    alert('Failed to create new object, with error code: ' + error.message);
		  }
		});
	}

});

module.exports = Taglist;
