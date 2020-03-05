import { Button, Modal } from 'react-bootstrap';
import React from 'react';

function Popup(props) {
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton>
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
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Popup;
