import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import PlayerIcon from './PlayerIcon';
import React from 'react';

const RemovedPlayers = () => {
  const removedPlayers = useSelector(state => state.app.edit.removedPlayers);
  const dispatch = useDispatch();

  function resetChanges() {
    dispatch({
      type: 'RESET_TEAM_CHANGES',
    });
  }

  function renderPlayers() {
    return (
      <div className='d-flex flex-column players'>
        <div className='subtitle'>Removed players: </div>
        <div className='removed-players-row row'>
          {removedPlayers.map(player => {
            return <PlayerIcon player={player} key={player.id} />;
          })}
        </div>
        <div className='reset-changes-wrapper'>
          <Button onClick={resetChanges} text='Reset changes' variant='darkPrimary' />
        </div>
      </div>
    );
  }

  return (
    <div className='removed-wrapper'>
      {removedPlayers.length > 0 && <div className='removed-players'>{renderPlayers()}</div>}
    </div>
  );
};

export default RemovedPlayers;
