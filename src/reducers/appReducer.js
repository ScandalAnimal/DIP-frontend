const initialState = {
  loading: false,
  modalShow: false,
  selectedPlayer: null,
  teamId: null,
  allPlayers: null,
  allPlayerIds: null,
  teamPicks: null,
  teams: null,
  allCombinedPlayers: [],
  transferMarketPlayers: [],
  originalTeam: [],
  edit: {
    currentTeam: [],
    removedPlayers: [],
  },
};

export const appReducer = (state = initialState, action) => {
  let removedPlayersArray = undefined;
  let removedPlayersArrayLength = undefined;
  let array = undefined;
  let length = undefined;
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modalShow: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalShow: false,
      };
    case 'SELECT_PLAYER':
      return {
        ...state,
        selectedPlayer: action.payload.value,
      };
    case 'OPEN_PLAYER_INFO':
      return {
        ...state,
        selectedPlayer: action.payload.value,
        modalShow: true,
      };
    case 'SET_TEAM_ID':
      return {
        ...state,
        teamId: action.payload.value,
      };
    case 'SET_ALL_PLAYERS':
      return {
        ...state,
        allPlayers: action.payload.value,
      };
    case 'SET_ALL_PLAYER_IDS':
      return {
        ...state,
        allPlayerIds: action.payload.value,
      };
    case 'SET_TEAM_PICKS':
      return {
        ...state,
        teamPicks: action.payload.value,
      };
    case 'SET_TEAMS':
      return {
        ...state,
        teams: action.payload.value,
      };
    case 'CLEAR':
      window.localStorage.clear();
      return {
        ...initialState,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload.value,
      };
    case 'REMOVE_PLAYER':
      removedPlayersArray = state.edit.removedPlayers;
      removedPlayersArrayLength = removedPlayersArray.length;
      removedPlayersArray[removedPlayersArrayLength] = action.payload.value;

      const currentTeamArray = state.edit.currentTeam;
      const updatedTeam = currentTeamArray.filter(player => {
        return player.id !== action.payload.value.id;
      });
      return {
        ...state,
        edit: {
          ...state.edit,
          currentTeam: updatedTeam,
          removedPlayers: removedPlayersArray,
        },
      };
    case 'MAKE_SUBSTITUTION':
      const on = action.payload.on;
      const off = action.payload.off;
      const onInTeam = state.edit.currentTeam.find(player => {
        return player.id === on.id;
      });
      const offInTeam = state.edit.currentTeam.find(player => {
        return player.id === off.id;
      });
      const withSubs = state.edit.currentTeam.map(player => {
        if (player.position === onInTeam.position) {
          return {
            ...player,
            position: offInTeam.position,
          };
        }
        if (player.position === offInTeam.position) {
          return {
            ...player,
            position: onInTeam.position,
          };
        }
        return player;
      });
      return {
        ...state,
        edit: {
          ...state.edit,
          currentTeam: withSubs,
        },
      };
    case 'ADD_PLAYER_TO_SQUAD_FROM_REMOVED':
      array = state.edit.currentTeam;
      length = array.length;
      array[length] = action.payload.value;

      const team = state.edit.removedPlayers;
      const teamWithRemoved = team.filter(player => {
        return player.id !== action.payload.value.id;
      });
      return {
        ...state,
        edit: {
          ...state.edit,
          currentTeam: array,
          removedPlayers: teamWithRemoved,
        },
      };
    case 'ADD_PLAYER_TO_SQUAD_FROM_TRANSFER_MARKET':
      array = state.edit.currentTeam;
      length = array.length;
      const positions = [];
      array.forEach(item => positions.push(item.position));
      let calculatedPosition = -1;
      for (let i = 1; i <= 15; i++) {
        if (!positions.includes(i)) {
          calculatedPosition = i;
          break;
        }
      }
      const newPlayer = {
        ...action.payload.value,
        position: calculatedPosition,
        is_captain: 'false',
        is_vice_captain: 'false',
      };
      array[length] = newPlayer;
      return {
        ...state,
        transferMarketPlayers: state.transferMarketPlayers.filter(
          player => player.id !== newPlayer.id
        ),
        edit: {
          ...state.edit,
          currentTeam: array,
        },
      };
    case 'SET_CURRENT_TEAM':
      let currentTeam = action.payload.value;
      let market = state.transferMarketPlayers;
      if (market.length > 0) {
        const filteredOutCurrentTeam = [];
        state.transferMarketPlayers.forEach(allPlayer => {
          const allPlayerId = allPlayer.id;
          const result = currentTeam.find(player => player.id === allPlayerId);
          if (!result) {
            filteredOutCurrentTeam.push(allPlayer);
          }
        });
        market = filteredOutCurrentTeam;
      }
      return {
        ...state,
        originalTeam: action.payload.value,
        transferMarketPlayers: market,
        edit: {
          ...state.edit,
          currentTeam: action.payload.value,
        },
      };
    case 'SET_ALL_COMBINED_PLAYERS':
      let transferMarket = action.payload.value;
      if (state.edit.currentTeam.length > 0) {
        const filteredOutCurrentTeam = [];
        action.payload.value.forEach(allPlayer => {
          const allPlayerId = allPlayer.id;
          const result = state.edit.currentTeam.find(player => player.id === allPlayerId);
          if (!result) {
            filteredOutCurrentTeam.push(allPlayer);
          }
        });
        transferMarket = filteredOutCurrentTeam;
      }
      return {
        ...state,
        allCombinedPlayers: action.payload.value,
        transferMarketPlayers: transferMarket,
      };
    case 'RESET_TEAM_CHANGES':
      return {
        ...state,
        transferMarketPlayers: state.allCombinedPlayers,
        edit: {
          ...state.edit,
          currentTeam: state.originalTeam,
          removedPlayers: [],
        },
      };
    case 'SELECT_CAPTAIN':
      const oldTeam = state.edit.currentTeam;
      const newTeam = oldTeam.map(player => {
        if (player.id === action.payload.value.id) {
          return {
            ...player,
            is_captain: 'true',
          };
        } else {
          return {
            ...player,
            is_captain: 'false',
          };
        }
      });
      return {
        ...state,
        edit: {
          ...state.edit,
          currentTeam: newTeam,
        },
      };
    case 'SELECT_VICE_CAPTAIN':
      const oldCurrentTeam = state.edit.currentTeam;
      const newCurrentTeam = oldCurrentTeam.map(player => {
        if (player.id === action.payload.value.id) {
          return {
            ...player,
            is_vice_captain: 'true',
          };
        } else {
          return {
            ...player,
            is_vice_captain: 'false',
          };
        }
      });
      return {
        ...state,
        edit: {
          ...state.edit,
          currentTeam: newCurrentTeam,
        },
      };

    case 'STARTED':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS':
      return {
        ...action.payload,
        loading: false,
        error: false,
      };
    case 'FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
};
