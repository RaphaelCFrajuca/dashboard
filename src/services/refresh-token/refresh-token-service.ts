import axios from 'axios';

export interface RefreshTokenResponse {
  refresh_token: string;
  token_jwt: string;
  token_type: string;
  user: {
    email: string;
    id: number;
    name: string;
    role: string;
  };
}

const baseUrl = 'https://is-it-safe-api-v2.herokuapp.com';
const headers = {
  'Content-Type': 'application/json',
};

export async function refreshToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  const response = await axios.post<RefreshTokenResponse>(
    `${baseUrl}/is-it-safe/auth/dashboard/refreshtoken`,
    refreshToken,
    { headers }
  );
  return response.data;
}
