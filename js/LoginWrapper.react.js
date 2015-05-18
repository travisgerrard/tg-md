var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var AppWrapper = require('./AppWrapper.react.js');
var Footer = require('./Footer.react.js');

var MostRecentQuote = require('./MostRecentQuote.react.js');

var LoginWrapper = React.createClass({
	mixins: [ParseReact.Mixin],

	getInitialState: function() {
		return {
			error: null,
			signup: false
		};
	},

	observe: function() {
		return {
			user: ParseReact.currentUser
		};
	},

	render: function() {
		if (this.data.user) {
			return (
				<div>
					<a className='logOut' onClick={this.logOut}>
			         	<svg viewBox='0 0 60 60'>
			              <path d="M0,0 L30,0 L30,10 L10,10 L10,50 L30,50 L30,60 L0,60 Z"></path>
			              <path d="M20,23 L40,23 L40,10 L60,30 L40,50 L40,37 L20,37 Z"></path>
			            </svg>				
					</a>
					<Footer />

					<AppWrapper />

				</div>
			);
		}
		return (
			  <div id="home" class="home">
				<h1 className='title centered'>QuoteIt</h1>
				<div className='loginForm' onKeyDown={this.keyDown}>
					{
						this.state.error ?
						<div className='row centered errors'>{this.state.error}</div> :
						null
					}
					<div className='row'>
						<label htmlFor='username'>Username</label>
						<input ref='username' id='username' type='text' />
					</div>
					<div className='row'>
						<label htmlFor='password'>Password</label>
						<input ref='password' id='password' type='password' />
					</div>
					<div className='row centered'>
						<a className='button' onClick={this.submit}>
							{this.state.signup ? 'Sign up' : 'Log in'}
						</a>
					</div>
					<div className='row centered'>
						or
						<a onClick={this.toggleSignup}>
							{this.state.signup ? ' log in' : ' sign up'}
						</a>
					</div>
					<div className='row centered'>
						<a className='button' onClick={this.facebookLogin}>
							Login with Facebook
						</a>	
					</div>
				</div>
				<MostRecentQuote />
				<Footer />
				<div className='secondHalfOfHomepage'>
					<label className='centered homepageBanner'>The best way to save what's important for later!</label>
					<div className="container">
						<div className="imageWithTextOne">
							<img src={'ScreenShotForWebSiteOne.png'} alt="Chrome extension screenshot" className="resize_fit_center" height="375" width="600"/>
							<label className='textForScreenshot centered'>Chrome extension</label>
						</div>
						<div className="imageWithTextTwo">
							<img src={'iosTwo.jpg'} alt="iOS screenshot" className="resize_fit_center" height="375" width="211"/>
							<label className='textForScreenshot centered'>iOS App</label>
						</div>
					</div>
				</div>
				<label className='centered footerBanner'>Gerrard Apps LLC 2015</label>
			</div>
		);
	},

	submit: function() {
		var self = this;
		var username = React.findDOMNode(this.refs.username).value;
		var password = React.findDOMNode(this.refs.password).value;
		if (username.length && password.length) {
			if (this.state.signup) {
				console.log('signup');
				var u = new Parse.User({
					username: username,
					password: password
				});
				u.signUp().then(function() {
					self.setState({
						error: null
					});
				});
			} else {
				Parse.User.logIn(username, password).then(function() {
					self.setState({
						error: null
					});
				}, function() {
					self.setState({
						error: 'Incorrect username or password'
					});
				});
			}
		} else {
			this.setState({
				error: 'Please enter all fields'
			});
		}
	},

	facebookLogin: function() {
		Parse.FacebookUtils.logIn(null, {
		  success: function(user) {
		    if (!user.existed()) {
		      alert("User signed up and logged in through Facebook!");
		    } else {
		      alert("User logged in through Facebook!");
		    }
		  loggedIn();
	 	  showButtonsOnLogin();
	      delete self;

		  },
		  error: function(user, error) {
		    alert("User cancelled the Facebook login or did not fully authorize.");
		  }
		});
	},

	logOut: function() {
		console.log('logout');
		Parse.User.logOut();
	},

	keyDown: function(e) {
		if (e.keyCode === 13) {
			this.submit();
		}
	},

	toggleSignup: function() {
		this.setState({
			signup: !this.state.signup
		});
	}
});

module.exports = LoginWrapper;