import React from "react";
import './GroundStation.css';
//import Flexbox from 'flexbox-react';
 
class Input {
  constructor(request) {
    if (request === "") {
      this.satelliteId = "";
      this.message = "";
      this.length = "";
      this.value = "";
      this.id = "";
      this.month = "";
      this.day = "";
      this.year = "";
      this.minutes = "";
      this.hours = "";
      this.category = "";
    } else {
      this.satelliteId = request.satelliteId;
      this.message = request.message;
      this.length = request.length;
      this.value = request.value;
      this.id = request.id;
      this.month = request.month;
      this.day = request.day;
      this.year = request.year;
      this.minutes = request.minutes;
      this.hours = request.hours;
      this.category = request.category;
    }
  }
}
 
class GroundStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { requestValid: 0 };
    this.fileReading = []; // Parsed requests in the file.
    this.maxIndex = 0;     // (Number of requests in the file, opened) - 1  
    this.currIndex = 0;    // current request number under processing
    this.schedule = [];    // accepted requests
    this.request = [];     // current request under processing
    this.scheduleMap = new Map();   // map of request with date as key
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
  };
 
  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result);
      console.log(this);
      this.fileReading = JSON.parse(text);
      this.maxIndex = this.fileReading.requests.length-1;
      this.request = new Input(this.fileReading.requests[0]);
      const requestValid = 1;
      this.setState({requestValid: requestValid});
      this.displayRequest(requestValid, this.request);
      this.displaySchedule(this.schedule);
    };
    reader.readAsText(e.target.files[0]);
  };
 
  
 
 
  displayRequest(requestValid, request) {
    if (requestValid) {
      let textt = request.satelliteId + ", " + 
      request.message + ", " + request.length + ", " +
      request.value + ", " + this.displayTime(request.hours, request.minutes) + ", " + request.id
      + ", " + request.month + "/" + request.day + "/" + request.year;
      document.getElementById("display request").innerHTML = textt;
    } else {
      document.getElementById("display request").innerHTML = "There are no more requests.";
    }
  };
 
  accept(){
    this.schedule.push(new Input(this.fileReading.requests[this.currIndex]));
    const date = this.fileReading.requests[this.currIndex].month.toString(10) + this.fileReading.requests[this.currIndex].day.toString(10) + 
      this.fileReading.requests[this.currIndex].year.toString(10);
 
    if (this.scheduleMap.get(date) == null) {
      var dummyArray = [];
      dummyArray[0] = this.fileReading.requests[this.currIndex];
      this.scheduleMap.set(date, dummyArray);
    } else {
      var dummyArray = this.scheduleMap.get(date);
      dummyArray[dummyArray.length] = this.fileReading.requests[this.currIndex];
      this.scheduleMap.set(date, dummyArray);
    }
 
    this.displaySchedule(this.schedule);
    this.createTable(this.fileReading.requests[this.currIndex].month, this.fileReading.requests[this.currIndex].day, this.fileReading.requests[this.currIndex].year);
 
    if (this.currIndex === this.maxIndex) {
      this.currIndex = 0;
      const request = new Input("");
      this.displayRequest(0, this.request);
      this.setState({requestValid: 0});
    } else {
      this.currIndex = this.currIndex + 1;
      this.request = new Input(this.fileReading.requests[this.currIndex]);
      this.displayRequest(1, this.request);
    }
  };
 
  reject() {
    if (this.currIndex === this.maxIndex) {
      this.currIndex = 0;
      this.request = new Input("");
      this.displayRequest(0, this.request);
      this.setState({requestValid: 0});
    } else {
      this.currIndex = this.currIndex + 1;
      this.request = new Input(this.fileReading.requests[this.currIndex]);
      this.displayRequest(1, this.request);
    }
  };
 
  createTable(month, day, year) {
    var timeline = document.getElementById('timeline');
    var timelineHeader = document.getElementById('timelineHeader');
    const date = this.fileReading.requests[this.currIndex].month.toString(10) + this.fileReading.requests[this.currIndex].day.toString(10)
      + this.fileReading.requests[this.currIndex].year.toString(10);
 
    //clear previous table
    timeline.innerHTML = '';
    timelineHeader.innerHTML = month + '/' + day + '/' + year;
 
    var table = document.createElement('TABLE');
    table.border = '1';
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
 
    //time
    var td = document.createElement('TD');
    td.width = '75';
    td.appendChild(document.createTextNode('Time'));
    tr.appendChild(td);
 
    //sat 1
    var td = document.createElement('TD');
    td.width = '75';
    td.appendChild(document.createTextNode('Sat 1'));
    tr.appendChild(td);
 
    //sat 2
    var td = document.createElement('TD');
    td.width = '75';
    td.appendChild(document.createTextNode('Sat 2'));
    tr.appendChild(td);
 
    for (var i=0; i<24; i++) {
      for (var j=0; j<4; j++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
  
        //time
        var td = document.createElement('TD');
        td.width = '75';
        td.appendChild (document.createTextNode(this.displayTime(i, j*15)));
        tr.appendChild(td);
  
        //sat 1
        var td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode(' '));
        tr.appendChild(td);
  
        //sat 2
        var td = document.createElement('TD');
        td.width = '75'; 
        td.appendChild(document.createTextNode(' '));
        tr.appendChild(td);  
      }
    }
    timeline.appendChild(table);
 
    for (var i=0; i<this.scheduleMap.get(date).length; i++) {
      const arr = this.scheduleMap.get(date)[i].length.split(" ");
      var len = parseInt(arr[0]);
      for (var j=0; j<Math.ceil(len/15); j++) {
        var sat = 1;
        if (this.scheduleMap.get(date)[i].satelliteId=='sat2') {
          sat = 2;
        }  
        const cellInTable = tableBody.childNodes[parseInt(this.scheduleMap.get(date)[i].hours)*4+Math.floor(parseInt(this.scheduleMap.get(date)[i].minutes)/15)+1+j].childNodes[sat];
        var entry = document.createElement('TD');
        entry.width = '75';
        entry.appendChild(document.createTextNode(this.scheduleMap.get(date)[i].message));
        cellInTable.replaceWith(entry);
      }
    }
  }
 
  displayTime(hour, min) {
    var rHour = hour.toString();
    if (hour < 10) {
      rHour = "0" + rHour;
    } 
    var rMin = (min).toString();
    if (min < 15) {
      rMin = "0" + rMin;
    }
    return rHour + rMin;
  }
 
  displaySchedule(schedule) {
    let textt = '<p>Accepted schedules</p>';
 
    if (schedule.length)
    {
      textt += "<ol>";
      for (let i = 0; i < schedule.length; i++) {
        textt += "<li>" + schedule[i].satelliteId + ", " + 
        schedule[i].message + ", " + schedule[i].length + ", " +
        schedule[i].value + ", " + schedule[i].time + ", " + schedule[i].id + 
        ", " + schedule[i].month + "/" + schedule[i].day + "/" + schedule[i].year + "</li>";
      }
      textt += "</ol>";
 
    }
    document.getElementById("display schedule").innerHTML = textt;
  }
 
  getInfoFromServer = async (e) => {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:8000/');
    request.responseType = 'text';
 
    request.onload = async () => {
      console.log(this);
      console.log(request.responseText);
      this.fileReading = JSON.parse(request.responseText);
      this.maxIndex = this.fileReading.requests.length-1;
      this.request = new Input(this.fileReading.requests[0]);
      const requestValid = 1;
      this.setState({requestValid: requestValid});
      this.displayRequest(requestValid, this.request);
      this.displaySchedule(this.schedule);
    };
    request.send();
  }
 
 
  
  render() {
    return (
      <div>
        <div> 
          <input type="file" accept=".json" onChange={(e) => this.showFile(e)} onClick={(e) => (e.target.value = null)} />
          <button onClick={(e) => this.getInfoFromServer(e)} className='server-button'>Get from server</button>
        </div>
        <div><p id="display request"></p></div>
        <div className='my-btn-div'>
          <button disabled={!this.state.requestValid} className="btn btn-success my-btn" onClick={this.accept}>Accept</button>
          <button disabled={!this.state.requestValid} className="btn btn-success my-btn" onClick={this.reject}>Reject</button>
        </div>
        <div id="timeline"></div>
        <div id="timelineHeader"></div>
        <div><p id="display schedule"></p></div>
      </div>
    );
  };
};
 
export default GroundStation;
