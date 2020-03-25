import { POSITIONS } from '../../constants';
import { useSelector } from 'react-redux';
import Bench from './Bench';
import FootballField from './FootballField';
import React from 'react';
import RemovedPlayers from './RemovedPlayers';

const TeamOverview = () => {
  const currentTeam = useSelector(state => state.app.edit.currentTeam);
  const gks = [];
  const defs = [];
  const mids = [];
  const fwds = [];
  const bench = [];
  let loading = true;

  if (currentTeam !== null) {
    for (let i = 0; i < currentTeam.length; i++) {
      const player = currentTeam[i];
      if (player.position > 11) {
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
          <div className='hint'>
            Hint: You need to have at least 1 GK, 3 DFS and 1 FWD at all times in the FPL.
          </div>
          <FootballField gks={gks} defs={defs} mids={mids} fwds={fwds} />
          <Bench bench={bench} />
          <RemovedPlayers />
        </>
      )}
    </div>
  );
};

export default TeamOverview;
