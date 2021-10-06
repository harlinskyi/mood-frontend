import './LeftSide.css'
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Article from './Article/Article';

class LeftSide extends Component {
    render() {
        return (
            <div className="col-9">
                <ul className="RightSide-list-article">
                    <Article />
                </ul>
            </div>
        )
    }

}

export default LeftSide;