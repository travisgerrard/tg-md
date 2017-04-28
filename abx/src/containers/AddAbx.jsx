import React from 'react';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

var listHeight = '10px';

class AddAbx extends React.Component {

  constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      console.log("event -> target, " + event.target);

    }

  render() {
    return (
      <div>
        <TextField id="AbxName" onChange={this.handleChange} hintText="Abx Name" floatingLabelText="Abx Name" />
        <br />
        <br />
        <TextField id="AbxAdditionalInfo" onChange={this.handleChange} hintText="Additional Info" floatingLabelText="Additional Info" />
        <br />
        <br />
        <TextField id="AbxDosageAndRoute" onChange={this.handleChange} hintText="Abx Dosage/Route" floatingLabelText="Abx Dosage/Route" />
        <List>
          <ListItem leftCheckbox={<Checkbox id="MRSA" />}
            primaryText="MRSA"
            onChange={this.handleChange}
            />
          <ListItem leftCheckbox={<Checkbox id="MSSA" />}
            primaryText="MSSA"
            onChange={this.handleChange}
            style={{height: listHeight}}
            />
          <ListItem leftCheckbox={<Checkbox id="Strep"  />}
            primaryText="Strep"
            onChange={this.handleChange}
            style={{height: listHeight}}
            />
          <ListItem leftCheckbox={<Checkbox id="Enterococcus"  />}
            primaryText="Enterococcus"
            onChange={this.handleChange}
            style={{height: listHeight}}
            />
          <ListItem leftCheckbox={<Checkbox id="GNR"  />}
            primaryText="GNR"
            onChange={this.handleChange}
            style={{height: listHeight}}
            />
          <ListItem leftCheckbox={<Checkbox id="PAeurg"  />}
            primaryText="P. Aeurg"
            onChange={this.handleChange}
            style={{height: listHeight}}
            />
          <ListItem leftCheckbox={<Checkbox id="Atypicals"  />}
            primaryText="Atypicals"
            onChange={this.handleChange}
            style={{height: listHeight}}
            />
          <ListItem leftCheckbox={<Checkbox id="Anaerobes" />}
            primaryText="Anaerobes"
            onChange={this.handleChange}
            style={{height: listHeight}}
            />
      </List>

      </div>
    )
  }

}

export default AddAbx;
