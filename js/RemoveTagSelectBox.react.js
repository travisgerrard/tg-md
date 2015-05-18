var React = require('react');

var RemoveTagSelectBox = React.createClass({

	handleTagRemovedChange: function(e) {
		 var options = e.target.options;

		 var value = [];
		  for (var i = 0, l = options.length; i < l; i++) {
		    if (options[i].selected) {
		      value.push(options[i].value);
		    }
		  }

		  if (value !== "Remove Tag") {
		  	for (var i = 0; i < this.props.userTags.length; i++) {
		  		if (value[0] === this.props.userTags[i].value) {
		  			this.props.onTagRemoved(this.props.userTags[i].data, this.props.quote.data);
		  		}
		  	}
		  }

	},

	render: function() {

		var tagString = this.props.tagString;
		var userTags = this.props.userTags;
		userTags[0].label = "Remove Tag";

		var optionNodes = this.props.userTags.map(function(tags){
				if(tagString.indexOf(tags.value) !== -1 || tags.label === "Remove Tag") // If tagString contains tag text, do not have in list!
                return <option value={tags.value}>{tags.label}</option>;
        });

		if (tagString === "None") {
			return null;
		}
		return 		(
				<select className="tagAddSelect centered" value="B" onChange={this.handleTagRemovedChange}>
					{optionNodes}
				</select>
			)
	}
})

module.exports = RemoveTagSelectBox;
