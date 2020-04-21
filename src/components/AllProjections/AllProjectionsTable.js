import { Form } from 'react-bootstrap';
import { getAllProjections } from '../../reducers/appActions';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import playerService from '../../service/playerService';

const AllProjectionsTable = () => {
  const dispatch = useDispatch();

  const teams = useSelector(state => state.app.teams);
  const projections = useSelector(state => state.app.projections);
  const allPlayerIds = useSelector(state => state.app.allPlayerIds);
  const [loading, setLoading] = useState(true);
  const [gameWeekCount, setGameWeekCount] = useState(1);
  const [displayedProjections, setDisplayedProjections] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(0);
  const combinedPlayers = useSelector(state => state.app.allCombinedPlayers);

  useEffect(() => {
    getAllProjections(dispatch, 1);
    getAllProjections(dispatch, 2);
    getAllProjections(dispatch, 3);
  }, []);

  useEffect(() => {
    if (projections !== []) {
      setLoading(false);
      const x = projections.find(projection => projection.id === gameWeekCount);
      const remapped = _.mapValues(_.groupBy(x.value, 'player_name'), x =>
        x.map(y => _.omit(y, 'player_name'))
      );
      setDisplayedProjections(remapped);
    }
  }, [projections]);

  function renderSelectBoxes() {
    const positions = ['All positions', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
    const teamNames = ['All teams'];
    const gameWeekCounts = ['1', '2', '3'];

    for (let i = 0; i < teams.length; i++) {
      teamNames.push(teams[i].name);
    }

    function filterPlayers(type, v) {
      let combined = projections.find(projection => projection.id === gameWeekCount);
      const remapped = _.mapValues(_.groupBy(combined.value, 'player_name'), x =>
        x.map(y => _.omit(y, 'player_name'))
      );

      let tmpFiltered = [];

      if (type === 1) {
        if (parseInt(v) === 0) {
          tmpFiltered = remapped;
        } else {
          tmpFiltered = Object.entries(remapped).filter(([name, values]) => {
            const player = combinedPlayers.find(item => {
              let p = item.first_name + '_' + item.second_name;
              return p === name;
            });
            return parseInt(player.element_type) === parseInt(v);
          });
        }
        if (parseInt(selectedTeam) !== 0) {
          tmpFiltered = tmpFiltered.filter(([name, values]) => {
            const player = combinedPlayers.find(item => {
              let p = item.first_name + '_' + item.second_name;
              return p === name;
            });
            return parseInt(player.team) === parseInt(selectedTeam);
          });
        }
      } else if (type === 2) {
        if (parseInt(v) === 0) {
          tmpFiltered = remapped;
        } else {
          tmpFiltered = Object.entries(remapped).filter(([name, values]) => {
            const player = combinedPlayers.find(item => {
              let p = item.first_name + '_' + item.second_name;
              return p === name;
            });
            return parseInt(player.team) === parseInt(v);
          });
        }
        if (parseInt(selectedPosition) !== 0) {
          tmpFiltered = tmpFiltered.filter(([name, values]) => {
            const player = combinedPlayers.find(item => {
              let p = item.first_name + '_' + item.second_name;
              return p === name;
            });
            return parseInt(player.element_type) === parseInt(selectedPosition);
          });
        }
      }

      let reduced = {};
      tmpFiltered.forEach(item => {
        reduced[item[0]] = [item[1][0]];
      });
      setDisplayedProjections(reduced);
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

    function changeGameWeekCount(e) {
      const v = e.target.value;
      setGameWeekCount(v);
      setDisplayedProjections(projections.find(projection => projection.id === parseInt(v)));
    }

    return (
      <div className='all-projections-selectbox-wrapper'>
        <Form>
          <Form.Group
            controlId='allProjectionsForm-gameweekCount'
            className={'d-flex flex-column custom-dropdown'}
          >
            <Form.Label>GameWeeks</Form.Label>
            <Form.Control as='select' onChange={changeGameWeekCount} value={gameWeekCount}>
              {gameWeekCounts.map((gw, i) => {
                return (
                  <option key={gw} value={i + 1}>
                    {gw}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group
            controlId='allProjectionsForm-position'
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
            controlId='allProjectionsForm-team'
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
      </div>
    );
  }

  const displayHeader = () => {
    return (
      <div className='player-row player-row-heading row'>
        <div className='all-projections-id'>#</div>
        <div className='all-projections-name'>Name</div>
        <div className='all-projections-weeks'>
          <div>1 GameWeek ahead</div>
          {gameWeekCount > 1 && <div>2 GameWeeks ahead</div>}
          {gameWeekCount > 2 && <div>3 GameWeeks ahead</div>}
        </div>
      </div>
    );
  };

  const getPlayer = (firstName, secondName) => {
    return allPlayerIds.find(
      playerIdObject =>
        playerIdObject.first_name === firstName && playerIdObject.second_name === secondName
    );
  };

  const openPlayerInfo = player => {
    dispatch({
      type: 'OPEN_PLAYER_INFO',
      payload: {
        value: player,
      },
    });
  };

  const renderProjectionsTable = () => {
    if (displayedProjections === undefined) {
      return null;
    }
    return (
      <>
        {displayHeader()}
        {Object.entries(displayedProjections).map(([name, values], i) => {
          let correctValues = values;
          if (values.length < gameWeekCount) {
            correctValues.push(values[0]);
            if (values.length < gameWeekCount) {
              correctValues.push(values[0]);
            }
          }
          const splitName = name.split('_');
          const player = getPlayer(splitName[0], splitName[1]);
          let formattedName = playerService.getPlayerName(player);
          return (
            <div className='player-row row' key={i} onClick={() => openPlayerInfo(player)}>
              <div className='all-projections-id'>{i}</div>
              <div className='all-projections-name'>{formattedName}</div>
              <div className='all-projections-weeks'>
                {correctValues.map((value, j) => {
                  return <div key={j}>{value.predicted_points}</div>;
                })}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className='all-projections'>
      {!loading && (
        <>
          {renderSelectBoxes()}
          {renderProjectionsTable()}
        </>
      )}
    </div>
  );
};

export default AllProjectionsTable;
