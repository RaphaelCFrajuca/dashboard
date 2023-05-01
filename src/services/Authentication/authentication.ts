import axios from 'axios';

export interface AuthenticateResponse {
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

export interface LoginParams {
  email: string;
  password: string;
}

const baseUrl = 'https://is-it-safe-api-v2.herokuapp.com';

export async function login(
  params: LoginParams
): Promise<AuthenticateResponse> {
  const response = await axios.post<AuthenticateResponse>(
    `${baseUrl}/dashboard/login`,
    params
  );
  return response.data;
}

export async function refreshToken(
  refreshToken: string
): Promise<AuthenticateResponse> {
  const response = await axios.post<AuthenticateResponse>(
    `${baseUrl}/dashboard/refreshtoken`,
    refreshToken
  );
  return response.data;
}
