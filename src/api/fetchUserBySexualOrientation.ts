import axios from 'axios';

const URL = 'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/dashboard/user';
const jwtToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE2ODE3NDQwMTIsImV4cCI6MTY4MTc0NDkxMn0.HV5rEE88g4brK33LkDzQpkIMEBy5dYJHv6mctCXijN-nG4e8iZxTgwYWbCCQiFGPSVx64wdDA62zIxPTUuO4zQ';
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
