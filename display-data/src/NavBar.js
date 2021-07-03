import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavBar extends Component {
    render() {
        return (
            <nav>
                <h1>This is a header</h1>
                <div>

                    <Link to="/Sat1" class='link'>Sat1</Link>
                    <Link to="/Sat2">Sat2</Link>
                    <Link to="/ground-station">Ground Station</Link>
                    <Link to="/rules">Rules</Link>
                </div>
            </nav>
        );
    }
}