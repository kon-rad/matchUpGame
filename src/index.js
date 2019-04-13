import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './components/Header';
import { BrowserRouter, Route, Link } from "react-router-dom";


const routing = (
    <BrowserRouter>
        <Header />
        <div>
            <Route exact path="/" component={App} />
        </div>
    </BrowserRouter>
);
ReactDOM.render(routing, document.getElementById('root'));
