import React, { PropTypes } from 'react';

const PatientDynamicList = ({
  i,
  dragging,
  text,
  isComplete,
  listClassName,
  deleteText,
  handleChange,
  handleDelete,
  dragOver,
  dragEnd,
  dragStart
}) => (
      <li key={i} data-id={i} className={dragging} draggable="true" onDragEnd={dragEnd} onDragStart={dragStart} onDragOver={dragOver}>
        <input type="checkbox" className={listClassName} name={i} value={text} onChange={handleChange} defaultChecked={isComplete} />{text}
        <a className={deleteText} name={i} onClick={handleDelete}>{isComplete ? "_X_" : ""}</a>
      </li>
);

PatientDynamicList.propTypes = {
  listClassName: PropTypes.string.isRequired,
  deleteText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  dragOver: PropTypes.func.isRequired,
  dragEnd: PropTypes.func.isRequired,
  dragStart: PropTypes.func.isRequired,
  dragging: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired
};

export default PatientDynamicList;
