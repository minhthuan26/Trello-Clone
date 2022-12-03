import axios from 'axios';
import React from 'react';
import Moment from 'react-moment';
import './Card.scss';

function Card(props) {
  const { card } = props;
  // const handleChangeCard = (e) => {
  //   if (e.target.check) {
  //     try {
  //       axios.patch(`//localhost:3000/api/v1/cards/change-status`);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  return (
    <div className="card-item">
      {card.cover && (
        <img
          src={card.cover}
          className="card-cover"
          alt="board-img"
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
      {card.title}
      <div className="actions">
        <Moment className="time" format="DD/MM/y HH:mm ">
          {card.time}
        </Moment>
      </div>
    </div>
  );
}

export default Card;
