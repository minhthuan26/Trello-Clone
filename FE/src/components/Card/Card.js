import axios from 'axios';
import React from 'react';
import { Form } from 'react-bootstrap';
import Moment from 'react-moment';
import './Card.scss';

function Card(props) {
  const { card } = props;
  const handleChangeCard = (e) => {
    if (e.target.check) {
      try {
        axios.patch(`//localhost:3000/api/v1/cards/change-status`);
      } catch (error) {
        console.log(error);
      }
    }
  };
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
        <Form.Check className="check-box" onChange={handleChangeCard}>
          {card.status}
        </Form.Check>
      </div>
    </div>
  );
}

export default Card;
