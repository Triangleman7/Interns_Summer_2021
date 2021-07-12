import React from "react";
//import Flexbox from 'flexbox-react';

class Input {
  constructor(request) {
    if (request === "") {
      this.satelliteId = "";
      this.message = "";
      this.length = "";
      this.value = "";
      this.time = "";
      this.id = "";
    } else {
      this.satelliteId = request.satelliteId;
      this.message = request.message;
      this.length = request.length;
      this.value = request.value;
      this.time = request.time;
      this.id = request.id;
    }
  }
}

class GroundStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { requestValid: 0 }; // To indicate
    this.fileReading = []; // Parsed requests in the file.
    this.maxIndex = 0;     // (Number of requests in the file, opened) - 1  
    this.currIndex = 0;    // current request number under processing
    this.schedule = [];    // accepted requests
    this.request = [];     // current request under processing
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
  };

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result);
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
      request.value + ", " + request.time + ", " + request.id;
      document.getElementById("display request").innerHTML = textt;
    } else {
      document.getElementById("display request").innerHTML = "There are no more requests.";
    }
  };

  displaySchedule(schedule) {
    let textt = '<p>Accepted schedules</p>';
    
    textt += '<svg width="1040" height="50">';
    textt += '<line x1="40" y1="10" x2="1000" y2="10" style="stroke:rgb(255,0,0);stroke-width:2" />';
    for (let i=0; i<=24; i++) {
      const x1 = (40+i*40).toString();
      textt += '<line x1="' + x1 + '" y1="0" x2="' + x1 + '" y2="20" style="stroke:rgb(255,0,0);stroke-width:2" />';
      textt += '<text x="' + (i*40+35).toString() + '" y="40">' + i.toString() + '</text>';
    }
    textt += '</svg>';
 
    if (schedule.length)
    {
      textt += "<ol>";
      for (let i = 0; i < schedule.length; i++) {
        textt += "<li>" + schedule[i].satelliteId + ", " + 
        schedule[i].message + ", " + schedule[i].length + ", " +
        schedule[i].value + ", " + schedule[i].time + ", " + schedule[i].id+ "</li>";
      }
      textt += "</ol>";
 
    }
    document.getElementById("display schedule").innerHTML = textt;
  }


  accept(){
    this.schedule.push(new Input(this.fileReading.requests[this.currIndex]));
    this.displaySchedule(this.schedule);

    if (this.currIndex === this.maxIndex) {
      const request = new Input("");
      this.currIndex = 0;
      this.displayRequest(0, this.request);
      this.setState({requestValid: 0});
    } else {
      this.currIndex = this.currIndex + 1;
      const request = new Input(this.fileReading.requests[this.currIndex]);
      this.displayRequest(1, this.request);
    }
  };

  reject() {
    if (this.currIndex === this.maxIndex) {
      const request = new Input("");
      this.currIndex = 0;
      this.displayRequest(0, this.request);
      this.setState({requestValid: 0});
    } else {
      this.currIndex = this.currIndex + 1;
      this.request = new Input(this.fileReading.requests[this.currIndex]);
      this.displayRequest(1, this.request);
    }
  };

  render() {
    return (
      <div>
        <div> <input type="file" accept=".json" onChange={(e) => this.showFile(e)} onClick={(e) => (e.target.value = null)} /> </div>
        <div><p id="display request"></p></div>
        <div>
          <button disabled={!this.state.requestValid} className="btn btn-success" onClick={this.accept}>Accept</button>
          <button disabled={!this.state.requestValid} className="btn btn-success" onClick={this.reject}>Reject</button>
        </div>
        <p></p>
        <div><p id="display schedule"></p></div>
      </div>
    );
  };
};

export default GroundStation;