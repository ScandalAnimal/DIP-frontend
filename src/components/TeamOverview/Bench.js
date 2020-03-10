import { WrapperContext } from '../../Wrapper';
import { players } from '../../mocks/mockFootballers';
import PlayerDetailPopup from './PlayerDetailPopup';
import React, { useContext } from 'react';

const ASSET_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/';

function renderPlayer(player, context) {
  return (
    <div className='player col' key={player.id}>
      <div className='player__img' onClick={() => context.openPlayerInfo(player)}>
        <img src={ASSET_URL + player.asset} alt='img' />
      </div>
      <div className='player__label'>
        <span>{player.name}</span>
      </div>
    </div>
  );
}

function renderPlayers(context) {
  const bench = players.filter(player => player.pos === 'Bench');

  return (
    <div className='d-flex flex-column players'>
      <PlayerDetailPopup show={context.modalShow} onHide={() => context.closeModal()} />
      <div className='players-row'>
        {bench.map(player => {
          return renderPlayer(player, context);
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
