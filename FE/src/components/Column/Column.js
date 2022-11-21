import React, { useEffect, useState, useRef } from 'react';
import Card from '../Card/Card';
import './Column.scss';
import { mapOrder } from '../../uitilities/sort';
import { Container, Draggable } from 'react-smooth-dnd';
import { Dropdown, Form, Button } from 'react-bootstrap';
import ConfirmModal from '../Common/ConfirmModal';
import { MODAL_ACTION_CONFIRM } from '../../uitilities/constants';
import {
  saveContentAfterPressEnter,
  selectAllInLineText,
} from '../../uitilities/contentEditable';
import { cloneDeep } from 'lodash';
import { createNewCard } from '../../actions/ApiCall';

function Column(props) {
  const { column, onCardDrop, onUpdateColumnState } = props;
  const cards = mapOrder(column.cards, column.cardOrder, column._id);
  // props de lay du lieu tu initialData len

  const [showConfirmModal, setShowCofirmModal] = useState(false);
  const toggleShowConfirmModal = () => setShowCofirmModal(!showConfirmModal);

  const [columnTitle, setColumnTitle] = useState('');
  const handleColumnTitleChange = (e) => setColumnTitle(e.target.value);

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm); //ẩn openNewColumForm

  const newCardTextareaRef = useRef(null);

  const [newCardTitle, setNewCardTitle] = useState('');
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value);

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  //focus con trỏ vào input
  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus();
      newCardTextareaRef.current.select(); //bôi đen sau khi nhập vào input nhưng không nhấn add new column
    }
  }, [openNewCardForm]);

  const onConfirmModalAction = (type) => {
    console.log(type);
    if (type === MODAL_ACTION_CONFIRM) {
      //remove column
      const newColumn = {
        ...column,
        _destroy: true, //remove
      };
      onUpdateColumnState(newColumn);
    }
    toggleShowConfirmModal();
  };

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle,
    };
    onUpdateColumnState(newColumn);
  };

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus();
      return;
    }

    const newCardtoAdd = {
      boardId: column.boardId,
      columnId: column._id,
      title: newCardTitle.trim(),
    };

    //call API create new card
    createNewCard(newCardtoAdd).then((card) => {
      let newColumn = cloneDeep(column);
      newColumn.cards.push(card);
      newColumn.cardOrder.push(card._id);

      onUpdateColumnState(newColumn); //dùng lại hàm onUpdateColumnState cho chức năng thêm mới và cập nhật card vào Column
      setNewCardTitle('');
      toggleOpenNewCardForm();
      window.location.reload(false);
    });
  };

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="trello-content-editable"
            value={columnTitle}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onClick={selectAllInLineText}
            onMouseDown={(e) => e.preventDefault()}
            spellCheck="false"
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            />

            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenNewCardForm}>
                Add Card...
              </Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove Column...
              </Dropdown.Item>
              <Dropdown.Item>Move Card</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          groupName="col"
          onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview',
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {openNewCardForm && (
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              row="3"
              placeholder="Enter card title..."
              className="textarea-enter-new-card"
              ref={newCardTextareaRef} //trỏ đến effect focus trỏ chuột vào input
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(event) => event.key === 'Enter' && addNewCard()}
            />
          </div>
        )}
      </div>
      <footer>
        {openNewCardForm && (
          <div className="add-new-card-actions">
            <Button variant="success" size="sm" onClick={addNewCard}>
              Add Card
            </Button>
            <span className="cancel-icon" onClick={toggleOpenNewCardForm}>
              <i className="fa fa-trash icon"></i>
            </span>
          </div>
        )}

        {!openNewCardForm && (
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <i className="fa fa-plus icon" /> Add another card
          </div>
        )}
      </footer>

      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure you want to remove <strong>${column.title}</strong>. <br /> All related cards will also be removed!`}
      />
    </div>
  );
}

export default Column;
