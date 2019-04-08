import React, { Component } from 'react';
import { Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="container">
              <div className="card__col">
                  <div className="card blue-grey darken-1">
                      <div className="card-content white-text">
                          <span className="card-title">Flip-it Memory Card Game</span>
                          <p></p>
                      </div>
                      <div className="card-action card__menu">
                          <Link to='/easy'>Easy</Link>
                          <Link to='/medium'>Medium</Link>
                          <Link to='/hard'>Hard</Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
