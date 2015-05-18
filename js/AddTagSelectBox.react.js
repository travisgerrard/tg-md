var React = require('react');

var AddTagSelectBox = React.createClass({

	handleTagAddChange: function(e) {
		 var options = e.target.options;

		 var value = [];
		  for (var i = 0, l = options.length; i < l; i++) {
		    if (options[i].selected) {
		      value.push(options[i].value);
		    }
		  }

		  if (value !== "Add Tag") {
		  	for (var i = 0; i < this.props.userTags.length; i++) {
		  		if (value[0] === this.props.userTags[i].value) {
		  			this.props.onTagAdded(this.props.userTags[i].data, this.props.quote.data);
		  		}
		  	}
		  }

	},

	render: function() {

		var tagString = this.props.tagString;
		var userTags = this.props.userTags;
		userTags[0].label = "Add Tag";

		var optionNodes = this.props.userTags.map(function(tags){
				if(tagString.indexOf(tags.value) === -1) // If tagString contains tag text, do not have in list!
                return <option value={tags.value}>{tags.label}</option>;
        });

		return 		(
				<select className="tagAddSelect centered" value="B" onChange={this.handleTagAddChange}>
					{optionNodes}
				</select>
			)
	}
})

module.exports = AddTagSelectBox;
