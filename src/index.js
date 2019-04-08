import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Easy from './components/Easy';
import Medium from './components/Medium';
import Hard from './components/Hard';
import Header from './components/Header';
import { BrowserRouter, Route, Link } from "react-router-dom";


const routing = (
    <BrowserRouter>
        <Header />
        <div>
            <Route exact path="/" component={App} />
            <Route path="/easy" component={Easy} />
            <Route path="/medium" component={Medium} />
            <Route path="/hard" component={Hard} />
        </div>
    </BrowserRouter>
);
ReactDOM.render(routing, document.getElementById('root'));
