import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const PlayerRow = ({ player, selectedSeason }) => {
  return (
    <div className='player-row row'>
      {!selectedSeason && <div className='history-item'>{player.season}</div>}
      <div className='history-item'>{player.gw_index}</div>
      <div className='history-item'>{player.goals_scored}</div>
      <div className='history-item'>{player.assists}</div>
      <div className='history-item'>{player.total_points}</div>
      <div className='history-item'>
        {player.yellow_cards}/{player.red_cards}
      </div>
      <div className='history-item'>{player.saves}</div>
      <div className='history-item'>{player.goals_conceded}</div>
      <div className='history-item'>{player.own_goals}</div>
      <div className='history-item'>{player.clean_sheets}</div>
      <div className='history-item'>{player.bps}</div>
    </div>
  );
};

function ItemList({ items, selectedSeason }) {
  return (
    <>
      <div className='player-row player-row-heading row'>
        {!selectedSeason && <div className='history-item'>Season</div>}
        <div className='history-item'>GW</div>
        <div className='history-item'>Goals</div>
        <div className='history-item'>Assists</div>
        <div className='history-item'>Points</div>
        <div className='history-item'>Y/R Cards</div>
        <div className='history-item'>Saves</div>
        <div className='history-item'>Conceded</div>
        <div className='history-item'>Own goals</div>
        <div className='history-item'>Clean Sheets</div>
        <div className='history-item'>BPS</div>
      </div>
      {items.map((item, i) => {
        return <PlayerRow player={item} key={i} selectedSeason={selectedSeason} />;
      })}
    </>
  );
}

function PlayerHistoryList({ filteredData, selectedSeason }) {
  let perPage = 10;
  let [currentData, setCurrentData] = useState(filteredData.slice(0, perPage));

  useEffect(() => {
    setCurrentData(filteredData.slice(0, perPage));
  }, [filteredData, perPage]);

  const pageCount = Math.ceil(filteredData.length / perPage);

  function handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * perPage);
    setCurrentData(filteredData.slice(offset, offset + perPage));
  }

  return (
    <div className='player-history-table'>
      <ItemList items={currentData} selectedSeason={selectedSeason} />
      <ReactPaginate
        previousClassName={'d-none'}
        nextClassName={'d-none'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'pagination-active'}
      />
    </div>
  );
}

export default PlayerHistoryList;
