import axios from 'axios';
import fetchUserBySexualOrientation from './fetchUserBySexualOrientation';

jest.mock('axios');

describe('fetchUserBySexualOrientation function', () => {
  const mockToken = 'mocktoken';

  const mockResponse = {
    sexual_orientation: [
      { count: 2, name: 'QUEER' },
      { count: 17, name: 'HETEROSEXUAL' },
      { count: 4, name: 'PANSEXUAL' },
      { count: 8, name: 'BISSEXUAL' },
    ],
  };

  beforeEach(() => {
    jest.resetAllMocks(); // Reset all mocks before each test
  });

  it('should return an object containing application data', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockResponse,
    });

    try {
      const a = await fetchUserBySexualOrientation(mockToken);
    } catch (error) {
      expect(axios.get).toHaveBeenCalledTimes(1); // Assert that the axios get method was called exactly once
      expect(axios.get).toHaveBeenCalledWith(
        'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/review/show-review-qnt',
        {
          headers: {
            Authorization: 'Bearer ' + mockToken,
          },
        }
      ); // Assert that the axios get method was called with the correct arguments
    }
  });
});
