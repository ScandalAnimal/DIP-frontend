import { useSelector } from 'react-redux';
import React from 'react';

const TeamId = () => {
  const teamId = useSelector(state => state.app.teamId);
  return (
    <div className='header-link'>
      <div>Team ID: {teamId}</div>
    </div>
  );
};

export default TeamId;
