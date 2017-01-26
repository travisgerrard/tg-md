import React, { PropTypes } from 'react';
import PatientDynamicList from '../components/PatientDynamicList.jsx';
import Crypto from '../modules/Crypto';

require('../sass/PatientConsult.scss');

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
        listClassName: "Consult",
        deleteText: "deleteConsult",
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.dragStart = this.dragStart.bind(this);
      this.dragEnd = this.dragEnd.bind(this);
      this.dragOver = this.dragOver.bind(this);
      this.sort = this.sort.bind(this);
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
      //console.log(event.target.name);
      this.props.onUpdate(event.target, this.props.patientData._id);
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
      console.log("Ended");
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

    render() {
      if (this.state.consult !== undefined) {
        var listItems = this.state.data.consult.map((item, i) => {
          var dragging = (i == this.state.data.dragging) ? "dragging" : "";
          return (
            <PatientDynamicList
              key={i}
              text={Crypto.decodeString(item.consultText, this.props.secretCode)}
              isComplete={item.complete}
              dragging={dragging}
              i={i}
              dragStart={this.dragStart}
              dragEnd={this.dragEnd}
              dragOver={this.dragOver}
              listClassName={this.state.listClassName}
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

export default PatientConsultsPage;
