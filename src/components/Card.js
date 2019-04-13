import React, { Component } from 'react';

const IMAGES = {
    1: 'mood',
    3: 'motorcycle',
    5: 'pets',
    7: 'public',
    9: 'wb_sunny',
    11: 'trending_up',
    13: 'shopping_cart',
    15: 'school',
    17: 'restaurant',
    19: 'pan_tool',
    21: 'flight_takeoff',
    23: 'flash_on'
};

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flipped: false
        }
    }

    cardClickHandler = () => {
        this.setState({ flipped: true });
        this.props.cardClicked(this.props.cardId);
    };

    render() {

        const icon = IMAGES[this.props.cardId % 2 === 1 ? this.props.cardId : this.props.cardId + 1];
        let cardClassNames = `card_box card_box-${this.props.cardId}`;
        if (this.props.cardHide) {
            cardClassNames += ' card_box__hide';
        } else if (this.state.flipped) {
            cardClassNames += ' card_box__active';
        }

        return (
            <div
                className={cardClassNames}
                onClick={this.cardClickHandler}
            >
                <div className="card_box__inner">
                    <div className="card_box__front">
                    </div>
                    <div className="card_box__back">
                        <i className="large material-icons">{icon}</i>
                    </div>
                </div>
            </div>
        );
    }
};

export default Card;
