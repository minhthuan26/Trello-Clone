import React from 'react'
import { Container as BoostrapContainer, Row, Col } from 'react-bootstrap';
import './BoardBar.scss'
import { useSelector } from 'react-redux';
function BoardBar() {
   const user = useSelector((state) => state.auth.login.currentUser);
   return(
      <div>
         {user ? (
            <nav className="navbar-board">
               <BoostrapContainer className="trello-container">
                  <Row>
                     <Col sm={10} xs={12} className="col-no-padding">
                        <div className="board-info">
                           <div className="item board-logo-icon"><i className="fa fa-coffee" />&nbsp;&nbsp;<strong>Trello Clone</strong></div>
                           <div className="divider"></div>

                           <div className="item board-type">Private Workspace</div>
                           <div className="divider"></div>

                           <div className="item member-avatar">
                              <img src="https://trungquandev.com/wp-content/uploads/2021/01/trungquandev-avatar-2021.jpg" 
                              alt="avatar-trungquandev" title="trungquandev" />
                              <img src="https://trungquandev.com/wp-content/uploads/2018/04/trungquandev-avatar.jpeg" 
                              alt="avatar-trungquandev" title="trungquandev" />
                              <img src="https://trungquandev.com/wp-content/uploads/2019/03/trungquandev-avatar-01-scaled.jpg" 
                              alt="avatar-trungquandev" title="trungquandev" />
                              <img src="https://trungquandev.com/wp-content/uploads/2017/03/aboutme.jpg" 
                              alt="avatar-trungquandev" title="trungquandev" />
                              <img src="https://trungquandev.com/wp-content/uploads/2019/06/trungquandev-cat-avatar.png" 
                              alt="avatar-trungquandev" title="trungquandev" />
                              <span className="more-members">+7</span>
                              <span className="invite">Invite</span>
                           </div>
                        </div>
                     </Col>
                     <Col sm={2} xs={12} className="col-no-padding">
                        <div className="board-actions">
                           <div className="item menu">Show menu</div>
                        </div>
                     </Col>
                  </Row>

               </BoostrapContainer>
            </nav>
         ) : (   
            <>
            </>
         )}
      </div>   
   )
}

export default BoardBar