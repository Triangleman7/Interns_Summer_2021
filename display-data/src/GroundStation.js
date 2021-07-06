import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function GroundStation() {

    var file;
    const [items, setItems] = useState([]);

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' });
                const wsname = wb.SheetNames[2];
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
            <h1>Ground Station</h1>
            <label for='file-upload' class='custom-file-upload'>
                Upload Spreadsheet
            </label>
            <input
                id='file-upload'
                type='file'
                onChange={(e) => {
                    file = e.target.files[0];
                    if (file !== undefined) {
                        console.log(9);
                        console.log(file);
                        readExcel(file);
                        console.log(file);
                    }
                }}
            />

            <table class='table container' id='table'>
                <thead>
                    <tr>
                        <th scope='col'>LOS to Sat1</th>
                        <th scope='col'>LOS to Sat2</th>

                    </tr>
                </thead>
                <tbody>
                    {items.map((d) => (
                        <tr key={d['LOS to Sat1']}>
                            <th>{d['LOS to Sat1']}</th>
                            <td>{d['LOS to Sat2']}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GroundStation;