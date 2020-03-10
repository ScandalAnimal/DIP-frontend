import { WrapperContext } from '../../Wrapper';
import React, { useContext } from 'react';

const ASSET_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/';

const PlayerIcon = ({ player }) => {
  const context = useContext(WrapperContext);
  const isCaptain = player.captain === true;
  const isViceCaptain = player.viceCaptain === true;
  return (
    <div className='player col' key={player.id}>
      <div className='player__img' onClick={() => context.openPlayerInfo(player)}>
        <img src={ASSET_URL + player.asset} alt='img' />
      </div>
      <div className='player__label'>
        <span>{player.name}</span>
      </div>
      <div className='player__options'>
        {isCaptain && <div className='player__option-captain'>C</div>}
        {isViceCaptain && <div className='player__option-captain'>V</div>}
      </div>
    </div>
  );
};

export default PlayerIcon;
