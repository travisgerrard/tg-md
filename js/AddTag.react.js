var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var AddTag = React.createClass({
	mixins: [ParseReact.Mixin],

	observe: function() {
		return {
			allTagsQuery: (new Parse.Query('Tag')) //A list of all the tags!
		};
	},

	render: function() {

		return (
			 <div className="tagCreator centered"> 
					<input
			          className='tagNameInput'
			          type='text'
			          ref='tagNameInput'
			          placeholder='Enter New Tag Name' />
			        <button className='button' onClick={this.addtag}>
			          Add tag +
			        </button>
		        </div>	
			)
	},

	addtag: function() {
		
		// Right now tagQuery pulls all the tags. 
		// This will break after the query does not contain all the tags.
		var tagName = React.findDOMNode(this.refs.tagNameInput);
		if (tagName.value === '') {
			return;	
		}

		var tagFound = false;
		var tag;
		for (var i = 0; i < this.data.allTagsQuery.length; i++) {
			if (tagName.value === this.data.allTagsQuery[i].tag) {
				//Just add relation to tag
				tagFound = true;
				tag = this.data.allTagsQuery[i];
			} 		
		}

		if (tagFound != true) {
			this.addNewTagAndFormRelation(tagName);
		} else {
			this.addRelationToTag(tag, tagName);
		}
	},

	addNewTagAndFormRelation: function (tagName) {
		var Tag = new Parse.Object.extend("Tag");
		var tag = new Tag();
		tag.set("tag", tagName.value);
		tag.save(null, {
		success: function(tag) {
		    // Execute any logic that should take place after the object is saved.
		    console.log(tag)
		    //console.log('New object created with objectId: ' + tag.id);
		    var user = Parse.User.current();
		    var relation = user.relation("userTags");
			relation.add(tag);
			user.save();
			tagName.value = '';
			this.refreshQueries();
			this.props.onChange();//This calls the parent query!
		  }.bind(this)/*Need bind(this) here in order to be able to call this.refreshQueries()*/,
		  error: function(tag, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
		    alert('Failed to create new object, with error code: ' + error.message);
		  }
		})
	},

	addRelationToTag: function (tagObject, tagName) {
		var user = Parse.User.current();
		var relation = user.relation("userTags");
		var tag = new Parse.Object('Tag');
		tag.id = tagObject.objectId;
		relation.add(tag)
		user.save();
		tagName.value = '';
		this.refreshQueries();
		this.props.onChange(); //This calls the parent query!*/
	}

})

module.exports = AddTag;
