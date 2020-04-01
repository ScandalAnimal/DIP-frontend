import { POSITIONS } from '../../constants';
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

  function sortBench() {
    const newBench = [];
    const gk = bench.find(player => player.element_type === POSITIONS.GK);
    if (gk !== undefined) {
      newBench.push(gk);
    }
    bench.forEach(player => {
      if (player.element_type !== POSITIONS.GK) {
        newBench.push(player);
      }
    });
    return newBench;
  }

  const sortedBench = sortBench();
  function renderPlayers() {
    return (
      <div className='d-flex flex-column players'>
        <PlayerDetailPopup show={modalShow} onHide={closeModal} />
        <div className='players-row row'>
          {sortedBench.map(player => {
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
