import { getAllPlayerIds, getAllPlayers, getAllTeams } from '../../reducers/appActions';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Common/Card';
import Loader from './Loader';
import React, { useEffect } from 'react';
import TeamOverview from '../TeamOverview/TeamOverview';
import TransferMarket from '../TransferMarket/TransferMarket';

function findPlayerById(allPlayerIds, allPlayers, id) {
  for (let i = 0; i < allPlayerIds.length; i++) {
    const playerId = allPlayerIds[i];
    if (playerId.id === id) {
      for (let j = 0; j < allPlayers.length; j++) {
        const player = allPlayers[j];
        if (
          player.second_name === playerId.second_name &&
          player.first_name === playerId.first_name
        ) {
          return Object.assign(playerId, player);
        }
      }
    }
  }
  return null;
}

const Homepage = () => {
  const dispatch = useDispatch();
  const { teamPicks, allPlayers, allPlayerIds, teams, loading } = useSelector(state => state.app);
  const currentTeam = useSelector(state => state.app.edit.currentTeam);
  const allCombinedPlayers = useSelector(state => state.app.allCombinedPlayers);
  let combinedPlayers = [];
  let combinedAllPlayers = [];

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllPlayers(dispatch);
    getAllPlayerIds(dispatch);
    getAllTeams(dispatch);
  }, []);

  useEffect(() => {
    if (
      allPlayers !== null &&
      allPlayerIds !== null &&
      teams !== null &&
      teamPicks !== null &&
      currentTeam.length === 0 &&
      allCombinedPlayers.length === 0
    ) {
      let players = [];
      for (let i = 0; i < teamPicks.length; i++) {
        const player = Object.assign(
          findPlayerById(allPlayerIds, allPlayers, teamPicks[i].element),
          teamPicks[i]
        );
        players.push(player);
      }
      combinedPlayers = players;
      dispatch({
        type: 'SET_CURRENT_TEAM',
        payload: {
          value: combinedPlayers,
        },
      });

      let playersAll = [];
      for (let i = 0; i < allPlayerIds.length; i++) {
        const player = findPlayerById(allPlayerIds, allPlayers, allPlayerIds[i].id);
        playersAll.push(player);
      }
      combinedAllPlayers = playersAll;
      dispatch({
        type: 'SET_ALL_COMBINED_PLAYERS',
        payload: {
          value: combinedAllPlayers,
        },
      });
    }
  }, [allPlayers, allPlayerIds, teams, teamPicks, currentTeam, allCombinedPlayers]);

  return (
    <div className='main container homepage'>
      {loading ? (
        <Loader />
      ) : (
        <div className='row'>
          <div className='col-xl-6 d-flex flex-column'>
            <Card title='Team Overview'>
              <TeamOverview />
            </Card>
          </div>
          <div className='col-xl-6 d-flex flex-column'>
            <Card title='Transfer Market'>
              <TransferMarket />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
