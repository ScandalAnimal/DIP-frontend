import { WrapperContext } from '../../Wrapper';
import { players } from '../../mocks/mockFootballers';
import PlayerDetailPopup from './PlayerDetailPopup';
import PlayerIcon from './PlayerIcon';
import React, { useContext } from 'react';

function renderPlayers(context) {
  const gks = players.filter(player => player.pos === 'Goalie');
  const defs = players.filter(player => player.pos === 'Defence');
  const mids = players.filter(player => player.pos === 'Midfield');
  const fws = players.filter(player => player.pos === 'Forward');

  return (
    <div className='d-flex flex-column players'>
      <PlayerDetailPopup show={context.modalShow} onHide={() => context.closeModal()} />
      <div className='players-row'>
        {gks.map(player => {
          return <PlayerIcon player={player} key={player.id} />;
        })}
      </div>
      <div className='players-row'>
        {defs.map(player => {
          return <PlayerIcon player={player} key={player.id} />;
        })}
      </div>
      <div className='players-row'>
        {mids.map(player => {
          return <PlayerIcon player={player} key={player.id} />;
        })}
      </div>
      <div className='players-row'>
        {fws.map(player => {
          return <PlayerIcon player={player} key={player.id} />;
        })}
      </div>
    </div>
  );
}

function renderFieldTerrain() {
  return (
    <div className='football-field-terrain'>
      <div className='field' />
      <div className='field ground'>
        <div className='field__texture field__texture--gradient' />
        <div className='field__texture field__texture--gradient-b' />
        <div className='field__texture field__texture--grass' />
        <div className='field__line field__line--goal' />
        <div className='field__line field__line--goal field__line--goal--far' />
        <div className='field__line field__line--outline' />
        <div className='field__line field__line--penalty' />
        <div className='field__line field__line--penalty-arc' />
        <div className='field__line field__line--penalty-arc field__line--penalty-arc--far' />
        <div className='field__line field__line--mid' />
        <div className='field__line field__line--circle' />
        <div className='field__line field__line--penalty field__line--penalty--far' />
      </div>
    </div>
  );
}

const FootballField = () => {
  const context = useContext(WrapperContext);
  return (
    <div className='football-field-wrapper'>
      <div className='football-field-team'>{renderPlayers(context)}</div>
      {renderFieldTerrain()}
    </div>
  );
};

export default FootballField;
