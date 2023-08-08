import axios from 'axios';

export const userRequest = async (token: string | null) => {
  const response = await axios.get(
    'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/dashboard/user',
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  return response.data;
};
