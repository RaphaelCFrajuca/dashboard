import axios from 'axios';

const URL = 'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/dashboard/user';
const jwtToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE2ODQxNzU2NjEsImV4cCI6MTY4NDE3NjU2MX0.LAjNkLJgkGbF9V8b-4HPO5Nv2ht-jUzvIST6VzMxRGBIF_g6S_TiK_dYiysMKhHyLeeLuqDz586CISQ_wJXUuw';
type SexualOrientation = {
  name: string;
  count: number;
};

type DashBoardData = {
  sexual_orientation: SexualOrientation[];
};

export default async function fetchUsersBySexualOrientation() {
  const response: DashBoardData = await axios
    .get(URL, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
    .then((res) => res.data);
  return response.sexual_orientation;
}
