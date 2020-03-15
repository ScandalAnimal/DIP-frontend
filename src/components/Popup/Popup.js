import { Modal } from 'react-bootstrap';
import Button from '../Button/Button';
import React from 'react';

function Popup(props) {
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <div className='row show-grid'>{props.children}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} text='Confirm' variant='lightPrimary' />
        <Button onClick={props.onHide} text='Cancel' variant='lightSecondary' />
      </Modal.Footer>
    </Modal>
  );
}

export default Popup;
