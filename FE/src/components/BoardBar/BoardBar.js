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
                              <img src="https://img.meta.com.vn/Data/image/2022/05/14/meme-meo-bua-2.jpg" 
                              alt="avatar" title="avatar1" />
                              <img src="https://cafefcdn.com/thumb_w/650/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg" 
                              alt="avatar" title="avatar2" />
                              <img src="https://photo-cms-kienthuc.epicdn.me/zoom/800/uploaded/hoangthao/2022_03_18/bieu-cam-dang-yeu-cua-nhung-con-meo-cung-khien-ban-tan-chay.jpg" 
                              alt="avatar" title="avatar3" />
                              <img src="https://codersera.com/blog/wp-content/uploads/2019/07/BLOG-23-L-3.jpg" 
                              alt="avatar" title="avatar4" />
                              <img src="https://trungquandev.com/wp-content/uploads/2019/06/trungquandev-cat-avatar.png" 
                              alt="avatar" title="avatar5" />
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