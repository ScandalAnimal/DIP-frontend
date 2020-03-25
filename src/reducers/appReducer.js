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
  originalTeam: [],
  edit: {
    currentTeam: [],
    removedPlayers: [],
  },
};

export const appReducer = (state = initialState, action) => {
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
      const removedPlayersArray = state.edit.removedPlayers;
      const removedPlayersArrayLength = removedPlayersArray.length;
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
    case 'ADD_PLAYER_TO_SQUAD_FROM_REMOVED':
      const array = state.edit.currentTeam;
      const length = array.length;
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
    case 'SET_CURRENT_TEAM':
      return {
        ...state,
        originalTeam: action.payload.value,
        edit: {
          ...state.edit,
          currentTeam: action.payload.value,
        },
      };
    case 'SET_ALL_COMBINED_PLAYERS':
      return {
        ...state,
        allCombinedPlayers: action.payload.value,
      };
    case 'RESET_TEAM_CHANGES':
      return {
        ...state,
        edit: {
          ...state.edit,
          currentTeam: state.originalTeam,
          removedPlayers: [],
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
