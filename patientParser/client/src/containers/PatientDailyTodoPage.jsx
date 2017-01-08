import React, { PropTypes } from 'react';
import PatientDailyTodoList from '../components/PatientDailyTodoList.jsx';
import Crypto from '../modules/Crypto';

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
      var className = event.target.className;

      // Here we handle changes locally while sending changes to server
      switch(value) {
        case 'labsback':
          this.props.onUpdate({className: className, trueFalse: this.state.labsback}, this.props.patientData._id);
          (this.state.labsback === true) ? this.setState({ labsback : false }) : this.setState({ labsback : true });
          break;
        case 'consults':
          this.props.onUpdate({className: className, trueFalse: this.state.consults}, this.props.patientData._id);
          (this.state.consults === true) ? this.setState({ consults : false }) : this.setState({ consults : true });
          break;
        case 'andon':
          this.props.onUpdate({className: className, trueFalse: this.state.andon}, this.props.patientData._id);
          (this.state.andon === true) ? this.setState({ andon : false }) : this.setState({ andon : true });
          break;
        case 'mar':
          this.props.onUpdate({className: className, trueFalse: this.state.mar}, this.props.patientData._id);
          (this.state.mar === true) ? this.setState({ mar : false }) : this.setState({ mar : true });
          break;
        case 'ivmed':
          this.props.onUpdate({className: className, trueFalse: this.state.ivmed}, this.props.patientData._id);
          (this.state.ivmed === true) ? this.setState({ ivmed : false }) : this.setState({ ivmed : true });
          break;
        case 'amlab':
          this.props.onUpdate({className: className, trueFalse: this.state.amlab}, this.props.patientData._id);
          (this.state.amlab === true) ? this.setState({ amlab : false }) : this.setState({ amlab : true });
          break;
        case 'dispo':
          this.props.onUpdate({className: className, trueFalse: this.state.dispo}, this.props.patientData._id);
          (this.state.dispo === true) ? this.setState({ dispo : false }) : this.setState({ dispo : true });
          break;
        case 'learning':
          this.props.onUpdate({className: className, trueFalse: this.state.learning}, this.props.patientData._id);
          (this.state.learning === true) ? this.setState({ learning : false }) : this.setState({ learning : true });
          break;
        case 'seen':
          this.props.onUpdate({className: className, trueFalse: this.state.seen}, this.props.patientData._id);
          (this.state.seen === true) ? this.setState({ seen : false }) : this.setState({ seen : true });
          break;
        case 'lines':
          this.props.onUpdate({className: className, trueFalse: this.state.lines}, this.props.patientData._id);
          (this.state.lines === true) ? this.setState({ lines : false }) : this.setState({ lines : true });
          break;
        case 'foley':
          this.props.onUpdate({className: className, trueFalse: this.state.foley}, this.props.patientData._id);
          (this.state.foley === true) ? this.setState({ foley : false }) : this.setState({ foley : true });
          break;
        case 'mobility':
          this.props.onUpdate({className: className, trueFalse: this.state.mobility}, this.props.patientData._id);
          (this.state.mobility === true) ? this.setState({ mobility : false }) : this.setState({ mobility : true });
          break;
      }
    }

    render() {
      return (
        <PatientDailyTodoList handleChange={this.handleChange} labsback={this.state.labsback} consults={this.state.consults} andon={this.state.andon} mar={this.state.mar} amlab={this.state.amlab} dispo={this.state.dispo} learning={this.state.learning} seen={this.state.seen} lines={this.state.lines} foley={this.state.foley} mobility={this.state.mobility} />
      );
    }
  }


export default PatientDailyTodoPage;
