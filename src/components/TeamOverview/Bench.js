import { useDispatch, useSelector } from 'react-redux';
import PlayerDetailPopup from './PlayerDetailPopup';
import PlayerIcon from './PlayerIcon';
import React from 'react';

const Bench = ({ bench }) => {
  const modalShow = useSelector(state => state.app.modalShow);
  const dispatch = useDispatch();

  function closeModal() {
    dispatch({
      type: 'CLOSE_MODAL',
    });
  }
  function renderPlayers() {
    return (
      <div className='d-flex flex-column players'>
        <PlayerDetailPopup show={modalShow} onHide={closeModal} />
        <div className='players-row row'>
          {bench.map(player => {
            return <PlayerIcon player={player} key={player.id} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <div className='bench-wrapper'>
      <div className='bench-players'>{renderPlayers()}</div>
    </div>
  );
};

export default Bench;
