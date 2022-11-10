import React, { useEffect, useState, useRef } from 'react'
import { isEmpty } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import './BoardContent.scss'

import Column from '../Column/Column'
import { initialData } from '../../actions/initialData'

import { mapOrder } from '../../uitilities/sort'
import { applyDrag } from '../../uitilities/dragDrop'

function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm) //ẩn openNewColumForm

    const newColumnInputRef = useRef(null)

    const [newColumnTitle, setNewColumnTitle] = useState('')
    const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

    useEffect(() => {
      const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
      if (boardFromDB) {
        setBoard(boardFromDB)
        setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
      }
    }, [])

    //focus con trỏ vào input
    useEffect(() => {
      if(newColumnInputRef && newColumnInputRef.current){
        newColumnInputRef.current.focus()
        newColumnInputRef.current.select() //bôi đen sau khi nhập vào input nhưng không nhấn add new column
      }
    }, [openNewColumnForm])

    if(isEmpty(board)) {
      return <div className="not-found">Board not found!</div>
    }

    const onColumnDrop = (dropResult) => {
      let newColumns = [...columns]
      newColumns = applyDrag(newColumns, dropResult)

      let newBoards = { ...board }
      newBoards.columnOrder = newColumns.map(c => c.id)
      newBoards.columns = newColumns

      setColumns(newColumns)
      setBoard(newBoards)
    }

    const onCardDrop = (columnId, dropResult) => {
      if(dropResult.removedIndex !== null || dropResult.addedIndex !== null){
        let newColumns = [...columns]

        let currentColumn = newColumns.find(c => c.id === columnId)
        currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
        currentColumn.cardOrder = currentColumn.cards.map(i => i.id)

        setColumns(newColumns)
      }
    }

    const addNewColumn = () => {
      if(!newColumnTitle) {
        newColumnInputRef.current.focus()
        return
      }

      const newColumntoAdd = {
        id: Math.random().toString(36).substring(2, 5), 
        boardId: board.id,
        title: newColumnTitle.trim(),
        cardOrder: [],
        cards: []
      }

      let newColumns = [...columns]
      newColumns.push(newColumntoAdd) //đẩy Column thêm mới vào cuối mảng chứa các Column

      let newBoards = { ...board }
      newBoards.columnOrder = newColumns.map(c => c.id)
      newBoards.columns = newColumns

      setColumns(newColumns)
      setBoard(newBoards)
      setNewColumnTitle('')
      toggleOpenNewColumnForm()
    }

    const onUpdateColumn = (newColumntoUpdate) => {
      const columnIdtoUpdate = newColumntoUpdate.id

      let newColumns = [...columns]
      const columnIndextoUpdate = newColumns.findIndex(i => i.id === columnIdtoUpdate)

      if(newColumntoUpdate._destroy) {
        //remove column
        newColumns.splice(columnIndextoUpdate, 1) //xoa 1 phan tu o vi tri index trong newColumns
      }else {
        //update column
        newColumns.splice(columnIndextoUpdate, 1, newColumntoUpdate) //sau khi xoa 1 phan tu o vi tri index, them lai gia tri column moi
      }

      //sau khi xoa, sua column thi update lai board
      let newBoards = { ...board }
      newBoards.columnOrder = newColumns.map(c => c.id)
      newBoards.columns = newColumns

      setColumns(newColumns)
      setBoard(newBoards)
    }

    return(
      <div className="board-content">
        <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          getChildPayload={index => columns[index]}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'column-drop-preview'
          }}
        >
          {columns.map((column, index) => (
            <Draggable key={index}>
              <Column 
                column={column} 
                onCardDrop={onCardDrop} 
                onUpdateColumn={onUpdateColumn}
              />
            </Draggable>
          ))} 
        </Container>
        
        <BootstrapContainer className="bootstrap-container">
          {!openNewColumnForm &&
            <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon" />  Add another column
            </Col>
            </Row>
          }

          {openNewColumnForm &&
            <Row>
              <Col className="enter-new-column">
                <Form.Control 
                  size="sm" 
                  type="text" 
                  placeholder="Enter column title..."
                  className="input-enter-new-column"
                  ref={newColumnInputRef} //trỏ đến effect focus trỏ chuột vào input
                  value={newColumnTitle}
                  onChange={onNewColumnTitleChange}
                  onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
                />
                <Button variant="success" size="sm" onClick={addNewColumn}>Add Column</Button>
                <span className="cancel-icon" onClick={toggleOpenNewColumnForm}> 
                  <i className="fa fa-trash icon"></i>
                </span>
              </Col>
            </Row>
          }
        </BootstrapContainer>
      </div>
    )
}

export default BoardContent