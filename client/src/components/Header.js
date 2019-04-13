import React, { Component } from 'react';


class Hard extends Component {
    render() {
        return (
            <div className="header">
                <nav>
                    <div className="nav-wrapper">
                        <div className="container">
                            <a href="/" className="brand-logo">Match Up</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/">Home</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}


export default Hard;
