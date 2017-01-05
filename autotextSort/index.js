import React from "react";
import ReactDOM from "react-dom";
import {Table, Column, Cell} from 'fixed-data-table';


var DepartmentGridTable = React.createClass({
 getInitialState: function() {
    return {
      departments: [
      {
        "ABBREVIATION" : "test1",
        "UPDATED": "No",
        "CONTENTS" : "text1_Contents"
      },
      {
        "ABBREVIATION" : "test2",
        "UPDATED": "No",
        "CONTENTS" : "text2_Contents"
      }],
     departments1:[], rows:[]};
  },

  componentDidMount: function() {
    this.setState({departments1: this.state.departments});
  },

  renderHeader(label, cellDataKey) {
   return <div>
         <span>{label}</span>
           <div>
             <br />
             <input type="text" onChange={this.onFilterChange.bind(this, cellDataKey)}/>
           </div>
       </div>;
 },

  onFilterChange(cellDataKey, event) {
  if (!event.target.value) {
    this.setState({
      departments: this.state.departments1,
    });
  }
  var filterBy = event.target.value.toString().toLowerCase();
  var size = this.state.departments1.length;
  var filteredList = [];
  for (var index = 0; index < size; index++) {
    var v = this.state.departments1[index][cellDataKey];
    if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
      filteredList.push(this.state.departments1[index]);
    }
  }
  this.setState({
    departments: filteredList,
  });
},


 render: function(){
 var rows = this.state.departments;
 console.log(rows.length);
        return <Table
      height={100 + (rows.length * 20)}
      width={600}
      rowsCount={rows.length}
      rowHeight={30}
      headerHeight={80}
      rowGetter={function(rowIndex) {return rows[rowIndex]; }}>

      <Column dataKey="ABBREVIATION" width={200} label="Department Id" headerRenderer={this.renderHeader} />
      <Column dataKey="UPDATED" width={200} label="Department Id" headerRenderer={this.renderHeader} />
      <Column dataKey="CONTENTS" width={200} label="Department Name" headerRenderer={this.renderHeader} />

    </Table>;
     }

 });


ReactDOM.render(
 <DepartmentGridTable />,
  document.querySelector("#container")
);
