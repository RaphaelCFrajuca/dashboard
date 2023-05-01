import axios from 'axios';
import { login, LoginParams, AuthenticateResponse } from './authentication';

jest.mock('axios');

describe('login', () => {
  const requestMock = axios.post as jest.MockedFunction<typeof axios.post>;
  const baseUrl = 'https://is-it-safe-api-v2.herokuapp.com';

  const mockResponse: AuthenticateResponse = {
    refresh_token: '',
    token_jwt: '',
    token_type: '',
    user: {
      email: '',
      id: 0,
      name: '',
      role: '',
    },
  };

  it('should send a POST request to the login endpoint with the provided params', async () => {
    const mockParams: LoginParams = {
      email: 'test@example.com',
      password: 'password',
    };

    requestMock.mockResolvedValueOnce({ data: mockResponse });

    const response = await login(mockParams);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/login`, mockParams);
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error if the login request fails', async () => {
    const mockParams: LoginParams = {
      email: 'test@example.com',
      password: 'password',
    };

    requestMock.mockRejectedValueOnce(new Error('Login failed'));

    await expect(login(mockParams)).rejects.toThrow('Login failed');
  });
});
