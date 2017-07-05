import React from 'react';
import SearchBox from '../components/SearchBox.jsx';
import LinkButton from '../components/LinkButton.jsx';

class BasePage extends React.Component {

  constructor(props) {
    super(props);

    this.onKeyPressSearchBox = this.onKeyPressSearchBox.bind(this);
    this.onPressLink = this.onPressLink.bind(this);
  }

  onPressLink(event) {
    // runs when link button pressed, although at this point seems unneccsary
  }

  onKeyPressSearchBox(event) {
    if (event.key === 'Enter') {
      var webSiteToOpen = event.target.id + event.target.value;
      window.open(webSiteToOpen);
    }
  }


  render() {
    return (
      <div>
        <SearchBox
          onKeyPress={this.onKeyPressSearchBox}
          name="UpToDate"
          searchPrefix="https://www.uptodate.com/contents/search?search="
          />
        <SearchBox
          onKeyPress={this.onKeyPressSearchBox}
          name="Johns Hopkins ABX"
          searchPrefix="https://www.unboundmedicine.com/ucentral/search?st=OSS&q="
          />
        <br/>
        <LinkButton
          onPress={this.onPressLink}
          name="MKSAP"
          link="https://mksap17.acponline.org/app/"
          />
        <LinkButton
          onPress={this.onPressLink}
          name="Consult"
          link="http://www.travisgerrardmd.com/consults.html"
          />
        <LinkButton
          onPress={this.onPressLink}
          name="VM Call app"
          link="http://www.travisgerrardmd.com/vmtext.html"
          />
      </div>
    )
  }

}

export default BasePage;
