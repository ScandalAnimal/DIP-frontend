import { getProposedTransfersAndPredictions } from '../../reducers/appActions';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Common/Card';
import Loader from '../Homepage/Loader';
import OptimizeOptions from './OptimizeOptions';
import ProposedTransfers from '../ProposedTransfers/ProposedTransfers';
import React, { useEffect, useState } from 'react';

const Optimize = () => {
  const [inProgress, setInProgress] = useState(false);
  const [hidden, setHidden] = useState(undefined);
  const [predictionsLoaded, setPredictionsLoaded] = useState(false);
  const { currentTeam } = useSelector(state => state.app.edit);
  const { proposedTeams } = useSelector(state => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function onOptimizeClick(transfers, selectionTechnique, gameWeeks) {
    setInProgress(true);
    setPredictionsLoaded(false);
    dispatch({
      type: 'SET_PROPOSED_TEAMS',
      payload: {
        value: [],
      },
    });
    setHidden(!inProgress);
    const currentTeamIds = getCurrentTeam();
    const options = {
      transfers,
      selectionTechnique,
      gameWeeks,
    };
    getProposedTransfersAndPredictions(dispatch, currentTeamIds, options)
      .then(json => {
        const body = json.data.squads;
        dispatch({
          type: 'SET_LOADING',
          payload: {
            value: false,
          },
        });
        dispatch({
          type: 'SET_PROPOSED_TEAMS',
          payload: {
            value: body,
          },
        });
        setPredictionsLoaded(true);
      })
      .catch(
        e => {
          console.log(e);
        }
        // TODO dispatch error
      );
  }

  function getCurrentTeam() {
    return currentTeam.map(player => {
      return {
        id: player.id,
        sellingPrice: player.selling_price,
        nowCost: player.now_cost,
        purchasePrice: player.purchase_price,
        playerName: player.first_name + '_' + player.second_name,
      };
    });
  }

  return (
    <div className='main container'>
      <div className='row'>
        <div className='col-xl-12 d-flex flex-column'>
          <Card title='Optimization options' hidden={hidden}>
            <OptimizeOptions onClick={onOptimizeClick} />
          </Card>
        </div>
        {inProgress && !predictionsLoaded && (
          <div className='col-xl-12 d-flex flex-column'>
            <Card>
              <Loader />
            </Card>
          </div>
        )}
        {(predictionsLoaded || proposedTeams.length > 0) && (
          <div className='col-xl-12 d-flex flex-column'>
            <Card title='Proposed transfers'>
              <ProposedTransfers />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Optimize;
