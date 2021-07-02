import React, { Component } from "react";
import "./PageButton.css";


export class PageButton extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isClicked: false
        }
    }
    
    clickHandler = () => {
        this.setState({
            isClicked: true
        })
    }
    
    render() {
        return (
            <button onClick={this.clickHandler} >{this.props.pageName}</button>
        );
    }
}
