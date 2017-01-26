import React, { PropTypes } from 'react';
import PatientDynamicList from '../components/PatientDynamicList.jsx';
import PatientDynamicInputBox from '../components/PatientDynamicInputBox.jsx';
import Crypto from '../modules/Crypto';

require('../sass/PatientFollowUps.scss');

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

class PatientFollowUpsPage extends React.Component {

  /**
    * Class constructor
    */
    // Sets initial state
    constructor(props) {
      super(props);

      this.state = {
        listCss: "followUpUl",
        listContents: this.props.patientData.followup,
        listClassName: "FollowUp",
        deleteText: "deleteFollowUp",
        textName: "followUpText",
        inputBoxClassName: "AddFollowUp",
        dragging: false
      }


      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.decodeString = this.decodeString.bind(this);
      this.dragStart = this.dragStart.bind(this);
      this.dragEnd = this.dragEnd.bind(this);
      this.dragOver = this.dragOver.bind(this);
      this.sort = this.sort.bind(this);
    }

    // updates state with props from PatientAll with they get reloaded
    componentWillReceiveProps(nextProps) {
      this.setState ({ listContents: nextProps.patientData.followup });
    }

    decodeString(stringToDecode) {
        return Crypto.decodeString(stringToDecode, this.props.secretCode);
    }

    // Updates model that action was checked
    handleChange(event) {
      this.props.onUpdate(event.target, this.props.patientData._id);
    }

    handleKeyPress(e) {
      if (e.key === 'Enter') {
        this.props.onUpdate(e.target, this.props.patientData._id);
        e.currentTarget.value = ""
      }
    }

    handleDelete(event) {
      //console.log(event.target.name);
      this.props.onUpdate(event.target, this.props.patientData._id);
    }

    sort(listContents, dragging) {
      var data = this.state.listContents;

      data.dragging = dragging;
      this.setState({listContents: data});
    }

    dragStart(e) {
      /*this.dragged = Number(e.currentTarget.dataset.id);
      e.dataTransfer.effectAllowed = 'move';
      // for the drag to properly work
      e.dataTransfer.setData("text/html", null);
      */

      this.dragged = e.currentTarget;
      e.dataTransfer.effectAllowed = 'move';
      // Firefox requires dataTransfer data to be set
      e.dataTransfer.setData("text/html", e.currentTarget);
    }

    dragEnd(e) {

      this.dragged.style.display = "block";
      //this.dragged.parentNode.removeChild(placeholder);
      // Update Data
      var data = this.state.listContents;
      var from = Number(this.dragged.dataset.id);
      var to = Number(this.over.dataset.id);
      if (from < to) to--;
      if (this.nodePlacement == "after") to++;
      data.splice(to, 0, data.splice(from, 1)[0]);
      this.setState({listContents: data});
      //this.sort(this.state.listContents, undefined);
    }

    dragOver(e) {
      /*e.preventDefault();

      var over = e.currentTarget;
      var dragging = this.state.data.dragging;
      var from = isFinite(dragging) ? dragging : this.dragged;
      var to = Number(over.dataset.id);
      if((e.clientY - over.offsetTop) > (over.offsetHeight / 2)) to++;
      if(from < to) to--;

      // move from 'a' to 'b'
      var items = this.state.listContents;
      items.splice(to, 0, items.splice(from,1)[0]);
      this.sort(items, to);
      */
      e.preventDefault();
      this.dragged.style.display = "none";
      if(e.target.className == "placeholder") return;
      this.over = e.target;
      // Inside the dragOver method
      var relY = e.client - this.over.offsetTop;
      var height = this.over.offsetHeight / 2;
      var parent = e.target.parentNode;

      if(relY > height) {
        this.nodePlacement = "after";
        parent.insertBefore(placeholder, e.target.nextElementSibling);
      } else if (relY < height) {
        this.nodePlacement = "before";
        parent.insertBefore(placeholder, e.target);
      }
    }

    render() {
      if (this.state.listContents !== undefined) {
      return (
        <div>
          <label>Follow Ups</label>
          <br />
          <PatientDynamicInputBox handleKeyPress={this.handleKeyPress} inputBoxClassName={this.state.inputBoxClassName} />
          <PatientDynamicList dragging={this.state.dragging} dragStart={this.dragStart} dragEnd={this.dragEnd} dragOver={this.dragOver} listCss={this.state.listCss} listContents={this.state.listContents} listClassName={this.state.listClassName} deleteText={this.state.deleteText} textName={this.state.textName} handleDelete={this.handleDelete} decodeString={this.decodeString} handleChange={this.handleChange} />
        </div>
      )
    } else {
      return (
        <div>
          <label>Follow Ups</label>
          <br />
          <PatientDynamicInputBox handleKeyPress={this.handleKeyPress} inputBoxClassName={this.state.inputBoxClassName} />
        </div>
      )
    }
    }
}

export default PatientFollowUpsPage;
