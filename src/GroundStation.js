import React from "react";
import Flexbox from 'flexbox-react';

class Input {
  constructor(request) {
    if (request === "") {
      this.valid = 0;
      this.satelliteId = "";
      this.message = "";
      this.length = "";
      this.value = "";
      this.time = "";
      this.id = "";
    } else {
      this.valid=1;
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
    this.state = {
      maxIndex: 0,   // (Number of requests in the file, opened) - 1  
      currIndex: 0,  // current request number under processing
      request: [],   // current request under processing
      schedule: []   // accepted requests
    };
    this.fileReading = []; // Parsed requests in the file
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
  };

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result);
      this.fileReading = JSON.parse(text);
      this.state.maxIndex = this.fileReading.requests.length-1;
      this.setState({request: new Input(this.fileReading.requests[0])});
      this.setState({fileReading: JSON.parse(text)});
      this.displayRequest(this.state.request);
      this.displaySchedule();
    };
    reader.readAsText(e.target.files[0]);
  };

  displayRequest(request) {
    if (request.valid) {
      let textt = request.satelliteId + ", " + 
      request.message + ", " + request.length + ", " +
      request.value + ", " + request.time + ", " + request.id;
      document.getElementById("display request").innerHTML = textt;
    } else {
      document.getElementById("display request").innerHTML = "There are no more requests.";
    }
  };

  displaySchedule() {
    let lenOfArray = this.state.schedule.length;

    let textt = "Accepted schedules<ul>";
    for (let i = 0; i < lenOfArray; i++) {
      textt += "<li>" + this.state.schedule[i].satelliteId + ", " + 
      this.state.schedule[i].message + ", " + this.state.schedule[i].length + ", " +
       this.state.schedule[i].value + ", " + this.state.schedule[i].time + ", " + this.state.schedule[i].id+ "</li>";
    }
    textt += "</ul>";

    document.getElementById("display schedule").innerHTML = textt;
  }

  accept(){
    const currIndex = this.state.currIndex;
    this.state.schedule.push(new Input(this.fileReading.requests[currIndex]));
    this.displaySchedule();

    if (this.state.currIndex === this.state.maxIndex) {
      const currIndex = 0;
      const request = new Input("");
      this.setState({currIndex: currIndex, request: request});
      this.displayRequest(request);
    } else {
      const currIndex = this.state.currIndex + 1;
      const request = new Input(this.fileReading.requests[currIndex]);
      this.setState({currIndex: currIndex, request: request});
      this.displayRequest(request);
    }
  };

  reject() {
    if (this.state.currIndex === this.state.maxIndex) {
      const currIndex = 0;
      const request = new Input("");
      this.setState({currIndex: currIndex, request: request});
      this.displayRequest(request);
    } else {
      const currIndex = this.state.currIndex + 1;
      const request = new Input(this.fileReading.requests[currIndex]);
      this.setState({currIndex: currIndex, request: request});
      this.displayRequest(request);
    }
  };

  render() {
    return (
      <div>
        <div> <input type="file" accept=".json" onChange={(e) => this.showFile(e)} /> </div>
        <div><p id="display request"></p></div>
        <div>
          <button disabled={!this.state.request.valid} className="btn btn-success" onClick={this.accept}>Accept</button>
          <button disabled={!this.state.request.valid} className="btn btn-success" onClick={this.reject}>Reject</button>
        </div>
        <p></p>
        <div><p id="display schedule"></p></div>
      </div>
    );
  };
};

export default GroundStation;