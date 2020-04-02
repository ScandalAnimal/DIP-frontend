import { useSelector } from 'react-redux';
import React from 'react';
import playerService from '../../service/playerService';

const PlayerRow = ({ player }) => {
  const teams = useSelector(state => state.app.teams);
  const name = playerService.getPlayerName(player);
  const points = player.total_points;
  const price = player.now_cost;
  return (
    <div className='player-row row'>
      <div className='col-xl-3 text-left'>{name}</div>
      <div className='col-xl-3 text-center'>{teams[player.team - 1].shortName}</div>
      <div className='col-xl-3 text-center'>{points}</div>
      <div className='col-xl-3 text-right'>{(price / 10).toFixed(1)}</div>
    </div>
  );
};

export default PlayerRow;
