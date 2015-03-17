// An example Parse.js Backbone application based on the todo app by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses Parse to persist
// the todo items and provide user authentication and sessions.

$(function() {

  Parse.$ = jQuery;


  // Initialize Parse with your Parse application javascript keys
	Parse.initialize("IjBNpvq7DaPHaydljkXBIuKsWBhPcoVttTpSMUqm", "9ZInXKheX4sJW1oknesq6zq5MpUnZFykiqu2aJ2H");

  // Tag model

  // Our basic Todo model has `content`, `order`, and `done` attributes.
  var Tag = Parse.Object.extend("Tag", {
    // Default attributes for the todo.
    defaults: {
      tag: "A Tag"
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }
  });

  var TagList = Parse.Collection.extend({

    // Reference to this collection's model.
    model: Tag,

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(quote){ return tag.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(tag) {
      return tag.get('order');
    }

  });

  // Quote Model
  // ----------

  // Our basic Todo model has `content`, `order`, and `done` attributes.
  var Quote = Parse.Object.extend("Quote", {
    // Default attributes for the todo.
    defaults: {
      selection: "A Quote"
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }
  });

  // This is the transient application state, not persisted on Parse
  var AppState = Parse.Object.extend("AppState", {
    defaults: {
      filter: "all"
    }
  });

  // Quote Collection
  // ---------------

  var QuoteList = Parse.Collection.extend({

    // Reference to this collection's model.
    model: Quote,

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(quote){ return quote.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(quote) {
      return quote.get('order');
    }

  });


  var TagView = Parse.View.extend({

    //tagName: "li",

    template: _.template($('#tag-template').html()),  

    events: {
      //"dropdown .click" : "dropdownClicked"
    },

    initialize: function() {
      _.bindAll(this, 'render');
    },

    render: function() {
      html = _.template(this.template());
      this.$el.html(html);
      //this.$el.find('.dropdown-toggle').dropdown();
      //sreturn this;
    },

    template: function() {
      this.listOfTags = new TagList;
                console.log(tags)

      var user = Parse.User.current();
      var relation = user.relation("userTags");
      relation.query().find({
        success: function(tags) {

          console.log(tags)
      var list = "";


      for(var i = 0;  i < this.model.length; i++){
        list += "<li role=\"presentation\">" + this.model[i].attributes.tag  + "</li>";
        console.log(this.model[i].attributes.tag)
      }
      return "<ul class='dropdown-menu' role=\"menu\" aria-labelledby=\"dropdownMenu1\">" + list + "</ul>";

/*          
          var arrayLength = list.length;


          for (var i = 0; i < arrayLength; i++) {
            var tagName = list[i].attributes.tag;
            console.log(tagName);
            
            var view = new TagView({model: list[i]});
            this.$("#dropdown-menu").append(view.render().el);

          }
*/
  
        },
        error: function(myObject, error) {
          console.log(error);
          // The object was not refreshed successfully.
          // error is a Parse.Error with an error code and message.
        }

      });

   }


  });
  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  var QuoteView = Parse.View.extend({
    
    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#quote-template').html()),  

    // Events occur to the items... when we commment these out we can't take action on them
    // The DOM events specific to an item.
    events: {
      //"click .toggle"              : "toggleDone",
      //"dblclick label.todo-content" : "edit",
      //"click .todo-destroy"   : "clear",
      //"keypress .edit"      : "updateOnEnter",
      //"blur .edit"          : "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a Todo and a TodoView in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      _.bindAll(this, 'render', 'close', 'remove');
      this.model.bind('change', this.render);
      this.model.bind('destroy', this.remove);
    },

    // Re-render the contents of the todo item.
    render: function() {
      var html = $(this.el).html(this.template(this.model.toJSON()));
      console.log(html);
	    return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      this.model.save({content: this.input.val()});
      $(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });

  // The Application
  // ---------------

  // The main view that lets a user manage their todo items
  var ManageQuotesView = Parse.View.extend({


    // Delegated events for creating new items, and clearing completed ones.
    events: {
      //"keypress #new-todo":  "createOnEnter",
      //"click #clear-completed": "clearCompleted",
      //"click #toggle-all": "toggleAllComplete",
      "click .log-out": "logOut",
      //"click ul#filters a": "selectFilter"
    },

    el: ".content",

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved to Parse.
    initialize: function() {
      var self = this;

      _.bindAll(this, 'addAll', 'render', 'logOut');

      // Main quotes management template
      this.$el.html(_.template($("#manage-quotes-template").html()));
      
      // Create our collection of Todos
      this.quotes = new QuoteList;

      // Setup the query for the collection to look for todos from the current user
      this.quotes.query = new Parse.Query(Quote);
      this.quotes.query.equalTo("user", Parse.User.current().escape("username"));
      this.quotes.query.notEqualTo("hidden", true);
      this.quotes.query.descending("date")

      this.quotes.bind('reset', this.addAll);

      // Fetch all the todo items for this user
      this.quotes.fetch({
        success: function(myObject) {
          // The object was refreshed successfully.
          //console.log(myObject);

        },
        error: function(myObject, error) {
          // The object was not refreshed successfully.
          // error is a Parse.Error with an error code and message.
        }

      });

      var view = new TagView({el: '#dropdown' });
      view.render;


    },

    addTag: function(tag) {
      console.log(tag);
      //var view = new TagView({model: tag});
      //this.$("#quote-list").append(view.render().el);
    },

    // Logs out the user and shows the login view
    logOut: function(e) {
      Parse.User.logOut();
      new LogInView();
      this.undelegateEvents();
      delete this;
    },

    // Filters the list based on which type of filter is selected
    selectFilter: function(e) {
      var el = $(e.target);
      var filterValue = el.attr("id");
      state.set({filter: filterValue});
      Parse.history.navigate(filterValue);
    },

    filter: function() {
      var filterValue = state.get("filter");
      this.$("ul#filters a").removeClass("selected");
      this.$("ul#filters a#" + filterValue).addClass("selected");
      if (filterValue === "all") {
        this.addAll();
      } else if (filterValue === "completed") {
        this.addSome(function(item) { return item.get('done') });
      } else {
        this.addSome(function(item) { return !item.get('done') });
      }
    },

    // Resets the filters to display all todos
    resetFilters: function() {
      this.$("ul#filters a").removeClass("selected");
      this.$("ul#filters a#all").addClass("selected");
      this.addAll();
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(quote) {
      var view = new QuoteView({model: quote});
      this.$("#quote-list").append(view.render().el);
    },

    // Add all items in the Todos collection at once.
    addAll: function(collection, filter) {
      this.$("#quote-list").html("");
      this.quotes.each(this.addOne);
    },

    // Only adds some todos, based on a filtering function that is passed in
    addSome: function(filter) {
      var self = this;
      this.$("#quote-list").html("");
      this.quotes.chain().filter(filter).each(function(item) { self.addOne(item) });
    }

  });

	// Login view shows two forms, one to login and one to sign up for a new account:
  var LogInView = Parse.View.extend({
    events: {
      "submit form.login-form": "logIn",
      "submit form.signup-form": "signUp"
    },

    el: ".content",
    
    initialize: function() {
      _.bindAll(this, "logIn", "signUp");
      this.render();
    },

    logIn: function(e) {
      var self = this;
      var username = this.$("#login-username").val();
      var password = this.$("#login-password").val();
      
      // The view binds to the submit event for both these forms and logs in or signs up the user, respectively
      Parse.User.logIn(username, password, {
        success: function(user) {
          new ManageQuotesView();
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
          new ManageQuotesView();
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
      this.delegateEvents();
    }
  });

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
        new ManageQuotesView();
      } else {
        new LogInView();
      }
    }
  });

  var AppRouter = Parse.Router.extend({
    routes: {
      "all": "all",
      "active": "active",
      "completed": "completed"
    },

    initialize: function(options) {
    },

    all: function() {
      state.set({ filter: "all" });
    },

    active: function() {
      state.set({ filter: "active" });
    },

    completed: function() {
      state.set({ filter: "completed" });
    }

  });

  var state = new AppState;

  new AppRouter;
  new AppView;
  Parse.history.start();


});