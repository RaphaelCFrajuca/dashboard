import axios, { AxiosError } from 'axios';

export const reviewNumberRequest = async (token: string | null) => {
  const baseUrl: string = import.meta.env.VITE_API_URL as string;
  const response = await axios
    .get(`${baseUrl}/is-it-safe/dashboard/review`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });

  return response;
};
