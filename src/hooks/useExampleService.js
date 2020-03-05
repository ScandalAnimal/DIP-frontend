import { useEffect, useState } from 'react';
import exampleService from '../service/exampleService';

export const useExampleService = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await exampleService.getExample();
      const responseData = response.data;
      setData(responseData);
    })();
  }, []);
  return [data];
};
