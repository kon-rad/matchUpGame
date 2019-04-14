import React, {Component} from 'react';
import Game from './components/Game';

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="container">
                    <Game />
                </div>
            </div>
        );
    }
}

export default App;
