import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Dashboard({fakeLogging}) {
  const history = useHistory();
  const submitLogout = useCallback(() => {
    fakeLogging(false);
    history.push('/');
  }, [fakeLogging, history]);

  return (
    <div>
      <Navigation />
      <button onClick={submitLogout}>log out</button>
    </div>
  );
}
