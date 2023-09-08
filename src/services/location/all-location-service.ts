import axios, { AxiosError } from 'axios';
import { baseUrl } from '../../utils/ baseUrl';

export interface PartialLocation {
  id: number;
  name: string;
  endereco: string;
  locationType?: string;
  pendingValidation?: boolean;
  isActive?: boolean;
}

export interface LocationList {
  content: PartialLocation[];
}

export const getAllLocations = async (token: string | null) => {
  const locationListData: LocationList = await axios
    .get(`${baseUrl}/is-it-safe/location/dashboard/find-all`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });

  return locationListData;
};
