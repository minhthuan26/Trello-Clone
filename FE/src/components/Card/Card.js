import React, { useState } from 'react'
import { Form, Dropdown } from 'react-bootstrap';
import Moment from 'react-moment';
import './Card.scss';
import { MODAL_ACTION_CONFIRM } from '../../uitilities/constants';
import ConfirmModal from '../Common/ConfirmModal';
import { deleteCard } from '../../actions/ApiCall';
function Card(props) {
   const { card, onUpdateColumnState } = props
   const [showConfirmModal, setShowCofirmModal] = useState(false);
   const toggleShowConfirmModal = () => setShowCofirmModal(!showConfirmModal);
   const onConfirmModalCardAction = (type) => {
      console.log(type);
      if (type === MODAL_ACTION_CONFIRM) {
        //remove card
      
      //   //call API delele card
        deleteCard(card._id, card).then(deletedCard => {
          onUpdateColumnState(deletedCard)
        })
      }
      toggleShowConfirmModal();
    };
   // const onNewCardStatusChange = (e) => {
   //    if (e.target.checked) {

   //       <Form.Check checked="true">{card.status}</Form.Check>
   //     } else {
   //       <Form.Check checked="false">{card.status}</Form.Check>
   //     }
   //     setNewCardStatus(current => !current);
   // };
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
            {/* <Form.Check 
               className="check-box" 
               aria-label="option 1" 
               onChange={onNewCardStatusChange}
               value={newCardStatus}>
            </Form.Check> */}

            <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            />
            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove Card...
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
         </div>
         <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalCardAction}
        title="Remove card"
        content={`Are you sure you want to remove <strong>${card.title}</strong>. <br /> All related cards will also be removed!`}
         />
        </div>
        
     )
}

export default Card;
