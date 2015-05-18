var React = require('react');
var Parse = require('parse').Parse;

// Insert your app's keys here:
Parse.initialize('IjBNpvq7DaPHaydljkXBIuKsWBhPcoVttTpSMUqm', '9ZInXKheX4sJW1oknesq6zq5MpUnZFykiqu2aJ2H');

 
  window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : '703579376437907', // Facebook App ID
      status     : true,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
      xfbml      : true,  // initialize Facebook social plugins on the page
      version    : 'v2.2' // point to the latest Facebook Graph API version
    });
 
    // Run code after the Facebook SDK is loaded.
  };
 
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


var LoginWrapper = require('./LoginWrapper.react.js');

React.render(
	<LoginWrapper />,
	document.getElementById('app')
);