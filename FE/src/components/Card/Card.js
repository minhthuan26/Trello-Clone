import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Moment from 'react-moment';
import './Card.scss'


function Card(props) {
   const [newCardStatus, setNewCardStatus] = useState(false);
   const onNewCardStatusChange = (e) => {
      if (e.target.checked) {

         <Form.Check checked="true">{card.status}</Form.Check>
       } else {
         <Form.Check checked="false">{card.status}</Form.Check>
       }
       setNewCardStatus(current => !current);
   };
   const { card } = props
     return(
        <div className="card-item">
         {card.cover && 
            <img 
               src={card.cover} 
               className="card-cover" 
               alt="board-img" 
               onMouseDown={e => e.preventDefault()}
            />
         }
         {card.title}
         <div className="actions">
            <Moment className="time" format="DD/MM/y HH:mm ">{card.time}</Moment>
            <Form.Check 
               className="check-box" 
               aria-label="option 1" 
               onChange={onNewCardStatusChange}
               value={newCardStatus}>
            </Form.Check>
         </div>
        
         
        </div>
     )
}

export default Card