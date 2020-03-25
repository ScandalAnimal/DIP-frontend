import { POSITIONS } from '../../constants';
import Bench from './Bench';
import FootballField from './FootballField';
import React from 'react';

const TeamOverview = ({ combinedPlayers }) => {
  const gks = [];
  const defs = [];
  const mids = [];
  const fwds = [];
  const bench = [];
  let loading = true;

  if (combinedPlayers !== null) {
    for (let i = 0; i < combinedPlayers.length; i++) {
      const player = combinedPlayers[i];
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
          <FootballField gks={gks} defs={defs} mids={mids} fwds={fwds} />
          <Bench bench={bench} />
        </>
      )}
    </div>
  );
};

export default TeamOverview;
