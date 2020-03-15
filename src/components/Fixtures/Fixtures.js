import Card from '../Common/Card';
import FixtureTable from './FixtureTable';
import React from 'react';

const Fixtures = () => {
  return (
    <div className='main container'>
      <div className='row'>
        <div className='col-xl-12 d-flex flex-column'>
          <Card>
            <FixtureTable />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Fixtures;
