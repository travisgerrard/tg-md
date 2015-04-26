// Our two lists

var tagList;
var quoteList;


// QUOTE VIEWS

var QuoteView = Parse.View.extend({
	tagName: "li",
	model: Quote,

	initialize: function() {
		this.template = _.template($('#quote-template').html());
	},

	render: function() {
		/*
		this.$el.html('<li>' + this.model.get("selection") + '</li>'
			+ '<li>' + this.model.get("title") + '</li>'
			+ '<li>' + this.model.get("url") + '</li>');
		*/

		//var html = $(this.el).html(this.template(this.model.toJSON()));

		this.$el.html(this.template(this.model.attributes));

		return this;
	}
});

var QuoteListView = Parse.View.extend({
	model: QuoteCollection,

	render: function() {
		this.$el.html('');
		this.$el.html(); // Lets render this view

		var self = this;

		for(var i = 0; i < this.model.length; i++) {
			// lets create a noteview to render
			var m_quoteView = new QuoteView({model: this.model.at(i)});
			// lets add this book view to this list view
			this.$el.append(m_quoteView.$el);
			m_quoteView.render(); // render the note...
		}

		return this;
	},
});

// This runs with "All Quotes" button is pressed
function allQuotesPressed() {
	document.getElementById("dropdownMenu1").innerHTML = 'Tags <span class="caret"></span>';
	showAllQuotes();
}

function showAllQuotes() {
	var quoteCollection = new QuoteCollection;

	// Setup the query for the collection to look for todos from the current user
	quoteCollection.query = new Parse.Query(Quote);
	quoteCollection.query.equalTo("user", Parse.User.current().escape("username"));
	quoteCollection.query.notEqualTo("hidden", true);
	quoteCollection.query.descending("date")

	quoteCollection.fetch({
		success: function(myObject) {
		  // The object was refreshed successfully.

		  // quoteList is a <ul> in our Body
		    quoteList = new QuoteListView({ el: $("#quoteList"), model: quoteCollection });
			quoteList.render();

			document.getElementById("allQuotesButton").style.display = "none";
		},
		error: function(myObject, error) {
		  // The object was not refreshed successfully.
		  // error is a Parse.Error with an error code and message.
		}
	});
}

// TAG VIEWS

var TagView = Parse.View.extend({
	model: Tag,
	tagName: 'li',
	template: '',

	events: {
		'click': "itemClicked"
	},

	itemClicked: function() {
		
		
		var quoteCollectionTwo = new QuoteCollection;
		var query = new Parse.Query(Quote);
		query.equalTo("quoteTags", this.model);

		quoteCollectionTwo.query = query;

		quoteCollectionTwo.fetch({
		  success: function(quotes) {
		    // quotes is a lists of quotes filtered by tag
		    quoteList = new QuoteListView({ el: $("#quoteList"), model: quoteCollectionTwo });
			quoteList.render();
		  }

		});

		document.getElementById("dropdownMenu1").innerHTML = this.model.get('tag') + ' <span class="caret"></span>';
		document.getElementById("allQuotesButton").style.display = "inline";

		//alert('clicked: ' + this.model.get('tag'));
	},

	initialize: function() {
		this.template = _.template($('#tagItem').html());
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	
});

function loggedIn() {
	if (Parse.User.current()) {

		showAllQuotes();

		var user = Parse.User.current();
		var relation = user.relation("userTags");

		var tagCollection = new TagCollection();
		tagCollection.query = relation.query();

		// OLD QUERY THAT LOOKED UP ALL TAGS, the new one look up only those that user has created.
		//var query = new Parse.Query(Tag);
		//tagCollection.query = query;
		//console.log(relation.query());

		tagCollection.fetch({
		     success: function(myObject) {
		          // The object was refreshed successfully.
		            
		            tagList = new TagListView({ el: $("#tagDropDown"), model: tagCollection });
				    tagList.render();
		        },
		        error: function(myObject, error) {
		          // The object was not refreshed successfully.
		          // error is a Parse.Error with an error code and message.
		        }
		});
	}
}


var TagListView = Parse.View.extend({
	model: TagCollection,

	 initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
    },
   
	events: {
		"click .allQuotesButton": "allQuotesClicked",
	},

	allQuotesClicked: function() {
		console.log("Clicked allQuoteButton");
	},

	render: function() {

        this.$el.html(); // lets render this view

		for(var i = 0; i < this.model.length; i++) {
			// lets create a noteview to render
			var m_noteView = new TagView({model: this.model.at(i)});

			//console.log(m_noteView);

			// lets add this book view to this list view
			this.$el.append(m_noteView.$el);
			m_noteView.render(); // render the note...
		}

		return this;		
	},
});

function logOutPressed() {

    // Empties the quoteListView
	quoteList = new QuoteListView({ el: $("#quoteList") });
    quoteList.render();

    // Does not work as well...
   	tagList = new TagListView({ el: $("#tagDropDown") });
   	tagList.render();

   	document.getElementById("allQuotesButton").style.display = "none";
   	document.getElementById("dropdownMenu1").style.display = "none";
   	document.getElementById("logOut").style.display = "none";

   	Parse.User.logOut();
    new LogInView();
}

// Login view shows two forms, one to login and one to sign up for a new account:
var LogInView = Parse.View.extend({
	events: {
	  "submit form.login-form": "logIn",
	  "submit form.signup-form": "signUp",
	  "click fb-login-button": "fbLogIn"
	},

	el: ".content",

	initialize: function() {
	  _.bindAll(this, "logIn", "signUp");
	  this.render();
	},

	fbLogIn: function(e) {
		alert("FB Login Button Clicked")
	},

	logIn: function(e) {
	  var self = this;
	  var username = this.$("#login-username").val();
	  var password = this.$("#login-password").val();
	  
	  // The view binds to the submit event for both these forms and logs in or signs up the user, respectively
	  Parse.User.logIn(username, password, {
	    success: function(user) {
	 	  loggedIn();
	 	  showButtonsOnLogin();
	      self.undelegateEvents();
	      delete self;
	    },

	    error: function(user, error) {
	      self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
	      self.$(".login-form button").removeAttr("disabled");
	    }
	  });

	  this.$(".login-form button").attr("disabled", "disabled");

	  return false;
	},

	signUp: function(e) {
	  var self = this;


	  var email = this.$("#signup-username").val();
	  var password = this.$("#signup-password").val();
	  
	  // Changed sign up code to register users's email	

	  var user = new Parse.User();
	  user.set("username", email)
	  user.set("password", password)
	  user.set("email", email)

	  // sign up code is similar to login
	  user.signUp({ ACL: new Parse.ACL() }, {
	    success: function(user) {
	 	  loggedIn();
	 	  showButtonsOnLogin();
	      self.undelegateEvents();
	      delete self;
	    },

	    error: function(user, error) {
	      self.$(".signup-form .error").html(_.escape(error.message)).show();
	      self.$(".signup-form button").removeAttr("disabled");
	    }
	  });

	  this.$(".signup-form button").attr("disabled", "disabled");

	  return false;
	},

	// This is how the template is actually loaded
	render: function() {
	  this.$el.html(_.template($("#login-template").html()));
	  	    console.log("This ran as well.....");

	  this.$dropdown = this.$('#dropdown');
	  this.$dropdown.hide();

	  this.$logOutButton = this.$('#logOut');
	  this.$logOutButton.hide();

	  this.delegateEvents();
	}
});

function showButtonsOnLogin() {
	 	  document.getElementById("allQuotesButton").style.display = "inline";
   		  document.getElementById("dropdownMenu1").style.display = "inline";
   		  document.getElementById("logOut").style.display = "inline";

   		  document.getElementById("login").style.display = "none";
}

// The main view for the app
// manage 2 subviews: the LoginView and ManageTodosView. 
// Basically, we've now added a login screen in front of the usual todo app. 
var AppView = Parse.View.extend({
// Instead of generating a new element, bind to the existing skeleton of
// the App already present in the HTML.
	el: $("#todoapp"),

	initialize: function() {
	  this.render();
	},



	// We simply test to see if there is a logged in user to determine which view to show
	render: function() {
	 if (Parse.User.current()) {
	 	loggedIn();
	 } else {
	    new LogInView();
	    document.getElementById("allQuotesButton").style.display = "none";
   		document.getElementById("dropdownMenu1").style.display = "none";
   		document.getElementById("logOut").style.display = "none";

	 }
	}
});


  // Initialize Parse with your Parse application javascript keys


$(document).ready(function () {

	Parse.$ = jQuery;
	// Initialize Parse with your Parse application javascript keys
	Parse.initialize("IjBNpvq7DaPHaydljkXBIuKsWBhPcoVttTpSMUqm", "9ZInXKheX4sJW1oknesq6zq5MpUnZFykiqu2aJ2H");
	
	new AppView;

});
