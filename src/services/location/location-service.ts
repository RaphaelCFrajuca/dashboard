import axios from 'axios';

export const locationRequest = async (token: string | null) => {
  const baseUrl: string = import.meta.env.VITE_API_URL as string;
  const response = await axios.get(`${baseUrl}/is-it-safe/dashboard/location`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return response.data;
};
