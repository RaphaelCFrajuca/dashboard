import axios from 'axios';

const URL = 'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/dashboard/user';
type SexualOrientation = {
  name: string;
  count: number;
};

type DashBoardData = {
  sexual_orientation: SexualOrientation[];
};

export default async function fetchUsersBySexualOrientation(
  token: string | null
) {
  const response: DashBoardData = await axios
    .get(URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
  return response.sexual_orientation;
}
