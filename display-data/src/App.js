import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      // try {
      if (fileReader !== undefined) {  // still doesn't work
        fileReader.readAsArrayBuffer(file);
      
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

      }
      // } catch(err) {    // well this solves the problem but is definitely not optimal
      //   console.log(err);
      // } finally {
      //   console.log("Something went wrong");
      // }


    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
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
          readExcel(file);
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
  );
}

export default App;
