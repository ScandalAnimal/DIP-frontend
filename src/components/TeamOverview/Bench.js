import { WrapperContext } from '../../Wrapper';
import { players } from '../../mocks/mockFootballers';
import PlayerDetailPopup from './PlayerDetailPopup';
import PlayerIcon from './PlayerIcon';
import React, { useContext } from 'react';

function renderPlayers(context) {
  const bench = players.filter(player => player.pos === 'Bench');

  return (
    <div className='d-flex flex-column players'>
      <PlayerDetailPopup show={context.modalShow} onHide={() => context.closeModal()} />
      <div className='players-row'>
        {bench.map(player => {
          return <PlayerIcon player={player} key={player.id} />;
        })}
      </div>
    </div>
  );
}

const Bench = () => {
  const context = useContext(WrapperContext);
  return (
    <div className='bench-wrapper'>
      <div className='bench-players'>{renderPlayers(context)}</div>
    </div>
  );
};

export default Bench;
