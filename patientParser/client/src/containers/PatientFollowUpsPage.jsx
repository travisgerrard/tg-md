import React, { PropTypes } from 'react';
import PatientDynamicList from '../components/PatientDynamicList.jsx';
import Crypto from '../modules/Crypto';

require('../sass/PatientFollowUps.scss');

class PatientFollowUpsPage extends React.Component {
  /**
    * Class constructor
    */
    // Sets initial state
    constructor(props) {
      super(props);

      this.state = {
        data: this.props.patientData,
        followup: this.props.patientData.followup,
        deleteText: "deleteFollowUp",
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.dragStart = this.dragStart.bind(this);
      this.dragEnd = this.dragEnd.bind(this);
      this.dragOver = this.dragOver.bind(this);
      this.sort = this.sort.bind(this);
      this.editElement = this.editElement.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
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
      this.props.onUpdate(event.target, this.props.patientData._id);
    }

    handleKeyPress(event) {
      if (event.key === 'Enter') {
        this.props.onUpdate(event.target, this.props.patientData._id);
      }
    }

    sort(followup, dragging) {
      var data = this.state.data;
      data.followup = followup;
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
      this.sort(this.state.data.followup, undefined);
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
      var items = this.state.data.followup;
      items.splice(to, 0, items.splice(from,1)[0]);
      this.sort(items, to);
    }



    render() {
      if (this.state.followup !== undefined) {
        var listItems = this.state.data.followup.map((item, i) => {
          var dragging = (i == this.state.data.dragging) ? "dragging" : "";
          //console.log(item.isEditing);
          var isEditing = (item.isEditing) ? true : false;
          return (
            <PatientDynamicList
              editElement={this.editElement}
              isEditing={isEditing}
              handleKeyPress={this.handleKeyPress}
              key={i}
              text={Crypto.decodeString(item.followUpText, this.props.secretCode)}
              isComplete={item.complete}
              dragging={dragging}
              i={i}
              dragStart={this.dragStart}
              dragEnd={this.dragEnd}
              dragOver={this.dragOver}
              listClassName={"FollowUp"}
              editClassName={"FollowUpEdit"}
              sortClassName={"FollowUpSort"}
              deleteText={this.state.deleteText}
              handleDelete={this.handleDelete}
              handleChange={this.handleChange} />
          )
        })
        return (<ul>
          {listItems}
        </ul>);
      } else {
        return null;
      }
    }
}
export default PatientFollowUpsPage;
