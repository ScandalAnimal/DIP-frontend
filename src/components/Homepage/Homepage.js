import Card from '../Common/Card';
import FootballField from '../TeamOverview/FootballField';
import Loader from './Loader';
import React from 'react';
import TeamOverview from '../TeamOverview/TeamOverview';

const Home = () => {
  return (
    <div className='main container homepage'>
      <Loader />
      <div className='row'>
        <div className='col-xl-6 d-flex flex-column'>
          <Card title='Team Overview'>
            <TeamOverview />
          </Card>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
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
