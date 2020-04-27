import { useSelector } from 'react-redux';
import ProposedTransfersCard from './ProposedTransfersCard';
import React from 'react';

function ProposedTransfers() {
  const { proposedTeams } = useSelector(state => state.app);

  if (proposedTeams.length === 0) {
    return null;
  }
  return (
    <>
      <div className='proposed-transfers-description'>
        These are the proposed transfers and captain selections for your current squad.
        <br />
        Below you can also see predicted points improvement. In some cases we provide multiple
        predictions if the proposed results are similar for you to choose.
      </div>
      {proposedTeams.map((team, i) => {
        return <ProposedTransfersCard team={team} key={i} i={i} />;
      })}
    </>
  );
}

export default ProposedTransfers;
