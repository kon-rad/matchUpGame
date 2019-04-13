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
    23: 'flash_on',
    25: 'brightness_2',
    27: 'directions_bike',
    29: 'favorite',
    31: 'filter_hdr',
    33: 'grade',
    35: 'home'
};

class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const icon = IMAGES[this.props.cardId % 2 === 1 ? this.props.cardId : this.props.cardId + 1];
        let cardClassNames = `card_box card_box-${this.props.cardId}`;
        if (this.props.removed === true) {
            cardClassNames += ' card_box__hide';
        } else if (this.props.flipped === true) {
            cardClassNames += ' card_box__active';
        }

        return (
            <div
                className={cardClassNames}
                onClick={() => this.props.cardClicked(this.props.cardId)}
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
