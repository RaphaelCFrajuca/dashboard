import axios from 'axios';

export const locationRequest = async (token: string | null) => {
  const response = await axios.get(
    'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/dashboard/location',
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  return response.data;
};
