import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PlayerList from './PlayerList';
import React, { useState } from 'react';

const TransferMarket = ({ combinedPlayers }) => {
  const teams = useSelector(state => state.app.teams);
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [filteredPlayers, setFilteredPlayers] = useState(combinedPlayers);

  function renderSelectBoxes() {
    const positions = ['All positions', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
    const teamNames = ['All teams'];

    for (let i = 0; i < teams.length; i++) {
      teamNames.push(teams[i].name);
    }

    function filterPlayers(type, v) {
      let tmpFiltered = [];

      if (type === 1) {
        if (parseInt(v) === 0) {
          tmpFiltered = combinedPlayers;
        } else {
          tmpFiltered = combinedPlayers.filter(item => {
            return parseInt(item.element_type) === parseInt(v);
          });
        }
        if (parseInt(selectedTeam) !== 0) {
          tmpFiltered = tmpFiltered.filter(item => {
            return parseInt(item.team) === parseInt(selectedTeam);
          });
        }
      } else if (type === 2) {
        if (parseInt(v) === 0) {
          tmpFiltered = combinedPlayers;
        } else {
          tmpFiltered = combinedPlayers.filter(item => {
            return parseInt(item.team) === parseInt(v);
          });
        }
        if (parseInt(selectedPosition) !== 0) {
          tmpFiltered = tmpFiltered.filter(item => {
            return parseInt(item.element_type) === parseInt(selectedPosition);
          });
        }
      }

      setFilteredPlayers(tmpFiltered);
    }

    function changePosition(e) {
      const v = e.target.value;
      setSelectedPosition(v);
      filterPlayers(1, v);
    }

    function changeTeam(e) {
      const v = e.target.value;
      setSelectedTeam(v);
      filterPlayers(2, v);
    }
    return (
      <Form>
        <Form.Group
          controlId='transferMarketForm-position'
          className={'d-flex flex-column custom-dropdown'}
        >
          <Form.Label>Position</Form.Label>
          <Form.Control as='select' onChange={changePosition} value={selectedPosition}>
            {positions.map((position, i) => {
              return (
                <option key={position} value={i}>
                  {position}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group
          controlId='transferMarketForm-team'
          className={'d-flex flex-column custom-dropdown'}
        >
          <Form.Label>Team</Form.Label>
          <Form.Control as='select' onChange={changeTeam} value={selectedTeam}>
            {teamNames.map((team, i) => {
              return (
                <option key={team} value={i}>
                  {team}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }

  function renderPlayerList() {
    return <PlayerList filteredPlayers={filteredPlayers} />;
  }

  return (
    <div className='transfer-market'>
      {renderSelectBoxes()}
      {renderPlayerList()}
    </div>
  );
};

export default TransferMarket;
