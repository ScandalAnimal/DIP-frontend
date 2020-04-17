import { Form } from 'react-bootstrap';
import { getAllProjections } from '../../reducers/appActions';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import playerService from '../../service/playerService';

const AllProjectionsTable = () => {
  const dispatch = useDispatch();

  const projections = useSelector(state => state.app.projections);
  const allPlayerIds = useSelector(state => state.app.allPlayerIds);
  const [loading, setLoading] = useState(true);
  const [gameWeekCount, setGameWeekCount] = useState(1);
  const [displayedProjections, setDisplayedProjections] = useState(null);

  useEffect(() => {
    getAllProjections(dispatch, 1);
    getAllProjections(dispatch, 2);
    getAllProjections(dispatch, 3);
  }, []);

  useEffect(() => {
    if (projections !== []) {
      setLoading(false);
      setDisplayedProjections(projections.find(projection => projection.id === gameWeekCount));
    }
  }, [projections]);

  function renderSelectBoxes() {
    const gameWeekCounts = ['1', '2', '3'];

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

  const renderProjectionsTable = () => {
    if (displayedProjections === undefined) {
      return null;
    }
    // TODO remove this and show all players
    const a = displayedProjections.value.slice(0, 80);
    const remapped = _.mapValues(_.groupBy(a, 'player_name'), x =>
      x.map(y => _.omit(y, 'player_name'))
    );

    return (
      <>
        {displayHeader()}
        {Object.entries(remapped).map(([name, values], i) => {
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
            <div className='player-row row' key={i}>
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
