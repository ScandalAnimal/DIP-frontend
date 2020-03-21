import 'rc-slider/assets/index.css';
import Button from '../Button/Button';
import OptimizeSlider from './OptimizeSlider';
import React, { useState } from 'react';

const OptimizeOptions = () => {
  const [transfers, setTransfers] = useState(0);
  const [gameWeek, setGameWeek] = useState(1);
  const [selectionTechnique, setSelectionTechnique] = useState('max');

  function setSelection(event) {
    event.persist();
    setSelectionTechnique(event.target.value);
  }

  return (
    <div className='optimize-options col'>
      <div className='optimize-option-wrapper row'>
        <div className='col-sm-4 text-left'>Transfers:</div>
        <div className='col-sm-8 text-center'>
          <OptimizeSlider setValue={setTransfers} min={0} max={3} withWildcard={true} />
        </div>
      </div>
      <div className='optimize-option-wrapper row'>
        <div className='col-sm-4 text-left'>Selection technique:</div>
        <div className='col-sm-8 text-center'>
          <div className='row d-flex align-items-center'>
            <input
              onChange={setSelection}
              type='radio'
              name='selection-technique'
              value='max'
              id='selection-technique-1'
              checked={selectionTechnique === 'max'}
            />
            <label htmlFor='selection-technique-1'>Maximum predicted points</label>
          </div>
          <div className='row d-flex align-items-center'>
            <input
              onChange={setSelection}
              type='radio'
              name='selection-technique'
              value='total'
              id='selection-technique-2'
              checked={selectionTechnique === 'total'}
            />
            <label htmlFor='selection-technique-2'>Total points so far</label>
          </div>
          <div className='row d-flex align-items-center'>
            <input
              onChange={setSelection}
              type='radio'
              name='selection-technique'
              value='form'
              id='selection-technique-3'
              checked={selectionTechnique === 'form'}
            />
            <label htmlFor='selection-technique-3'>Form</label>
          </div>
        </div>
      </div>

      <div className='optimize-option-wrapper row'>
        <div className='col-sm-4 text-left'>Game weeks:</div>
        <div className='col-sm-8 text-center'>
          <OptimizeSlider setValue={setGameWeek} min={1} max={10} />
        </div>
      </div>
      <div className='row d-flex justify-content-center'>
        <Button onClick={() => {}} text='Optimize' variant='darkPrimary' />
      </div>
      <div className='row justify-content-center'>
        <Button onClick={() => {}} text='Cancel' variant='darkSecondary' />
      </div>
    </div>
  );
};

export default OptimizeOptions;
