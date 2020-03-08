import { Modal } from 'react-bootstrap';
import PopupButton from './PopupButton';
import React from 'react';

function Popup(props) {
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <div className='row show-grid'>
            <div className='col col-xs-12 col-md-8'>
              <code>.col-xs-12 .col-md-8</code>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <PopupButton onClick={props.onHide} text='Confirm' primary={true} />
        <PopupButton onClick={props.onHide} text='Cancel' primary={false} />
      </Modal.Footer>
    </Modal>
  );
}

export default Popup;
