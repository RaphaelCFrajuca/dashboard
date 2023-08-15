import axios, { AxiosError } from 'axios';

interface Review {
  locationId: number;
  locationName: string;
  locationAddress: string;
  review: string;
  impressionStatus: string;
  myGrade: number;
  review_id: number;
}

interface User {
  id: number;
  profilePhoto: string;
  fullName: string;
  nickname: string;
  pronoun: string;
  gender: string;
  orientation: string;
  birthDate: string;
  reviews: Review[];
}

export const getLoggedUser = async (token: string | null) => {
  const baseUrl: string = import.meta.env.VITE_API_URL as string;
  const loggedUserData: User = await axios
    .get(`${baseUrl}/is-it-safe/user/profile`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });

  return loggedUserData;
};
