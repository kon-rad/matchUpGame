import React from 'react';

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

const Card = (props) => {
    const icon = IMAGES[props.cardId % 2 === 0 ? props.cardId : props.cardId + 1];
    return (
        <div className={`card_box card_box-${props.cardId}`} onClick={() => props.cardClicked(props.cardId)}>
            <i className="large material-icons">{icon}</i>
        </div>
    );
};

export default Card;
