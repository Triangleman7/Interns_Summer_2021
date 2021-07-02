import React, { Component } from 'react';
import { PageButton } from "./Components/PageButton";
import { Link } from 'react-router-dom';

export class NavBar extends Component {
    render() {
        return (
            // <div>
            //     <PageButton pageName="Sat1" class="nav-bar" /> 
            //     <PageButton pageName="Sat2"class="nav-bar" />
            //     <PageButton pageName="Ground Station" class="nav-bar" />
            //     <PageButton pageName="Rules" class="nav-bar" />
            // </div>
            <nav>
                <h1>This is a header</h1>
                <div>
                    {/* <Link href="/">Home</Link> */}
                    <Link to="/">Home</Link>
                    <Link to="/Sat1" class='link'>Sat1</Link>
                    <Link to="/Sat2">Sat2</Link>
                    <Link to="/ground-station">Ground Station</Link>
                    <Link to="/rules">Rules</Link>
                </div>
            </nav>
        );
    }
}