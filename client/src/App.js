import React, {Component} from 'react';
import Card from './components/Card';

const EASY = 'EASY';
const MEDIUM = 'MEDIUM';
const HARD = 'HARD';

const LEVEL_SIZE = {
    EASY: 12,
    MEDIUM: 24,
    HARD: 36
};


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            selectedCard: null,
            remaining: null,
            gameCards: [],
            mapIdtoIndex: [],
            missed: 0,
            time: 0,
            freeze: false
        };
        String.prototype.toMMSS = function () {
            let sec = parseInt(this, 10);
            let minutes = Math.floor((sec - (Math.floor(sec / 3600) * 3600)) / 60);
            let seconds = sec - (Math.floor(sec / 3600) * 3600) - (minutes * 60);

            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return minutes+':'+seconds;
        }
    }
    tick;
    gameWonMessage = '';

    initGame = (level) => {
        this.quitGame();
        const cards = [];
        let i = 0;
        const mapIdtoIndex = new Array(LEVEL_SIZE[level]);
        while (i < LEVEL_SIZE[level]) {
            cards.push(
                <Card key={i} cardId={i} cardClicked={this.cardClickedHandler} removed={false} flipped={false}/>
            );
            mapIdtoIndex[i] = i;
            i++;
        };

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
            [mapIdtoIndex[i], mapIdtoIndex[j]] = [mapIdtoIndex[j], mapIdtoIndex[i]];
        }
        const flippedMapIdtoIndex = Object.keys(mapIdtoIndex).reduce((o, k) => Object.assign({}, o, { [mapIdtoIndex[k]]: k }), {});
        this.setState({ game: level, gameCards: cards, mapIdtoIndex: flippedMapIdtoIndex, remaining: LEVEL_SIZE[level] });
        this.tick = setInterval(() => this.setState({ time: this.state.time + 1 }), 1000);
    };

    renderCards = () => {
        if (this.state.game === null) {
            return;
        }
        return this.state.gameCards;
    };

    cardClickedHandler = (newCardId) => {
        if (this.state.freeze) return;
        const selected = this.state.selectedCard;
        const cardKey = newCardId % 2 === 1 ? newCardId : newCardId + 1;
        const selectedKey = selected % 2 === 1 ? selected : selected + 1;
        this.showCard(newCardId);
        if (selected !== null) {
            if (selected !== newCardId && selectedKey === cardKey) {
                setTimeout(() => this.removeCards(selected, newCardId), 800);
                this.setState({ freeze: true });
            } else {
                setTimeout(() => this.hideCards(selected, newCardId), 500);
                this.setState({ missed: this.state.missed + 1, freeze: true });
            }
            this.setState({ selectedCard: null });
        } else {
            this.setState({ selectedCard: newCardId });
        }
    };

    showCard(newCardId) {
        const cards = this.state.gameCards.slice();
        cards[this.state.mapIdtoIndex[newCardId]] = (
          <Card key={newCardId} cardId={newCardId} cardClicked={this.cardClickedHandler} removed={false} flipped={true}/>
        );
        this.setState({ gameCards: cards });
    };

    hideCards(selected, newCardId) {
        const cards = this.state.gameCards.slice();
        cards[this.state.mapIdtoIndex[selected]] = (
          <Card key={selected} cardId={selected} cardClicked={this.cardClickedHandler} removed={false} flipped={false}/>
        );
        cards[this.state.mapIdtoIndex[newCardId]] = (
          <Card key={newCardId} cardId={newCardId} cardClicked={this.cardClickedHandler} removed={false} flipped={false}/>
        );
        this.setState({ gameCards: cards, freeze: false, selectedCard: null });
    };

    removeCards = (selected, cardId) => {
        const cards = this.state.gameCards.slice();
        cards[this.state.mapIdtoIndex[selected]] = (
          <Card key={selected} cardId={selected} cardClicked={this.cardClickedHandler} removed={true} flipped={false}/>
        );
        cards[this.state.mapIdtoIndex[cardId]] = (
          <Card key={cardId} cardId={cardId} cardClicked={this.cardClickedHandler} removed={true} flipped={false}/>
        );

        if (this.state.remaining - 2 <= 0) {
            this.renderGameWonMessage();

            return;
        }
        this.setState({ gameCards: cards, freeze: false, selectedCard: null, remaining: this.state.remaining - 2 });
    };

    renderGameWonMessage() {
        const finalTime = (this.state.time + '').toMMSS();
        const finalMissed = this.state.missed;
        const finalLevel = this.state.game;
        this.gameWonMessage = (
          <div className="win_message">
              <h1>Great job!</h1>
              <p>Difficulty Level: {finalLevel}</p>
              <p>Time: {finalTime}</p>
              <p>Missed: {finalMissed}</p>
          </div>
        );
        this.setState({ game: null, gameCards: [], missed: 0, remaining: 0, time: 0 });
        clearInterval(this.tick);
    }

    renderDashboard() {
        if (this.state.game === null) {
            return;
        }
        return (
          <p className="dashboard" >Difficulty Level: {this.state.game} Time: {(this.state.time +'').toMMSS()} Missed: {this.state.missed}</p>
        )
    }

    quitGame() {
        this.gameWonMessage = '';
        this.setState({ game: null, gameCards: [], missed: 0, remaining: 0, time: 0 });
        clearInterval(this.tick);
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="card__col">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Match Up Memory Card Game</span>
                                <div className="card-action card__menu">
                                    <a onClick={() => this.initGame(EASY)} className="waves-effect waves-teal btn-flat">Easy</a>
                                    <a onClick={() => this.initGame(MEDIUM)} className="waves-effect waves-teal btn-flat">Medium</a>
                                    <a onClick={() => this.initGame(HARD)} className="waves-effect waves-teal btn-flat">Hard</a>
                                    <a onClick={() => this.quitGame()} className="waves-effect waves-teal btn-flat">Quit</a>
                                </div>
                                {this.renderDashboard()}
                            </div>
                            <div className={`game ${this.state.game}`}>
                                {this.renderCards()}
                                {this.gameWonMessage}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
