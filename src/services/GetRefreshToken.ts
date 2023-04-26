import axios from 'axios';
export default async function getRefreshToken(refreshToken: string) {
  const headers = {
    Authorization: `Bearer ${refreshToken}`,
  };
  let newRefreshToken: string | null = '';
  await axios
    .post(
      'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/auth/refreshtoken',
      {},
      { headers }
    )
    .then((response) => {
      newRefreshToken = response.data.refresh_token;
      return newRefreshToken;
    })
    .catch((error) => {
      return error;
    });
}
