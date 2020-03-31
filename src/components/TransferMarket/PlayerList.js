import PlayerRow from './PlayerRow';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function ItemList({ items }) {
  return (
    <>
      <div className='player-row player-row-heading row'>
        <div className='col-xl-4 text-left'>Name</div>
        <div className='col-xl-4 text-center'>Points</div>
        <div className='col-xl-4 text-right'>Price</div>
      </div>
      {items.map((item, i) => {
        return <PlayerRow player={item} key={i} />;
      })}
    </>
  );
}

function PlayerList({ filteredPlayers }) {
  let perPage = 10;
  let [currentData, setCurrentData] = useState(filteredPlayers.slice(0, perPage));

  useEffect(() => {
    setCurrentData(filteredPlayers.slice(0, perPage));
  }, [filteredPlayers]);

  const pageCount = Math.ceil(filteredPlayers.length / perPage);

  function handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * perPage);
    setCurrentData(filteredPlayers.slice(offset, offset + perPage));
  }

  return (
    <div className='player-list'>
      <ItemList items={currentData} />
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

export default PlayerList;
