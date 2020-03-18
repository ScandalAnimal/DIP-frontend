import Card from '../Common/Card';
import Loader from './Loader';
import React, { useEffect } from 'react';
import TeamOverview from '../TeamOverview/TeamOverview';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='main container homepage'>
      <Loader />
      <div className='row'>
        <div className='col-xl-6 d-flex flex-column'>
          <Card title='Team Overview'>
            <TeamOverview />
          </Card>
        </div>
        <div className='col-xl-6 d-flex flex-column'>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Home;
