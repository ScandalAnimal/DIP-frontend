import { API_URL } from '../constants';

const playerService = {
  async getPlayers() {
    try {
      const url = API_URL + '/api/player';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      return await response;
    } catch (e) {
      console.log(e);
      // dispatch(authError('Incorrect Login Info'));
    }
  },
};

export default playerService;
