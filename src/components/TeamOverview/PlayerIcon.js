import { useDispatch } from 'react-redux';
import React from 'react';
import kitLogoService from '../../service/kitLogoService';
import playerService from '../../service/playerService';

const PlayerIcon = ({ player }) => {
  const dispatch = useDispatch();
  const isCaptain = player.is_captain === 'true';
  const isViceCaptain = player.is_vice_captain === 'true';
  const name = playerService.getPlayerName(player);

  console.log(player.team);
  const openPlayerInfo = () => {
    dispatch({
      type: 'OPEN_PLAYER_INFO',
      payload: {
        value: player,
      },
    });
  };
  return (
    <div className='player col' key={player.id}>
      {player.team !== undefined && (
        <>
          <div className='player__img' onClick={openPlayerInfo}>
            <img src={kitLogoService.getTeamKit(parseInt(player.team))} alt='img' />
          </div>
          <div className='player__label'>
            <span>{name}</span>
          </div>
          <div className='player__options'>
            {isCaptain && <div className='player__option-captain'>C</div>}
            {isViceCaptain && <div className='player__option-captain'>V</div>}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerIcon;
