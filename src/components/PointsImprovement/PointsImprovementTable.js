import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import playerService from '../../service/playerService';

const PointsImprovementTable = () => {
  const dispatch = useDispatch();
  const projections = useSelector(state => state.app.projections);
  const allCombinedPlayers = useSelector(state => state.app.allCombinedPlayers);
  const originalTeam = useSelector(state => state.app.originalTeam);
  const { currentTeam, additions } = useSelector(state => state.app.edit);
  const [loading, setLoading] = useState(true);
  const [totalPointsOld, setTotalPointsOld] = useState(0);
  const [totalPointsNew, setTotalPointsNew] = useState(0);
  const [teamOld, setTeamOld] = useState([]);
  const [teamNew, setTeamNew] = useState([]);

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

    const current = Object.entries(remapped).filter(([name, value], i) => {
      const splitName = name.split('_');
      const player = getPlayer(splitName[0], splitName[1]);
      return isPlayerInCurrentTeam(player.id);
    });

    const original = Object.entries(remapped).filter(([name, value], i) => {
      const splitName = name.split('_');
      const player = getPlayer(splitName[0], splitName[1]);
      return isPlayerInOriginalTeam(player.id);
    });

    let tmPoints = 0;
    current.forEach(([name, value], i) => {
      const splitName = name.split('_');
      const player = getPlayer(splitName[0], splitName[1]);
      const isCaptain = player.is_captain === 'true';
      const isViceCaptain = player.is_vice_captain === 'true';
      tmPoints +=
        isCaptain || isViceCaptain ? value[0].predicted_points * 2 : value[0].predicted_points;
    });
    setTotalPointsNew(tmPoints);
    tmPoints = 0;
    original.forEach(([name, value], i) => {
      const splitName = name.split('_');
      const player = getPlayer(splitName[0], splitName[1]);
      const isCaptain = player.is_captain === 'true';
      const isViceCaptain = player.is_vice_captain === 'true';
      tmPoints +=
        isCaptain || isViceCaptain ? value[0].predicted_points * 2 : value[0].predicted_points;
    });
    setTotalPointsOld(tmPoints);
    setTeamNew(current);
    setTeamOld(original);
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
        <div className='all-projections-name'>Name</div>
        <div className='all-projections-weeks-single'>Next round</div>
      </div>
    );
  };

  const getPlayer = (firstName, secondName) => {
    return allCombinedPlayers.find(
      playerIdObject =>
        playerIdObject.first_name === firstName && playerIdObject.second_name === secondName
    );
  };

  const isPlayerInCurrentTeam = id => {
    const elem = currentTeam.find(item => item.id === id);
    return elem !== undefined;
  };

  const isPlayerInOriginalTeam = id => {
    const elem = originalTeam.find(item => item.id === id);
    return elem !== undefined;
  };

  const renderProjectionsTable = team => {
    return (
      <>
        {displayHeader()}
        {team.map(([name, value], i) => {
          const splitName = name.split('_');
          const player = getPlayer(splitName[0], splitName[1]);
          const isCaptain = player.is_captain === 'true';
          const isViceCaptain = player.is_vice_captain === 'true';
          const points =
            isCaptain || isViceCaptain ? value[0].predicted_points * 2 : value[0].predicted_points;
          let formattedName = playerService.getPlayerName(player);
          return (
            <div className='player-row row' key={i} onClick={() => openPlayerInfo(player)}>
              <div className='all-projections-name'>
                {formattedName} {isCaptain && `(C)`}
                {isViceCaptain && `(V)`}
              </div>
              <div className='all-projections-weeks-single'>{points}</div>
            </div>
          );
        })}
      </>
    );
  };

  const renderTotalPoints = totalPoints => {
    return <div className='all-projections-total'>Total points: {totalPoints}</div>;
  };

  return (
    <div className='points-improvement__wrapper'>
      {!loading && (
        <div className='points-improvement__row'>
          <div className='points-improvement__col'>
            <div className='points-improvement__title'>Original</div>
            {renderTotalPoints(totalPointsOld)}
            {renderProjectionsTable(teamOld)}
          </div>
          <div className='points-improvement__col'>
            <div className='points-improvement__title'>Current</div>
            {renderTotalPoints(totalPointsNew)}
            {renderProjectionsTable(teamNew)}
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsImprovementTable;
