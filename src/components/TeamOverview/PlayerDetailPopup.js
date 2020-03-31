import { Modal } from 'react-bootstrap';
import { POSITIONS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import PlayerSmallIcon from './PlayerSmallIcon';
import React, { useState } from 'react';
import playerService from '../../service/playerService';

function PlayerDetailPopup(props) {
  const player = useSelector(state => state.app.selectedPlayer);
  const { currentTeam, removedPlayers } = useSelector(state => state.app.edit);
  const [validationMessage, setValidationMessage] = useState('');
  const [subs, setSubs] = useState([]);
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

  function closeModal() {
    setValidationMessage('');
    setSubs([]);
    props.onHide();
  }

  function onSubClick(sub) {
    makeSubstitution(sub, player);
  }

  function makeSubstitution(on, off) {
    dispatch({
      type: 'MAKE_SUBSTITUTION',
      payload: {
        on: on,
        off: off,
      },
    });
    closeModal();
  }

  function openSubs() {
    let highlightedSubs = [];
    switch (player.element_type) {
      case POSITIONS.GK:
        const on = currentTeam.find(elem => {
          return elem.position > 11 && elem.element_type === POSITIONS.GK;
        });
        makeSubstitution(on, player);
        break;
      case POSITIONS.DF:
        const defs = currentTeam.filter(elem => {
          return elem.position <= 11 && elem.element_type === POSITIONS.DF;
        });
        if (defs.length > 3) {
          highlightedSubs = currentTeam.filter(elem => {
            return elem.position > 11 && elem.element_type !== POSITIONS.GK;
          });
        } else {
          highlightedSubs = currentTeam.filter(elem => {
            return elem.position > 11 && elem.element_type === POSITIONS.DF;
          });
        }
        break;
      case POSITIONS.MF:
        highlightedSubs = currentTeam.filter(elem => {
          return elem.position > 11 && elem.element_type !== POSITIONS.GK;
        });
        break;
      case POSITIONS.FW:
        const fws = currentTeam.filter(elem => {
          return elem.position <= 11 && elem.element_type === POSITIONS.FW;
        });
        if (fws.length > 1) {
          highlightedSubs = currentTeam.filter(elem => {
            return elem.position > 11 && elem.element_type !== POSITIONS.GK;
          });
        } else {
          highlightedSubs = currentTeam.filter(elem => {
            return elem.position > 11 && elem.element_type === POSITIONS.FW;
          });
        }
        break;
      default:
        break;
    }
    const newSubs = [];
    highlightedSubs.forEach(sub => {
      newSubs.push(sub);
    });
    setSubs(newSubs);
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
    closeModal();
  }

  function addToSquadFromRemoved() {
    dispatch({
      type: 'ADD_PLAYER_TO_SQUAD_FROM_REMOVED',
      payload: {
        value: player,
      },
    });
    closeModal();
  }

  function selectAsCaptain() {
    dispatch({
      type: 'SELECT_CAPTAIN',
      payload: {
        value: player,
      },
    });
    closeModal();
  }

  function selectAsViceCaptain() {
    dispatch({
      type: 'SELECT_VICE_CAPTAIN',
      payload: {
        value: player,
      },
    });
    closeModal();
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
            {player.position <= 11 && (
              <div className='row player-detail-popup-button-row'>
                <Button onClick={openSubs} text='Substitute' variant='lightPrimary' />
                {subs.length > 0 && (
                  <div className='player-detail-popup__subs'>
                    {subs.map(sub => {
                      return (
                        <PlayerSmallIcon
                          key={sub.id}
                          player={sub}
                          onClick={() => onSubClick(sub)}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}
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
            {player.is_captain === 'false' && (
              <div className='row player-detail-popup-button-row'>
                <Button onClick={selectAsCaptain} text='Select as captain' variant='lightPrimary' />
              </div>
            )}
            {player.is_vice_captain === 'false' && (
              <div className='row player-detail-popup-button-row'>
                <Button
                  onClick={selectAsViceCaptain}
                  text='Select as vicecaptain'
                  variant='lightPrimary'
                />
              </div>
            )}
            {validationMessage !== '' && (
              <div className='row error-message'>{validationMessage}</div>
            )}
            <div className='row spacing' />
            <div className='row player-detail-popup-button-row'>
              <Button onClick={closeModal} text='Show gamedata' variant='lightPrimary' />
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal} text='Close' variant='lightSecondary' />
      </Modal.Footer>
    </Modal>
  );
}

export default PlayerDetailPopup;
