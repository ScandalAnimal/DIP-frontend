import { getAllProjections } from '../../reducers/appActions';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import playerService from '../../service/playerService';

const ProjectedPerformanceTable = () => {
  const dispatch = useDispatch();

  const projections = useSelector(state => state.app.projections);
  const allPlayerIds = useSelector(state => state.app.allPlayerIds);
  const { currentTeam, additions } = useSelector(state => state.app.edit);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    getAllProjections(dispatch, 1);
    getAllProjections(dispatch, 2);
    getAllProjections(dispatch, 3);
  }, []);

  useEffect(() => {
    if (projections !== []) {
      setLoading(false);
      setTeamAndPoints();
    }
  }, [projections]);

  useEffect(() => {
    if (projections !== []) {
      setTeamAndPoints();
    }
  }, [currentTeam, additions]);

  const setTeamAndPoints = () => {
    const displayedProjections = projections.find(projection => projection.id === 1);
    if (displayedProjections === undefined) {
      return null;
    }
    const remapped = _.mapValues(_.groupBy(displayedProjections.value, 'player_name'), x =>
      x.map(y => _.omit(y, 'player_name'))
    );

    const team = Object.entries(remapped).filter(([name, value], i) => {
      const splitName = name.split('_');
      const player = getPlayer(splitName[0], splitName[1]);
      return isPlayerInTeam(player.id);
    });

    let tmPoints = 0;
    team.forEach(([name, value], i) => {
      tmPoints += value[0].predicted_points;
    });
    setTotalPoints(tmPoints);
    setTeam(team);
  };

  const openPlayerInfo = player => {
    dispatch({
      type: 'OPEN_PLAYER_INFO',
      payload: {
        value: player,
      },
    });
  };

  const displayHeader = () => {
    return (
      <div className='player-row player-row-heading row'>
        <div className='all-projections-id'>#</div>
        <div className='all-projections-name'>Name</div>
        <div className='all-projections-weeks-single'>Next round</div>
      </div>
    );
  };

  const getPlayer = (firstName, secondName) => {
    return allPlayerIds.find(
      playerIdObject =>
        playerIdObject.first_name === firstName && playerIdObject.second_name === secondName
    );
  };

  const isPlayerInTeam = id => {
    const elem = currentTeam.find(item => item.id === id);
    return elem !== undefined;
  };

  const renderProjectionsTable = () => {
    return (
      <>
        {displayHeader()}
        {team.map(([name, value], i) => {
          const splitName = name.split('_');
          const player = getPlayer(splitName[0], splitName[1]);
          let formattedName = playerService.getPlayerName(player);
          return (
            <div className='player-row row' key={i} onClick={() => openPlayerInfo(player)}>
              <div className='all-projections-id'>{i}</div>
              <div className='all-projections-name'>{formattedName}</div>
              <div className='all-projections-weeks-single'>{value[0].predicted_points}</div>
            </div>
          );
        })}
      </>
    );
  };

  const renderTotalPoints = () => {
    return <div className='all-projections-total'>Total points: {totalPoints}</div>;
  };

  return (
    <div className='all-projections'>
      {!loading && (
        <>
          {renderProjectionsTable()}
          {renderTotalPoints()}
        </>
      )}
    </div>
  );
};

export default ProjectedPerformanceTable;
