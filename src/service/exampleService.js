import axios from 'axios';

const exampleService = {
  async getExample() {
    const endpoint = '/v1/dealer';

    try {
      return await axios(endpoint);
    } catch (error) {
      console.error(error);
    }
  },
};

export default exampleService;
