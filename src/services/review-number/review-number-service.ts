import axios, { AxiosError } from 'axios';

export const reviewNumberRequest = async (token: string | null) => {
  const response = await axios
    .get(
      'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/dashboard/review',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });

  return response;
};
