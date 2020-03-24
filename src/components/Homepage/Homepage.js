import { getAllPlayerIds, getAllPlayers, getAllTeams } from '../../reducers/appActions';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Common/Card';
import Loader from './Loader';
import React, { useEffect } from 'react';
import TeamOverview from '../TeamOverview/TeamOverview';

const Homepage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.app);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllPlayers(dispatch);
    getAllPlayerIds(dispatch);
    getAllTeams(dispatch);
  }, []);

  return (
    <div className='main container homepage'>
      {loading ? (
        <Loader />
      ) : (
        <div className='row'>
          <div className='col-sm-6 d-flex flex-column'>
            <Card title='Team Overview'>
              <TeamOverview />
            </Card>
          </div>
          <div className='col-sm-6 d-flex flex-column'>
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
