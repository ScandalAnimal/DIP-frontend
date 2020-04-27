import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import playerService from '../../service/playerService';

const ProposedTransfersCard = ({ team, i }) => {
  const { currentTeam } = useSelector(state => state.app.edit);
  const { allCombinedPlayers } = useSelector(state => state.app);
  const [playersToRemove, setPlayersToRemove] = useState([]);
  const [playersToAdd, setPlayersToAdd] = useState([]);
  const dispatch = useDispatch();
  // TODO change
  const mockOriginalPoints = 40;
  const mockSuggestedPoints = 55;

  useEffect(() => {
    const newTeamIds = team.team;
    const oldTeamIds = currentTeam.map(player => player.id);

    const newIdsFiltered = newTeamIds.filter(id => oldTeamIds.indexOf(id) === -1);
    const oldIdsFiltered = oldTeamIds.filter(id => newTeamIds.indexOf(id) === -1);

    setPlayersToRemove(oldIdsFiltered);
    setPlayersToAdd(newIdsFiltered);
  }, []);

  function getPlayerById(id) {
    return allCombinedPlayers.find(player => player.id === id);
  }

  const openPlayerInfo = player => {
    dispatch({
      type: 'OPEN_PLAYER_INFO',
      payload: {
        value: player,
      },
    });
  };

  function getPlayer(id, i = 0) {
    const player = getPlayerById(id);
    return (
      <div
        className='player-row'
        key={i}
        onClick={() => {
          openPlayerInfo(player);
        }}
      >
        {playerService.getPlayerName(player)}
      </div>
    );
  }

  return (
    <>
      <div className='proposed-transfers-card__index'>Option {i + 1}</div>
      <div className='proposed-transfers-card__wrapper'>
        <div className='proposed-transfers-card__row'>
          <div className='proposed-transfers-card__item'>
            <div className='proposed-transfers-card__title'>Transfers in</div>
            {playersToAdd.map((id, i) => {
              return getPlayer(id, i);
            })}
          </div>
          <div className='proposed-transfers-card__item'>
            <div className='proposed-transfers-card__title'>Transfers out</div>
            {playersToRemove.map((id, i) => {
              return getPlayer(id, i);
            })}
          </div>
        </div>
        <hr />
        <div className='proposed-transfers-card__row'>
          <div className='proposed-transfers-card__item'>
            <div className='proposed-transfers-card__title'>Captain</div>
            {getPlayer(team.captain)}
          </div>
          <div className='proposed-transfers-card__item'>
            <div className='proposed-transfers-card__title'>Vice-captain</div>
            {getPlayer(team.viceCaptain)}
          </div>
        </div>
        <hr />
        <div className='proposed-transfers-card__row'>
          <div className='proposed-transfers-card__item'>
            <div className='proposed-transfers-card__title'>Original team predicted points</div>
            <div className='proposed-transfers-card__number'>{mockOriginalPoints}</div>
          </div>
          <div className='proposed-transfers-card__item'>
            <div className='proposed-transfers-card__title'>Suggested team predicted points</div>
            <div className='proposed-transfers-card__number'>{mockSuggestedPoints}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposedTransfersCard;
