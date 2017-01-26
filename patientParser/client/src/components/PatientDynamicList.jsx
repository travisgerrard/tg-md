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
  dragStart,
  isEditing,
  editElement,
  editClassName,
  sortClassName,
  handleKeyPress
}) => (
      <li className={sortClassName} key={i} data-id={i} data-name={i} draggable="true" onDragEnd={dragEnd} onDragStart={dragStart} onDragOver={dragOver} onDoubleClick={editElement}>
        {isEditing ? (
          <input type="text" className={editClassName} onKeyPress={handleKeyPress} defaultValue={text} data-name={i}/>
        ) : (
          <div className={editClassName} data-name={i} >
            <input
              type="checkbox"
              className={listClassName}
              name={i}
              value={text}
              onChange={handleChange}
              defaultChecked={isComplete} />{text}
            <a className={deleteText} name={i} onClick={handleDelete}>{isComplete ? "_X_" : ""}</a>
          </div>
        )}

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
  isComplete: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editElement: PropTypes.func.isRequired,
  editClassName: PropTypes.string.isRequired,
  sortClassName: PropTypes.string.isRequired,
  handleKeyPress: PropTypes.func.isRequired
};

export default PatientDynamicList;
