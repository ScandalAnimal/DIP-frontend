import { Button, ButtonToolbar } from 'react-bootstrap';
// import { useParams } from 'react-router';
import Card from '../Common/Card';
import Loader from './Loader';
import Popup from '../Popup/Popup';
import React, { useState } from 'react';

const Home = () => {
  // const params = useParams();
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className='main container homepage'>
      <Loader />
      <ButtonToolbar>
        <Button variant='primary' onClick={() => setModalShow(true)}>
          Launch modal with grid
        </Button>

        <Popup show={modalShow} onHide={() => setModalShow(false)} title='This is a modal' />
      </ButtonToolbar>
      <div className='row'>
        <div className='col-sm-6 d-flex flex-column'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className='col-sm-6 d-flex flex-column'>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Home;
