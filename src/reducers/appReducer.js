const initialState = {
  loading: false,
  modalShow: false,
  selectedPlayer: null,
  teamId: null,
  allPlayers: null,
  allPlayerIds: null,
  teamPicks: null,
  teams: null,
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
      return {
        ...initialState,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload.value,
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
