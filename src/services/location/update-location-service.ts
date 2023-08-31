import axios, { AxiosError } from 'axios';
import { baseUrl } from '../../utils/ baseUrl';
export const updateLocation = async (
  token: string | null,
  formData: FormData,
  id: number
) => {
  const response = await axios
    .put(`${baseUrl}/is-it-safe/location/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => console.log(res))
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });
  return response;
};
