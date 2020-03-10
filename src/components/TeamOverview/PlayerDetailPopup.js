import { Modal } from 'react-bootstrap';
import { WrapperContext } from '../../Wrapper';
import PopupButton from '../Popup/PopupButton';
import React, { useContext } from 'react';

function PlayerDetailPopup(props) {
  const context = useContext(WrapperContext);

  const player = context.selectedPlayer;
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter' className='player-detail-popup-title'>
          Player Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {player && (
          <div className='container player-detail-popup-body'>
            <div className='row'>
              <div className='col'>Name:</div>
              <div className='col'>{player.name}</div>
            </div>
            <div className='row'>
              <div className='col'>Position:</div>
              <div className='col'>{player.pos}</div>
            </div>
            <div className='row'>
              <div className='col'>Games played:</div>
              <div className='col'>{player.games}</div>
            </div>
            <div className='row'>
              <div className='col'>Points per game:</div>
              <div className='col'>{player.goals}</div>
            </div>
            <div className='row spacing' />
            <div className='row player-detail-popup-button-row'>
              <PopupButton onClick={props.onHide} text='Substitute' primary={true} />
            </div>
            <div className='row player-detail-popup-button-row'>
              <PopupButton onClick={props.onHide} text='Remove from team' primary={true} />
            </div>
            <div className='row player-detail-popup-button-row'>
              <PopupButton onClick={props.onHide} text='Select as captain' primary={true} />
            </div>
            <div className='row player-detail-popup-button-row'>
              <PopupButton onClick={props.onHide} text='Select as vicecaptain' primary={true} />
            </div>
            <div className='row spacing' />
            <div className='row player-detail-popup-button-row'>
              <PopupButton onClick={props.onHide} text='Show gamedata' primary={true} />
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <PopupButton onClick={props.onHide} text='Close' primary={false} />
      </Modal.Footer>
    </Modal>
  );
}

export default PlayerDetailPopup;
