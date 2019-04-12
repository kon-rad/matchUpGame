import React, {Component} from 'react';
import Card from './components/Card';

const LEVEL_SIZE = {
    'EASY': 10,
    'MEDIUM': 16,
    'HARD': 24
};

const EASY = 'EASY';
const MEDIUM = 'MEDIUM';
const HARD = 'HARD';
const QUIT = 'QUIT';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            cards: null,
            selectedCard: null,
            gameCards: [],
            scrambleMap: [],
            attemptCount: 0
        }
    }

    initGame = (level) => {
        if (level === QUIT) {
            this.setState({ game: null, gameCards: [] });
            return ;
        }
        const cards = [];
        let i = 1;
        const scrambleMap = [];
        while (i <= LEVEL_SIZE[level]) {
            cards.push(
                <Card cardId={i} cardClicked={this.cardClickedHandler} cardHide={false}/>
            );
            i++;
        };

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            scrambleMap[i] = j;
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        this.setState({ game: level, gameCards: cards, scrambleMap: scrambleMap });
    };

    renderCards = () => {
        if (!this.state.game) {
            return;
        }
        // return this.state.gameCards.map((v, i) => this.state.gameCards[this.state.scrambleMap[i]]);
        return this.state.gameCards;
    };

    cardClickedHandler = (cardId) => {
        const cardKey = cardId % 2 === 0 ? cardId : cardId + 1;
        console.log(cardId,  this.state.selectedCard, cardKey);
        if (this.state.selectedCard) {
            if (this.state.selectedCard !== cardId && this.state.selectedCard === cardKey) {
                this.removeCards(cardId);
            } else {
                this.setState({ attemptCount: this.state.attemptCount + 1 });
            }
            this.setState({ selectedCard: null });
        } else {
            this.setState({ selectedCard: cardId });
        }
    };

    removeCards = (cardId) => {
        console.log(cardId);
    };

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="card__col">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Flip-it Memory Card Game</span>
                                <p>{this.state.game}</p>
                            </div>
                            <div className="game">
                                {this.renderCards()}
                            </div>
                            <div className="card-action card__menu">
                                <a onClick={() => this.initGame(EASY)} className="waves-effect waves-teal btn-flat">Easy</a>
                                <a onClick={() => this.initGame(MEDIUM)} className="waves-effect waves-teal btn-flat">Medium</a>
                                <a onClick={() => this.initGame(HARD)} className="waves-effect waves-teal btn-flat">Hard</a>
                                <a onClick={() => this.initGame(QUIT)} className="waves-effect waves-teal btn-flat">Quit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
