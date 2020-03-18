import Card from '../Common/Card';
import OptimizeOptions from './OptimizeOptions';
import React, { useEffect } from 'react';

const Optimize = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='main container'>
      <div className='row'>
        <div className='col-xl-12 d-flex flex-column'>
          <Card title='Optimization options'>
            <OptimizeOptions />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Optimize;
