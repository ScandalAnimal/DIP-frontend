import Card from '../Common/Card';
import Loader from '../Homepage/Loader';
import OptimizeOptions from './OptimizeOptions';
import React, { useEffect, useState } from 'react';

const Optimize = () => {
  const [inProgress, setInProgress] = useState(false);
  const [hidden, setHidden] = useState(undefined);
  const [predictionsLoaded, setPredictionsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function onOptimizeClick(transfers, selectionTechnique, gameWeeks) {
    setInProgress(true);
    setHidden(!inProgress);
    // TODO replace with real call
    setTimeout(afterLoad, 2000);
  }

  function afterLoad() {
    setPredictionsLoaded(true);
    /* TODO remove loading
       TODO display all prediction variants
       TODO every variant is a card that shows proposed transfers: basic list of INs and OUTs
       TODO on the bottom of variant it shows proposed points, and how much of an increase
       TODO add real data when BE is ready
     */
  }

  return (
    <div className='main container'>
      <div className='row'>
        <div className='col-xl-12 d-flex flex-column'>
          <Card title='Optimization options' hidden={hidden}>
            <OptimizeOptions onClick={onOptimizeClick} />
          </Card>
        </div>
        {inProgress && (
          <div className='col-xl-12 d-flex flex-column'>
            <Card>
              <Loader />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Optimize;
