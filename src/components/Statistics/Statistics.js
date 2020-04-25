import Card from '../Common/Card';
import React, { useEffect } from 'react';
import StatisticsTable from './StatisticsTable';
import UnavailablePlayersTable from './UnavailablePlayersTable';

const Statistics = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='main container'>
      <div className='row'>
        <div className='col-xl-12 d-flex flex-column'>
          <Card title='Player statistics'>
            <StatisticsTable />
          </Card>
          <Card title='Unavailable players'>
            <UnavailablePlayersTable />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
