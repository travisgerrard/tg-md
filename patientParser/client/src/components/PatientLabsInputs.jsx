import React, { PropTypes } from 'react';

const PatientLabsInputs = ({
  handleChange,
  wbc,
  hg,
  hct,
  plt,
  na,
  cl,
  bun,
  gluc,
  k,
  bicarb,
  cr,
  input,
  output
}) => (
  <div id="cbcAndBmr">
    <div id="parentTop">
        <input type="text" id="textInputLower" className="WBC" onChange={handleChange} defaultValue={wbc}/>
        <label>\</label>
        <input type="text" id="underlineInput" className="Hg" onChange={handleChange} defaultValue={hg}/>
        <label>/</label>
    </div>
    <div id="parentBottom">
        <label>/</label>
        <input type="text" className="Hct" onChange={handleChange} defaultValue={hct}/>
        <label>\</label>
        <input type="text" id="edgeBoxBottom" className="plt" onChange={handleChange} defaultValue={plt}/>
    </div>
    <br />
    <div id="BMRTop">
        <input type="text" id="underlineInput" className="Na" onChange={handleChange} defaultValue={na}/>
        <label>|</label>
        <input type="text" id="underlineInput" className="Cl" onChange={handleChange} defaultValue={cl}/>
        <label>|</label>
        <input type="text" id="underlineInput" className="BUN" onChange={handleChange} defaultValue={bun}/>
        <label>/</label>
        <input type="text" id="textInputLower" className="Gluc" onChange={handleChange} defaultValue={gluc}/>
    </div>
    <div id="BMRBottom">
        <input type="text" className="K" onChange={handleChange} defaultValue={k}/>
        <label>|</label>
        <input type="text" className="Bicarb" onChange={handleChange} defaultValue={bicarb}/>
        <label>|</label>
        <input type="text" className="Cr" onChange={handleChange} defaultValue={cr}/>
        <label>\</label>
    </div>
    <br />
    <div id="InAndOut">
      <label>I/O</label>
      <input type="text" id="underlineInput" className="Input" onChange={handleChange} defaultValue={input}/>
      <label>/</label>
      <input type="text" id="underlineInput" className="Output" onChange={handleChange} defaultValue={output}/>
      <label>: {input - output}</label>
    </div>
  </div>
);

PatientLabsInputs.propTypes = {
  handleChange: PropTypes.func.isRequired,
  wbc: PropTypes.string.isRequired,
  hg: PropTypes.string.isRequired,
  hct: PropTypes.string.isRequired,
  plt: PropTypes.string.isRequired,
  na: PropTypes.string.isRequired,
  cl: PropTypes.string.isRequired,
  bun: PropTypes.string.isRequired,
  gluc: PropTypes.string.isRequired,
  k: PropTypes.string.isRequired,
  bicarb: PropTypes.string.isRequired,
  cr: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired
};

export default PatientLabsInputs;
