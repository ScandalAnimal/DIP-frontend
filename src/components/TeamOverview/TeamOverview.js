import { POSITIONS } from '../../constants';
import { useSelector } from 'react-redux';
import Bench from './Bench';
import FootballField from './FootballField';
import React from 'react';

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

const TeamOverview = () => {
  const { teamPicks, allPlayers, allPlayerIds, teams } = useSelector(state => state.app);
  const gks = [];
  const defs = [];
  const mids = [];
  const fwds = [];
  const bench = [];
  let loading = true;

  if (allPlayers !== null && allPlayerIds !== null && teams !== null && teamPicks !== null) {
    for (let i = 0; i < teamPicks.length; i++) {
      const player = Object.assign(
        findPlayerById(allPlayerIds, allPlayers, teamPicks[i].element),
        teamPicks[i]
      );
      if (teamPicks[i].position > 11) {
        bench.push(player);
      } else if (player.element_type === POSITIONS.GK) {
        gks.push(player);
      } else if (player.element_type === POSITIONS.DF) {
        defs.push(player);
      } else if (player.element_type === POSITIONS.MF) {
        mids.push(player);
      } else if (player.element_type === POSITIONS.FW) {
        fwds.push(player);
      }
    }
    loading = false;
  }
  return (
    <div>
      {!loading && (
        <>
          <FootballField gks={gks} defs={defs} mids={mids} fwds={fwds} />
          <Bench bench={bench} />
        </>
      )}
    </div>
  );
};

export default TeamOverview;
