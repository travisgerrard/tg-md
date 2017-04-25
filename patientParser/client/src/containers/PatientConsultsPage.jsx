import React, { PropTypes } from 'react';
import PatientDynamicList from '../components/PatientDynamicList.jsx';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import Crypto from '../modules/Crypto';

import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Toggle from 'material-ui/Toggle';

require('../sass/PatientConsult.scss');

const SortableItem = SortableElement(({
  value,
  editElement,
  handleChange,
  isComplete,
  index,
  anIndex,
  handleDelete,
  handleClick,
  key}) => {
  // Pass a div with ID as the primary text to access the index on click!
  return(
      <ListItem
        onDoubleClick={editElement}
        onClick={handleClick}
        onChange={handleChange}
        primaryText={<div id={anIndex} className="Consult">{value}</div>}
        style={isComplete ? {color: "#d32f2f"} : {color: "#212121"}}
        />
    )

});

const SortableList = SortableContainer(({items, secretCode, editElement, handleChange, handleDelete, handleClick}) => {
  return (
    <List>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          editElement={editElement}
          handleChange={handleChange}
          handleDelete={handleDelete}
          handleClick={handleChange}
          index={index}
          anIndex={index}
          isComplete={value.complete}
          value={Crypto.decodeString(value.consultText, secretCode)} />
      ))}
    </List>
  );
});

class PatientConsultsPage extends React.Component {
  /**
    * Class constructor
    */
    // Sets initial state
    constructor(props) {
      super(props);

      this.state = {
        data: this.props.patientData,
        consult: this.props.patientData.consult,
        sortClassName: "ConsultSort"
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.dragStart = this.dragStart.bind(this);
      this.dragEnd = this.dragEnd.bind(this);
      this.dragOver = this.dragOver.bind(this);
      this.sort = this.sort.bind(this);
      this.editElement = this.editElement.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.onSortEnd = this.onSortEnd.bind(this);
    }

    // updates state with props from PatientAll with they get reloaded
    componentWillReceiveProps(nextProps) {
      this.setState ({ data: nextProps.patientData });
    }

    // Updates model that action was checked
    handleChange(event) {
      this.props.onUpdate(event.target, this.props.patientData._id);
    }

    handleDelete(event) {
      this.props.onUpdate(event.target, this.props.patientData._id);
    }

    editElement(event) {
      // event.currentTarget.dataset.id gives index of tapped item in list
      // We can then probe if currently isEditing
      // If already editing, will not change isEditing to false with double click
      if (!this.state.data.consult[event.currentTarget.dataset.id].isEditing) {
        this.props.onUpdate(event.target, this.props.patientData._id);
      }
   }

    handleKeyPress(event) {
      if (event.key === 'Enter') {
        this.props.onUpdate(event.target, this.props.patientData._id);
      }
    }

    sort(consult, dragging) {
      var data = this.state.data;
      data.consult = consult;
      data.dragging = dragging;
      this.setState({data: data});
    }

    dragStart(e) {
      this.dragged = Number(e.currentTarget.dataset.id);
      e.dataTransfer.effectAllowed = 'move';
      // for the drag to properly work
      e.dataTransfer.setData("text/html", null);
    }

    dragEnd(e) {
      this.sort(this.state.data.consult, undefined);
      this.props.onUpdate(e.target, this.props.patientData._id);
    }

    dragOver(e) {
      e.preventDefault();

      var over = e.currentTarget;
      var dragging = this.state.data.dragging;
      var from = isFinite(dragging) ? dragging : this.dragged;
      var to = Number(over.dataset.id);
      if((e.clientY - over.offsetTop) > (over.offsetHeight / 2)) to++;
      if(from < to) to--;

      // move from 'a' to 'b'
      var items = this.state.data.consult;
      items.splice(to, 0, items.splice(from,1)[0]);
      this.sort(items, to);
    }

    elementClicked(e) {
      e.preventDefault();

      console.log("Clicked once");
    }

    onSortEnd (oldIndex, newIndex) {
      //console.log(oldIndex.oldIndex);
      //console.log(oldIndex.newIndex);

      var data = this.state.data;
      data.consult = arrayMove(this.state.data.consult, oldIndex.oldIndex, oldIndex.newIndex);
      this.setState({data: data});

      //console.log(this.state.data);
      this.props.onUpdate({className: "ConsultSort"}, this.props.patientData._id);

    }



    render() {
      if (this.state.consult !== undefined) {
        var listItems = this.state.data.consult.map((item, i) => {
          var dragging = (i == this.state.data.dragging) ? "dragging" : "";
          var isEditing = (item.isEditing) ? true : false;
          return (
            <PatientDynamicList
              editElement={this.editElement}
              isEditing={isEditing}
              handleKeyPress={this.handleKeyPress}
              key={i}
              text={Crypto.decodeString(item.consultText, this.props.secretCode)}
              isComplete={item.complete}
              dragging={dragging}
              i={i}
              dragStart={this.dragStart}
              dragEnd={this.dragEnd}
              dragOver={this.dragOver}
              listClassName={"Consult"}
              editClassName={"ConsultEdit"}
              sortClassName={"ConsultSort"}
              deleteText={"deleteConsult"}
              handleDelete={this.handleDelete}
              handleChange={this.handleChange} />
          )
        })
        return (<ul id="dynamicListUl">
          {listItems}
        </ul>);
      } else {
        return null;
      }
    }
}

export default PatientConsultsPage;
