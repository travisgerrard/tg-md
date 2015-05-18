var React = require('react');

var Footer = React.createClass({

	render: function() {
		return (
		<div className="footer centered">
		  <a href="https://chrome.google.com/webstore/detail/quoteit/edejdpacodjabeacdfnjgndnojofdfld"  target="_blank">
	      	<img src={'https://developer.chrome.com/webstore/images/ChromeWebStore_Badge_v2_206x58.png'} alt="Chrome extension" className="img-chromeExtension" />
	      </a>
		  <a href="https://itunes.apple.com/us/app/quote-it-app/id967771849?mt=8"  target="_blank">
	      	<img src={'https://devimages.apple.com.edgekey.net/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg'} alt="Chrome extension" className="img-appleAppStore"/>
	      </a>
      	</div>
		);
	}
});

module.exports = Footer;
