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
    console.log("Pressed");
    console.log(event.target);
//    window.open(event.target.id);
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
      </div>
    )
  }

}

export default BasePage;
