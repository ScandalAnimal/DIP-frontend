import React from 'react';
import playerService from '../../service/playerService';

const PlayerRow = ({ player }) => {
  const name = playerService.getPlayerName(player);
  const points = player.total_points;
  const price = player.now_cost;
  return (
    <div className='player-row row'>
      <div className='col-sm-4 text-left'>{name}</div>
      <div className='col-sm-4 text-center'>{points}</div>
      <div className='col-sm-4 text-right'>{(price / 10).toFixed(1)}</div>
    </div>
  );
};

export default PlayerRow;
