import { API_URL } from '../constants';

const loginService = {
  async getTeamData(email, password) {
    const data = {
      login: 'mvasilisin@gmail.com',
      password: '0p9J2O75jRkWjVW',
    };

    // TODO
    try {
      console.log('calling BE');
      const url = API_URL + '/api/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      return await response;
    } catch (e) {
      console.log(e);
      // dispatch(authError('Incorrect Login Info'));
    }
  },
};

export default loginService;
