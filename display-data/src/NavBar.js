import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export class NavBar extends Component {
    render() {
        return (
            <nav>
                <div class='topnav'>
                    <ul>
                        <li><Link to="/Sat1">Sat1</Link></li>
                        <li><Link to="/Sat2">Sat2</Link></li>
                        <li><Link to="/ground-station">Ground Station</Link></li>
                        <li><Link to="/rules">Rules</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}