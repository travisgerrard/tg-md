var React = require('react');
var ReactDOM = require('react-dom');

require('./sass/PatientDailyTodo.scss');

var PatientDailyTodo = React.createClass({
  handleChange: function(event) {
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
    }
  },

  // popup that checks for IV meds
  ivMedChecker: function() {
    var rawData = prompt("Please enter your name", "");

    if (rawData != null) {

      var ivMeds = rawData.split("IV");
      var medNames = [];
        if (ivMeds.length > 1) {
          for (var i = 0; i < ivMeds.length - 1; i++) {
            var temp = ivMeds[i].split("\n")
            medNames.push(temp.slice(-1).pop());
          }
          alert(medNames.map(element => element));
        } else {
          alert("No IV meds found");
        }
      this.setState({ rawData: medNames });
    }

  },

  getInitialState: function() {
      return {
        labsback: this.props.patientData.labsback,
        consults: this.props.patientData.consults,
        andon: this.props.patientData.andon,
        mar: this.props.patientData.mar,
        ivmed: this.props.patientData.ivmed,
        amlab: this.props.patientData.amlab,
        dispo: this.props.patientData.dispo,
        learning: this.props.patientData.learning,
        seen: this.props.patientData.seen,
      }
    },

  render: function() {
    return (
      <div>
        <ul id="dailyToDoUl">
        <li>
            <label>
              <input type="checkbox" className="LabsBack" value="labsback" onChange={this.handleChange} defaultChecked={this.state.labsback} />Labs Back
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" className="Consults" value="consults" onChange={this.handleChange} defaultChecked={this.props.patientData.consults} />Consults
            </label>
          </li>
          <li>
            <label>
            <input type="checkbox" className="Andon" value="andon" onChange={this.handleChange} defaultChecked={this.props.patientData.andon} />Andon - VTE/Glucose
            </label>
          </li>
          <li>
            <label>
            <input type="checkbox" className="Mar" value="mar" onChange={this.handleChange} defaultChecked={this.props.patientData.mar} />MAR 48
            </label>
          </li>
          <li>
            <label>
            <input type="checkbox" className="AMLab" value="amlab" onChange={this.handleChange} defaultChecked={this.props.patientData.amlab} />AM Labs
            </label>
          </li>
          <li>
            <label>
            <input type="checkbox" className="Dispo" value="dispo" onChange={this.handleChange} defaultChecked={this.props.patientData.dispo} />Discharge/Dispo
            </label>
          </li>
          <li>
            <label>
            <input type="checkbox" className="Learning" value="learning" onChange={this.handleChange} defaultChecked={this.props.patientData.learning} />Learning
            </label>
          </li>
          <li>
            <label>
            <input type="checkbox" className="Seen" value="seen" onChange={this.handleChange} defaultChecked={this.props.patientData.seen} />Seen
            </label>
          </li>
        </ul>
      </div>
    )
  }
});

module.exports = PatientDailyTodo;
