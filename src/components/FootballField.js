import { players } from '../mocks/mockFootballers';
import React from 'react';

const ASSET_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/';

function renderPlayerCard(player) {
  return (
    <div className='player__card'>
      <h3>{player.name}</h3>
      <ul className='player__card__list'>
        <li>
          <span>DOB</span>
          <br />
          {player.dob} yr
        </li>
        <li>
          <span>Height</span>
          <br />
          {player.height}
        </li>
        <li>
          <span>Origin</span>
          <br />
          {player.origin}
        </li>
      </ul>
      <ul className='player__card__list player__card__list--last'>
        <li>
          <span>Games</span>
          <br />
          {player.games}
        </li>
        <li>
          <span>Goals</span>
          <br />
          {player.goals}
        </li>
      </ul>
    </div>
  );
}

function renderPlayer(player, side) {
  return (
    <div
      className='player col'
      data-name={player.name}
      data-side={side}
      data-x={player.x}
      data-y={player.y}
    >
      {/*<div className='player__placeholder' />*/}
      {/*{renderPlayerCard(player)}*/}
      <div className='player__img'>
        <img src={ASSET_URL + player.asset} alt='img' />
      </div>
      <div className='player__label'>
        <span>{player.name}</span>
      </div>
    </div>
  );
}

function renderPlayers() {
  const homePlayers = players['home'];
  const awayPlayers = players['away'];
  const gks = players['home'].filter(player => player.pos === 'Goalie');
  const defs = players['home'].filter(player => player.pos === 'Defence');
  const mids = players['home'].filter(player => player.pos === 'Midfield');
  const fws = players['home'].filter(player => player.pos === 'Forward');

  return (
    <div className='d-flex flex-column players'>
      {/*{homePlayers.map(player => {*/}
      {/*  return renderPlayer(player, 'home');*/}
      {/*})}*/}
      {/*{awayPlayers.map(player => {*/}
      {/*  return renderPlayer(player, 'away');*/}
      {/*})}*/}
      <div className='players-row players-row-1'>
        {gks.map(player => {
          // eslint-disable-next-line react/jsx-key
          return renderPlayer(player, 'home');
        })}
      </div>
      <div className='players-row players-row-2'>
        {defs.map(player => {
          // eslint-disable-next-line react/jsx-key
          return renderPlayer(player, 'home');
        })}
      </div>
      <div className='players-row players-row-3'>
        {mids.map(player => {
          // eslint-disable-next-line react/jsx-key
          return renderPlayer(player, 'home');
        })}
      </div>
      <div className='players-row players-row-4'>
        {fws.map(player => {
          // eslint-disable-next-line react/jsx-key
          return renderPlayer(player, 'home');
        })}
      </div>
    </div>
  );
}

const FootballField = () => {
  return (
    <div className='main container'>
      <div className='stage texture'>
        <div
          className='world'
          style={{
            opacity: 1,
            transform: `translateZ(-200px) translateY(0px)`,
          }}
        >
          <div className='team'>{renderPlayers()}</div>
          <div className='terrain'>
            <div className='field field--alt' />
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
            {/*<div className='field__side field__side--front' />*/}
            {/*<div className='field__side field__side--left' />*/}
            {/*<div className='field__side field__side--right' />*/}
            {/*<div className='field__side field__side--back' />*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballField;
