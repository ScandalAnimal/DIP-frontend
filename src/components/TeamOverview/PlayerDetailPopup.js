import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import React from 'react';
import playerService from '../../service/playerService';

function PlayerDetailPopup(props) {
  const player = useSelector(state => state.app.selectedPlayer);
  const { currentTeam, removedPlayers } = useSelector(state => state.app.edit);
  const teams = useSelector(state => state.app.teams);
  const dispatch = useDispatch();

  function getTeamName() {
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      if (team.id === parseInt(player.team)) {
        return team.name;
      }
    }
    return null;
  }

  function isPlayerInArray(p, a) {
    let result = false;
    a.map(value => {
      if (value.id === p.id) {
        result = true;
      }
    });
    return result;
  }

  function removeFromSquad() {
    dispatch({
      type: 'REMOVE_PLAYER',
      payload: {
        value: player,
      },
    });
    props.onHide();
  }

  function addToSquadFromRemoved() {
    dispatch({
      type: 'ADD_PLAYER_TO_SQUAD_FROM_REMOVED',
      payload: {
        value: player,
      },
    });
    props.onHide();
  }

  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter' className='player-detail-popup-title'>
          Player Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {player && (
          <div className='container player-detail-popup-body'>
            <div className='row'>
              <div className='col'>Name:</div>
              <div className='col'>{playerService.getPlayerDetailName(player)}</div>
            </div>
            <div className='row'>
              <div className='col'>Team:</div>
              <div className='col'>{getTeamName()}</div>
            </div>
            <div className='row'>
              <div className='col'>Position:</div>
              <div className='col'>{playerService.getPositionLabel(player)}</div>
            </div>
            <div className='row'>
              <div className='col'>Total points:</div>
              <div className='col'>{player.total_points}</div>
            </div>
            <div className='row'>
              <div className='col'>Selected by percent:</div>
              <div className='col'>{player.selected_by_percent + '%'}</div>
            </div>
            <div className='row spacing' />
            <div className='row player-detail-popup-button-row'>
              <Button onClick={props.onHide} text='Substitute' variant='lightPrimary' />
            </div>
            {isPlayerInArray(player, currentTeam) && (
              <div className='row player-detail-popup-button-row'>
                <Button onClick={removeFromSquad} text='Remove from team' variant='lightPrimary' />
              </div>
            )}
            {isPlayerInArray(player, removedPlayers) && (
              <div className='row player-detail-popup-button-row'>
                <Button onClick={addToSquadFromRemoved} text='Add to team' variant='lightPrimary' />
              </div>
            )}
            <div className='row player-detail-popup-button-row'>
              <Button onClick={props.onHide} text='Select as captain' variant='lightPrimary' />
            </div>
            <div className='row player-detail-popup-button-row'>
              <Button onClick={props.onHide} text='Select as vicecaptain' variant='lightPrimary' />
            </div>
            <div className='row spacing' />
            <div className='row player-detail-popup-button-row'>
              <Button onClick={props.onHide} text='Show gamedata' variant='lightPrimary' />
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} text='Close' variant='lightSecondary' />
      </Modal.Footer>
    </Modal>
  );
}

export default PlayerDetailPopup;
