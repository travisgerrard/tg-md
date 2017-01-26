import React, { PropTypes } from 'react';

const PatientDynamicList = ({
  listCss,
  listContents,
  listClassName,
  deleteText,
  textName,
  handleChange,
  handleDelete,
  decodeString,
  dragOver,
  dragEnd,
  dragStart,
  dragging
}) => (
  <ul id={listCss} onDragOver={dragOver}>
    {listContents.map((element, key) =>
      <li key={key} data-id={key} draggable="true" onDragEnd={dragEnd} onDragStart={dragStart} >
      <input type="checkbox" className={listClassName} name={key} value={decodeString(element[textName])} onChange={handleChange} defaultChecked={element.complete} />{decodeString(element[textName])}
      <a className={deleteText} name={key} onClick={handleDelete}>{element.complete ? "_X_" : ""}</a>
      </li>
    )}
  </ul>
);

PatientDynamicList.propTypes = {
  listCss: PropTypes.string.isRequired,
  listContents: PropTypes.array.isRequired,
  listClassName: PropTypes.string.isRequired,
  deleteText: PropTypes.string.isRequired,
  textName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  decodeString: PropTypes.func.isRequired,
  dragOver: PropTypes.func.isRequired,
  dragEnd: PropTypes.func.isRequired,
  dragStart: PropTypes.func.isRequired,
  dragging: PropTypes.bool.isRequired

};

export default PatientDynamicList;
