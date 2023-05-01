import axios from 'axios';
import { refreshToken, RefreshTokenResponse } from './refresh-token-service';

jest.mock('axios');

describe('refreshToken', () => {
  const mockRefreshToken = 'mockRefreshToken';
  const requestMock = axios.post as jest.MockedFunction<typeof axios.post>;
  const baseUrl = 'https://is-it-safe-api-v2.herokuapp.com';

  it('should return a valid RefreshTokenResponse', async () => {
    const mockResponseData: RefreshTokenResponse = {
      refresh_token: 'mockRefreshToken',
      token_jwt: 'mockTokenJWT',
      token_type: 'Bearer',
      user: {
        email: 'test@test.com',
        id: 1,
        name: 'Test User',
        role: 'admin',
      },
    };
    const mockResponse = { data: mockResponseData };

    requestMock.mockResolvedValueOnce(mockResponse);

    const result = await refreshToken(mockRefreshToken);

    expect(result).toEqual(mockResponseData);
    expect(axios.post).toHaveBeenCalledWith(
      `${baseUrl}/is-it-safe/auth/dashboard/refreshtoken`,
      mockRefreshToken,
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Failed to refresh token');
    requestMock.mockRejectedValue(mockError);

    await expect(refreshToken(mockRefreshToken)).rejects.toThrowError(
      mockError
    );
    expect(axios.post).toHaveBeenCalledWith(
      `${baseUrl}/is-it-safe/auth/dashboard/refreshtoken`,
      mockRefreshToken,
      { headers: { 'Content-Type': 'application/json' } }
    );
  });
});
