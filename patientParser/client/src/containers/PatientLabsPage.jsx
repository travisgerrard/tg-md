import React, { PropTypes } from 'react';
import PatientLabsInputs from '../components/PatientLabsInputs.jsx';
import PatientOverviewTextArea from '../components/PatientOverviewTextArea.jsx';
import Crypto from '../modules/Crypto';

require('../sass/PatientLabs.scss');

class PatientLabsPage extends React.Component {
  /**
    * Class constructor
    */
    constructor(props) {
      super(props);

      this.state = {
        wbc: Crypto.decodeString(this.props.patientData.wbc, this.props.secretCode),
        hg: Crypto.decodeString(this.props.patientData.hg, this.props.secretCode),
        hct: Crypto.decodeString(this.props.patientData.hct, this.props.secretCode),
        plt: Crypto.decodeString(this.props.patientData.plt, this.props.secretCode),
        na: Crypto.decodeString(this.props.patientData.na, this.props.secretCode),
        cl: Crypto.decodeString(this.props.patientData.cl, this.props.secretCode),
        bun: Crypto.decodeString(this.props.patientData.bun, this.props.secretCode),
        gluc: Crypto.decodeString(this.props.patientData.gluc, this.props.secretCode),
        k: Crypto.decodeString(this.props.patientData.k, this.props.secretCode),
        bicarb: Crypto.decodeString(this.props.patientData.bicarb, this.props.secretCode),
        cr: Crypto.decodeString(this.props.patientData.cr, this.props.secretCode),
        input: this.props.patientData.input,
        output: this.props.patientData.output,
        overview: Crypto.decodeString(this.props.patientData.otherLabs, this.props.secretCode),
        className: "OtherLabs"
      };

      this.handleChange = this.handleChange.bind(this);
    }

    // Caclulates from input and output
  handleChange(event) {
    this.props.onUpdate(event.target, this.props.patientData._id);

    if (event.target.className === "Input") this.setState({ input: event.target.value});
    if (event.target.className === "Output") this.setState({ output: event.target.value});
  }

  render() {
    return (
      <div>
      <PatientLabsInputs
        handleChange={this.handleChange}
        wbc={this.state.wbc}
        hg={this.state.hg}
        hct={this.state.hct}
        plt={this.state.plt}
        na={this.state.na}
        cl={this.state.cl}
        bun={this.state.bun}
        gluc={this.state.gluc}
        k={this.state.k}
        bicarb={this.state.bicarb}
        cr={this.state.cr}
        input={this.state.input}
        output={this.state.output} />
      <PatientOverviewTextArea handleChange={this.handleChange} overview={this.state.overview} className={this.state.className}/>
      </div>
    )
  }
}

export default PatientLabsPage;
