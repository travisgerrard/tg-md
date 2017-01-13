import React, { PropTypes } from 'react';
import PatientDailyTodoList from '../components/PatientDailyTodoList.jsx';

require('../sass/PatientDailyTodo.scss');

class PatientDailyTodoPage extends React.Component {
  /**
    * Class constructor
    */
    constructor(props) {
      super(props);

      this.state = {
        labsback: this.props.patientData.labsback,
        consults: this.props.patientData.consults,
        andon: this.props.patientData.andon,
        mar: this.props.patientData.mar,
        ivmed: this.props.patientData.ivmed,
        amlab: this.props.patientData.amlab,
        dispo: this.props.patientData.dispo,
        learning: this.props.patientData.learning,
        seen: this.props.patientData.seen,
        lines: this.props.patientData.lines,
        foley: this.props.patientData.foley,
        mobility: this.props.patientData.mobility
      };

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      var value = event.target.value;
      console.log(value);
      var className = event.target.className;

      this.props.onUpdate({className: className, trueFalse: this.state[value]}, this.props.patientData._id); // updates on the server. Got rid of lots of code with [value]
      (this.state[value] === true) ? this.setState({ [value] : false }) : this.setState({ [value] : true }); // updates locally.
    }

    render() {
      return (
        <PatientDailyTodoList handleChange={this.handleChange} labsback={this.state.labsback} consults={this.state.consults} andon={this.state.andon} ivmed={this.state.ivmed} mar={this.state.mar} amlab={this.state.amlab} dispo={this.state.dispo} learning={this.state.learning} seen={this.state.seen} lines={this.state.lines} foley={this.state.foley} mobility={this.state.mobility} />
      );
    }
  }


export default PatientDailyTodoPage;
