import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";
import { TestButton } from "./Components/TestButton";
import { PageButton } from "./Components/PageButton";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Sat1 } from "./Sat1";
import {NavBar} from "./NavBar";
import { Sat2 } from "./Sat2";
import { Home } from "./Home";
import { GroundStation } from "./GroundStation";
import { Rules } from "./Rules";


function App() {

  var pageNum;
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    
    const promise = new Promise((resolve, reject) => {

      console.log(1);
      const fileReader = new FileReader();
      console.log(2);
      fileReader.readAsArrayBuffer(file);
      console.log(3);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <Router>
      <div>
        <NavBar/>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Sat1">
              <Sat1 />
            </Route>
            <Route exact path="/Sat2">
              <Sat2 />
            </Route>
            <Router exact path="/ground-station">
              <GroundStation />
            </Router>
            <Router exact path="/rules">
              <Rules />
            </Router>
          </Switch>
        </div>
      </div>
      
      
      <div>
        {/* allows user to input excel file */}
        <label for="file-upload" class="custom-file-upload">
          Upload Spreadsheet
        </label>
        <input
          id="file-upload"
          type="file"
          // class = "input-button"
          onChange={(e) => {    // read file when status changes 
            const file = e.target.files[0];
            if (file !== undefined) {
              readExcel(file);
            }
          }}
        />
        



        {/* creates table to display evalues from excel file */}
        <table class="table container" id="table">
          <thead>
            <tr>
              {/* headers */}
              <th scope="col">Message</th>
              <th scope="col">Length</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.Message}>
                {/* list values */}
                <th>{d.Message}</th>
                <td>{d.Length}</td>
                <td>{d.Value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Router>
  );
}

export default App;
