import axios from 'axios';
import getRefreshToken from './GetRefreshToken';

jest.mock('axios'); // Mock axios module

describe('getRefreshToken', () => {
  const mockToken = 'mockToken';
  const mockResponse = {
    data: {
      refresh_token: 'newMockToken',
    },
  };

  beforeEach(() => {
    jest.resetAllMocks(); // Reset all mocks before each test
  });

  it('should return a new refresh token if the request is successful', async () => {
    // Mock the axios post method to return the new refresh token
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(
      mockResponse
    );

    const result = await getRefreshToken(mockToken);

    expect(result).toEqual(mockResponse.data.refresh_token); // Assert that the result is equal to the mock refresh token value
    expect(axios.post).toHaveBeenCalledTimes(1); // Assert that the axios post method was called exactly once
    expect(axios.post).toHaveBeenCalledWith(
      'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/auth/refreshtoken',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + mockToken,
        },
      }
    ); // Assert that the axios post method was called with the correct arguments
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Request failed');
    // Mock the axios post method to throw an error
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue(
      mockError
    );

    // Use a try-catch block to catch the error thrown by getRefreshToken
    try {
      await getRefreshToken(mockToken);
    } catch (error) {
      expect(error).toEqual(mockError); // Assert that the error thrown is equal to the mock error value
      expect(axios.post).toHaveBeenCalledTimes(1); // Assert that the axios post method was called exactly once
      expect(axios.post).toHaveBeenCalledWith(
        'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/auth/refreshtoken',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + mockToken,
          },
        }
      ); // Assert that the axios post method was called with the correct arguments
    }
  });
});