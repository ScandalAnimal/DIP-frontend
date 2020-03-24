import { API_URL } from '../constants';
import { mockApiPlayers } from '../mocks/mockApiPlayers';
import { mockLoginResponse } from '../mocks/mockLoginResponse';
import { mockPlayerIds } from '../mocks/mockPlayerIds';
import { mockTeams } from '../mocks/mockTeams';

export function getAllPlayers(dispatch) {
  dispatch({
    type: 'SET_LOADING',
    payload: {
      value: true,
    },
  });
  const url = API_URL + '/api/player';
  // fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => response.json())
  //   .then(json => {
  //     const body = json.data;
  const body = mockApiPlayers.data;
  dispatch({
    type: 'SET_LOADING',
    payload: {
      value: false,
    },
  });
  dispatch({
    type: 'SET_ALL_PLAYERS',
    payload: {
      value: body,
    },
  });
  // })
  // .catch(
  //   e => {
  //     console.log(e);
  //   }
  //   // TODO dispatch error
  // );
}

export function getAllPlayerIds(dispatch) {
  dispatch({
    type: 'SET_LOADING',
    payload: {
      value: true,
    },
  });
  const url = API_URL + '/api/player/ids';
  // fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => response.json())
  //   .then(json => {
  //     const body = json.data;
  const body = mockPlayerIds.data;
  dispatch({
    type: 'SET_LOADING',
    payload: {
      value: false,
    },
  });
  dispatch({
    type: 'SET_ALL_PLAYER_IDS',
    payload: {
      value: body,
    },
  });
  // })
  // .catch(
  //   e => {
  //     console.log(e);
  //   }
  //   TODO dispatch error
  // );
}

export function getAllTeams(dispatch) {
  dispatch({
    type: 'SET_LOADING',
    payload: {
      value: true,
    },
  });
  const url = API_URL + '/api/team';
  // fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => response.json())
  //   .then(json => {
  //     const body = json.data;
  const body = mockTeams.data;
  dispatch({
    type: 'SET_LOADING',
    payload: {
      value: false,
    },
  });
  dispatch({
    type: 'SET_TEAMS',
    payload: {
      value: body,
    },
  });
  // })
  // .catch(
  //   e => {
  //     console.log(e);
  //   }
  //   TODO dispatch error
  // );
}

export function getTeamData(dispatch, history, params, email, password) {
  const data = {
    login: 'mvasilisin@gmail.com',
    password: '0p9J2O75jRkWjVW',
  };
  dispatch({
    type: 'SET_LOADING',
    payload: {
      value: true,
    },
  });

  const url = API_URL + '/api/login';
  // fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then(response => response.json())
  //   .then(json => {
  //     const body = json.data;
  const body = mockLoginResponse.data;
  dispatch({
    type: 'SET_LOADING',
    payload: {
      value: false,
    },
  });
  dispatch({
    type: 'SET_TEAM_ID',
    payload: {
      value: body.teamId,
    },
  });
  dispatch({
    type: 'SET_TEAM_PICKS',
    payload: {
      value: body.myTeam.picks,
    },
  });
  history.push({
    pathname: `/${params.langId}/home`,
  });
  // })
  // .catch(
  //   e => {
  //     console.log('catch');
  //     console.log(e);
  //   }
  //   // TODO dispatch error
  // );
}
