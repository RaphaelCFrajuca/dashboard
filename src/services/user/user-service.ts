import axios from 'axios';

export const userRequest = async (token: string | null) => {
  const baseUrl: string = import.meta.env.VITE_API_URL as string;

  const response = await axios.get(`${baseUrl}/is-it-safe/dashboard/user`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return response.data;
};
