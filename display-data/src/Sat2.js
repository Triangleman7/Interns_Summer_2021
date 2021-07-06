import React, { useState } from "react";
import * as XLSX from "xlsx";

function Sat2() {

    var file;
    const [items, setItems] = useState([]);

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' });
                const wsname = wb.SheetNames[1];
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
        <div>
            <h1>Sat2</h1>
            <label for='file-upload' class='custom-file-upload'>
                Upload Spreadsheet
            </label>
            <input
                id='file-upload'
                type='file'
                onChange={(e) => {
                    file = e.target.files[0];
                    if (file !== undefined) {
                        readExcel(file);
                    }
                }}
            />

            <table class='table container' id='table'>
                <thead>
                    <tr>
                        <th scope='col'>Message</th>
                        <th scope='col'>Length</th>
                        <th scope='col'>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((d) => (
                        <tr key={d.Message}>
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

export default Sat2;