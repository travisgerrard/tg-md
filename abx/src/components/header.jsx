import React from 'react';
import Flexbox from 'flexbox-react';

import '../style/block.css';

const Block = ({

}) => (
  <div>
    <Flexbox flexDirection="row" >

      <Flexbox flexGrow={1} width="10%">

      </Flexbox>
      <Flexbox flexGrow={1} width="10%">
        MRSA
      </Flexbox>
      <Flexbox flexGrow={1} width="10%">
        MSSA
      </Flexbox>
      <Flexbox flexGrow={1} width="10%">
        Strep
      </Flexbox>
      <Flexbox flexGrow={1} width="10%">
        Enterococcus
      </Flexbox>
      <Flexbox flexGrow={1} width="10%">
        GNR
      </Flexbox>
      <Flexbox flexGrow={1} width="10%">
        P. Aeurg
      </Flexbox>
      <Flexbox flexGrow={1} width="10%">
        Atypicals
      </Flexbox>
      <Flexbox flexGrow={1} width="10%">
        Anaerobes
      </Flexbox>
    </Flexbox>


  </div>

);

Block.propTypes = {
};

export default Block;
