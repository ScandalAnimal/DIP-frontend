import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import playerService from '../../service/playerService';

function PlayerRow({ player, formattedName, i, correctValues }) {
  const dispatch = useDispatch();

  const openPlayerInfo = () => {
    dispatch({
      type: 'OPEN_PLAYER_INFO',
      payload: {
        value: player,
      },
    });
  };
  return (
    <div className='player-row row' onClick={() => openPlayerInfo(player)}>
      <div className='all-projections-id'>{i}</div>
      <div className='all-projections-name'>{formattedName}</div>
      <div className='all-projections-weeks'>
        {correctValues.map((value, j) => {
          return <div key={j}>{value.predicted_points}</div>;
        })}
      </div>
    </div>
  );
}

function ItemList({ items, gameWeekCount }) {
  const allCombinedPlayers = useSelector(state => state.app.allCombinedPlayers);
  const getPlayer = (firstName, secondName) => {
    return allCombinedPlayers.find(
      playerIdObject =>
        playerIdObject.first_name === firstName && playerIdObject.second_name === secondName
    );
  };

  return (
    <>
      <div className='player-row player-row-heading row'>
        <div className='all-projections-id'>#</div>
        <div className='all-projections-name'>Name</div>
        <div className='all-projections-weeks'>
          <div>1 GameWeek ahead</div>
          {gameWeekCount > 1 && <div>2 GameWeeks ahead</div>}
          {gameWeekCount > 2 && <div>3 GameWeeks ahead</div>}
        </div>
      </div>
      {items.map(([name, values], i) => {
        let correctValues = values;
        if (values.length < gameWeekCount) {
          correctValues.push(values[0]);
          if (values.length < gameWeekCount) {
            correctValues.push(values[0]);
          }
        }
        const splitName = name.split('_');
        const player = getPlayer(splitName[0], splitName[1]);
        let formattedName = playerService.getPlayerName(player);
        return (
          <PlayerRow
            player={player}
            key={i}
            i={i}
            formattedName={formattedName}
            correctValues={correctValues}
          />
        );
      })}
    </>
  );
}

function AllProjectionsPlayerList({ players, gameWeekCount }) {
  let perPage = 10;
  let [currentData, setCurrentData] = useState(Object.entries(players).slice(0, perPage));

  useEffect(() => {
    setCurrentData(Object.entries(players).slice(0, perPage));
  }, [players, perPage]);

  const pageCount = Math.ceil(Object.entries(players).length / perPage);

  function handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * perPage);
    setCurrentData(Object.entries(players).slice(offset, offset + perPage));
  }

  return (
    <div className='player-list'>
      <ItemList items={currentData} gameWeekCount={gameWeekCount} />
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

export default AllProjectionsPlayerList;
