import React, { Component } from 'react';

const IMAGES = {
    2: 'mood',
    4: 'motorcycle',
    6: 'pets',
    8: 'public',
    10: 'wb_sunny',
    12: 'trending_up',
    14: 'shopping_cart',
    16: 'school',
    18: 'restaurant',
    20: 'pan_tool',
    22: 'flight_takeoff',
    24: 'flash_on'
};

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flipped: false
        }
    }
    render() {

        const icon = IMAGES[this.props.cardId % 2 === 0 ? this.props.cardId : this.props.cardId + 1];

        return (
            <div
                className={`flip_card ${this.state.flipped ? 'flip_card__active' : ''} card_box card_box-${this.props.cardId} ${this.props.cardHide ? 'flip_card__hide' : ''}`}
                onClick={this.cardClickHandler}
            >
                <div className="flip_card__inner">
                    <div className="flip_card__front">
                    </div>
                    <div className="flip_card__back">
                        <i className="large material-icons">{icon}</i>
                    </div>
                </div>
            </div>
        );
    }

    cardClickHandler = () => {
        this.setState({ flipped: true });
        // setTimeout(() => this.setState({ flipped: false }), 2000);
        this.props.cardClicked(this.props.cardId);
    }
};

export default Card;
