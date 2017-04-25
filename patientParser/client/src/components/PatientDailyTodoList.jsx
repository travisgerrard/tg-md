import React, { PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

var listHeight = '10px';

const PatientDailyTodoList = ({
  handleChange,
  labsback,
  consults,
  andon,
  ivmed,
  mar,
  amlab,
  dispo,
  learning,
  seen,
  lines,
  foley,
  mobility
}) => (
  <div>
    <List>
        <ListItem leftCheckbox={<Checkbox id="LabsBack" defaultChecked={labsback} />}
          primaryText="Labs Back"
          onChange={handleChange}
          style={{height: listHeight}}
          />
        <ListItem leftCheckbox={<Checkbox id="Consults" defaultChecked={consults} />}
          primaryText="Consults"
          onChange={handleChange}
          style={{height: listHeight}}
          />
        <ListItem leftCheckbox={<Checkbox id="Andon" defaultChecked={andon} />}
          primaryText="Andon"
          onChange={handleChange}
          style={{height: listHeight}}
          />
        <ListItem leftCheckbox={<Checkbox id="IVMed" defaultChecked={ivmed} />}
          primaryText="Micro"
          onChange={handleChange}
          style={{height: listHeight}}
          />
        <ListItem leftCheckbox={<Checkbox id="Mar" defaultChecked={mar} />}
          primaryText="MAR 48"
          onChange={handleChange}
          style={{height: listHeight}}
          />
        <ListItem leftCheckbox={<Checkbox id="AMLab" defaultChecked={amlab} />}
          primaryText="AM Labs"
          onChange={handleChange}
          style={{height: listHeight}}
          />
        <ListItem leftCheckbox={<Checkbox id="Dispo" defaultChecked={dispo} />}
          primaryText="Discharge/Dispo"
          onChange={handleChange}
          style={{height: listHeight}}
          />
        <ListItem leftCheckbox={<Checkbox id="Learning" defaultChecked={learning} />}
          primaryText="Learning"
          onChange={handleChange}
          style={{height: listHeight}}
          />
        <ListItem leftCheckbox={<Checkbox id="Seen" defaultChecked={seen} />}
          primaryText="Seen"
          onChange={handleChange}
          style={{height: listHeight}}
          />
    </List>

  </div>
);

PatientDailyTodoList.propTypes = {
  handleChange: PropTypes.func.isRequired,
  labsback: PropTypes.bool.isRequired,
  consults: PropTypes.bool.isRequired,
  andon: PropTypes.bool.isRequired,
  ivmed: PropTypes.bool.isRequired,
  mar: PropTypes.bool.isRequired,
  amlab: PropTypes.bool.isRequired,
  dispo: PropTypes.bool.isRequired,
  learning: PropTypes.bool.isRequired,
  seen: PropTypes.bool.isRequired,
  lines: PropTypes.bool.isRequired,
  foley: PropTypes.bool.isRequired,
  mobility: PropTypes.bool.isRequired
};

export default PatientDailyTodoList;
