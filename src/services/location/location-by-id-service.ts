import axios, { AxiosError } from 'axios';

export interface Location {
  id: number;
  name: string;
  endereco: string;
  type: string;
  imgUrl: string;
  cep: string;
  latitude: string;
  longitude: string;
  averageGrade: number;
  reviews: number;
}

export const getLocationById = async (token: string | null, id: number) => {
  const baseUrl: string = import.meta.env.VITE_API_URL as string;
  const locationData: Location = await axios
    .get(`${baseUrl}/is-it-safe/location/dashboard/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });

  return locationData;
};
