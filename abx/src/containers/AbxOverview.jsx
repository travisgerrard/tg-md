import React from 'react';
import Block from '../components/block.jsx';
import Header from '../components/header.jsx';

  const abxNames = [
    {name:"Trim/Sulfa (Bactrim)", additionalInfo:"1st line SSTI & UTI, PCP prophy", poIV:"15-20mg/kg/day IV or 800/160 PO", coverageFull:["MSSA", "MRSA", "GNR"], coveragePartial:[], clearance:"Renal"},
    {name:"Vancomycin", additionalInfo:"1st line for suspected MRSA. Not bacteriacidal. Switch to Naf if MSSA +ve. Trough 15-20 complx, 10-15. Chck after 4th dose", poIV:"15mg/kg IV Q12", coverageFull:["MSSA", "MRSA"], coveragePartial:[], clearance:"Renal"},
  ]

class AbxOverview extends React.Component {



  constructor(props) {
    super(props);


    this.state = {
      abxNames: abxNames
    }
  }

  render() {
    return (
      <div>
        <Header />

        <Block abxNames={this.state.abxNames} />
      </div>
    )
  }

}

export default AbxOverview;
