import axios from 'axios';
export default async function getRefreshToken(
  refreshToken: string
): Promise<string> {
  const headers = {
    Authorization: `Bearer ${refreshToken}`,
  };
  let newRefreshToken: string | undefined = undefined;
  await axios
    .post(
      'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/auth/refreshtoken',
      {},
      { headers }
    )
    .then((response) => {
      if (typeof response.data.refresh_token === 'string') {
        newRefreshToken = response.data.refresh_token;
      } else {
        throw new Error('getRefreshToken() did not return a string value');
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
  if (newRefreshToken === undefined) {
    throw new Error('newRefreshToken is undefined');
  }
  return newRefreshToken;
}
