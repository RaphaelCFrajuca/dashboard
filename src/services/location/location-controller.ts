import axios from 'axios';

export const locationController = async (token: string | null) => {
  const baseUrl: string = import.meta.env.VITE_API_URL as string;
  const response = await axios.get(
    `${baseUrl}/is-it-safe/location/dashboard/find-all`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  return response.data;
};
