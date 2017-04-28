import React, { PropTypes } from 'react';
import Flexbox from 'flexbox-react';

import '../style/block.css';

const Block = ({
  abxNames
}) => (
  <div>
    {abxNames.map((element, key) =>
      <Flexbox flexDirection="row" key={key}>

        <Flexbox flexGrow={1} width="10%">
          {element.name}
        </Flexbox>
        <Flexbox flexGrow={1} className="Box" width="10%">
          Content
        </Flexbox>
        <Flexbox flexGrow={1} className="Box" width="10%">
          Content
        </Flexbox>
        <Flexbox flexGrow={1} className="Box" width="10%">
          Content
        </Flexbox>
        <Flexbox flexGrow={1} className="Box" width="10%">
          Content
        </Flexbox>
        <Flexbox flexGrow={1} className="Box" width="10%">
          Content
        </Flexbox>
        <Flexbox flexGrow={1} className="Box" width="10%">
          Content
        </Flexbox>
        <Flexbox flexGrow={1} className="Box" width="10%">
          Content
        </Flexbox>
        <Flexbox flexGrow={1} className="Box" width="10%">
          Content
        </Flexbox>
      </Flexbox>
    )}
  </div>

);

Block.propTypes = {
  abxNames: PropTypes.array.isRequired,
};

export default Block;
