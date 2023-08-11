import axios from 'axios';

export interface LoginResponse {
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
  username: string;
  password: string;
}

const baseUrl = import.meta.env.VITE_API_URL as string;
const headers = {
  'Content-Type': 'application/json',
};

export async function doLogin(params: LoginParams): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(
    `${baseUrl}/is-it-safe/auth/dashboard/login`,
    params,
    { headers }
  );
  return response.data;
}
