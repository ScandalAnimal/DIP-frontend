import { mockFixtures } from '../../mocks/mockFixtures';
import { mockTeams } from '../../mocks/mockTeams';
import FixtureTableButton from './FixtureTableButton';
import React from 'react';

function renderFixture(fixture) {
  const teams = mockTeams; // TODO replace with API call

  return (
    <div className='fixture-wrapper row'>
      <div className='col-xl-4 text-left'>{teams[fixture.home].name}</div>
      <div className='col-xl-4 text-center'> - </div>
      <div className='col-xl-4 text-right'>{teams[fixture.away].name}</div>
    </div>
  );
}

function renderFixtureHeader(gameWeek) {
  const next = gameWeek >= 38 ? null : gameWeek + 1;
  const prev = gameWeek === 1 ? null : gameWeek - 1;

  return (
    <div className='fixture-header row'>
      <div className='col-xl-4 text-left'>
        <FixtureTableButton onClick={() => {}} text={'Week ' + prev} primary={false} />
      </div>
      <div className='col-xl-4 text-center fixture-header-title'>
        {'Week ' + gameWeek + ' fixtures'}
      </div>
      <div className='col-xl-4 text-right'>
        <FixtureTableButton onClick={() => {}} text={'Week ' + next} primary={false} />
      </div>
    </div>
  );
}

const FixtureTable = () => {
  const fixtures = mockFixtures; // TODO replace with API call
  const gameWeek = 30; // TODO replace with API call

  return (
    <div className='fixtures col'>
      {renderFixtureHeader(gameWeek)}
      {fixtures.map(fixture => {
        return renderFixture(fixture);
      })}
    </div>
  );
};

export default FixtureTable;
