import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reactDom from 'react-dom';

// single bullet points... SCRAPPED
/*
function Satellite(props) {
    const listMessages = props.messages.map((message, index) =>
        <li key={index}>
            {message}
        </li>
    );
    const listLengths = props.lengths.map((length, index) =>
        <li key={index}>
            {length}
        </li>)
    const listValues = props.values.map((value, index) =>
        <li key={index}>
            {value}
        </li>
    );
    return (
        <div>
            <h1>{props.name}</h1>
            <h2>Messages</h2>
                <ul>{listMessages}</ul>
            <h2>Lengths</h2>
                <ul>{listLengths}</ul>
            <h3>Values</h3>
                <ul>{listValues}</ul>
        </div>
    );
}

const sat1 = <Satellite 
    name='Satellite 1'
    messages={['Commercials', 'TV Movie', 'TV Show', 'Movie', 'SOH1', 'SOH2', 'SOH3', 'SOH4', 'SOH5', 'SOH6', 'SOH7', 'SOH8', 'Good Morning']}
    lengths={[30, 60, 45, 120, 5, 5, 5, 5, 5, 5, 5, 5, 5]}
    values={[100, 150, 100, 400, 10, 10, 10, 10, 10, 10, 10, 10, 0]} />;

const sat2 = <Satellite 
    name='Satellite 2'
    messages={['Commercials', 'TV Movie', 'TV Show', 'Movie', 'SOH1', 'SOH2', 'SOH3', 'SOH4', 'SOH5', 'SOH6', 'SOH7', 'SOH8', 'Good Morning']}
    lengths={[30, 60, 45, 120, 5, 5, 5, 5, 5, 5, 5, 5, 5]}
    values={[50, 200, 100, 300, 10, 10, 10, 10, 10, 10, 10, 10, 0]} />;
*/

//two table stacked
function SatelliteData(props) {
    return (
        <div>
            <h1>{props.name}</h1>
            <table style={{width:300}}>
                <thead>
                    <tr>
                        {props.headings.map((heading) =>
                            <th>{heading}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {props.body.map((row) =>
                        <tr>{row.map((val) =>
                            <td><center>{val}</center></td>)}
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
}

const sat1 = <SatelliteData 
    name='Satellite 1' 
    headings={['Messages', 'Lengths', 'Values']}
    body={[
        ['Commercials', '30', '100'],
        ['TV Movie', '60', '150'],
        ['TV Show', '45', '100'],
        ['Movie', '120', '400'],
        ['SOH1', '5', '10'],
        ['SOH2', '5', '10'],
        ['SOH3', '5', '10'],
        ['SOH4', '5', '10'],
        ['SOH5', '5', '10'],
        ['SOH6', '5', '10'],
        ['SOH7', '5', '10'],
        ['SOH8', '5', '10'],
        ['Good Morning', '5', '0']
        ]} />;
const sat2 = <SatelliteData 
    name='Satellite 2' 
    headings={['Messages', 'Lengths', 'Values']}
    body={[
        ['Commercials', '30', '50'],
        ['TV Movie', '60', '200'],
        ['TV Show', '45', '100'],
        ['Movie', '120', '300'],
        ['SOH1', '5', '10'],
        ['SOH2', '5', '10'],
        ['SOH3', '5', '10'],
        ['SOH4', '5', '10'],
        ['SOH5', '5', '10'],
        ['SOH6', '5', '10'],
        ['SOH7', '5', '10'],
        ['SOH8', '5', '10'],
        ['Good Morning', '5', '0']
        ]} />;

const element = <div><center>
    {sat1}
    {sat2}
    </center>
    </div>

ReactDOM.render(
    element,
    document.getElementById('root')
);