import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import StatisticsPlayerList from './StatisticsPlayerList';
import playerService from '../../service/playerService';

const StatisticsTable = () => {
  const teams = useSelector(state => state.app.teams);
  const combinedPlayers = useSelector(state => state.app.transferMarketPlayers);
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [selectedSortBy, setSelectedSortBy] = useState(0);
  const [filteredPlayers, setFilteredPlayers] = useState(combinedPlayers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (teams !== null) {
      setLoading(false);
    }
  }, [teams]);

  useEffect(() => {
    setFilteredPlayers(combinedPlayers);
  }, [combinedPlayers]);

  function renderSelectBoxes() {
    const positions = ['All positions', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
    const teamNames = ['All teams'];
    const sortByOptions = ['-', 'Name', 'Selected by', 'Points', 'Bonus points'];

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

    function compareNames(a, b) {
      // Use toUpperCase() to ignore character casing
      const nameA = a.display_name.toUpperCase();
      const nameB = b.display_name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    }

    function sortPlayers(option) {
      if (option === 1) {
        // NAME
        const tmpPlayers = filteredPlayers.map(player => {
          return {
            ...player,
            display_name: playerService.getPlayerName(player) + player.first_name,
          };
        });
        return tmpPlayers.sort(compareNames);
      } else if (option === 2) {
        // SELECTED BY
        const tmpPlayers = filteredPlayers.map(player => {
          return {
            ...player,
          };
        });
        return tmpPlayers.sort((a, b) => {
          return b.selected_by_percent - a.selected_by_percent;
        });
      } else if (option === 3) {
        // POINTS
        const tmpPlayers = filteredPlayers.map(player => {
          return {
            ...player,
          };
        });
        return tmpPlayers.sort((a, b) => {
          return b.total_points - a.total_points;
        });
      } else if (option === 4) {
        // BPS
        const tmpPlayers = filteredPlayers.map(player => {
          return {
            ...player,
          };
        });
        return tmpPlayers.sort((a, b) => {
          return b.bps - a.bps;
        });
      }
      return combinedPlayers;
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

    function changeSortBy(e) {
      const v = e.target.value;
      setSelectedSortBy(v);
      const sortedPlayers = sortPlayers(parseInt(v));
      setFilteredPlayers(sortedPlayers);
    }
    return (
      <div className='all-stats-selectbox-wrapper'>
        <Form>
          <Form.Group
            controlId='allStatsForm-position'
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
            controlId='allStatsForm-team'
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
          <Form.Group
            controlId='allStatsForm-sort'
            className={'d-flex flex-column custom-dropdown'}
          >
            <Form.Label>Sort by</Form.Label>
            <Form.Control as='select' onChange={changeSortBy} value={selectedSortBy}>
              {sortByOptions.map((option, i) => {
                return (
                  <option key={option} value={i}>
                    {option}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
    );
  }

  function renderPlayerList() {
    return <StatisticsPlayerList filteredPlayers={filteredPlayers} />;
  }

  return (
    <div className='all-stats'>
      {!loading && (
        <>
          {renderSelectBoxes()}
          {renderPlayerList()}
        </>
      )}
    </div>
  );
};

export default StatisticsTable;
