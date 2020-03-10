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
        <div className='container player-detail-popup-body'>
          <div className='row show-grid'>{player && player.name}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <PopupButton onClick={props.onHide} text='Confirm' primary={true} />
        <PopupButton onClick={props.onHide} text='Cancel' primary={false} />
      </Modal.Footer>
    </Modal>
  );
}

export default PlayerDetailPopup;
