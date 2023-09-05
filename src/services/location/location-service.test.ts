import axios from 'axios';
import { locationRequest } from './location-service';

jest.mock('axios');

describe('locationRequest', () => {
  const mockToken = 'mockToken';
  const mockLocationData = {
    city: 'Mock City',
    country: 'Mock Country',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return the location data if the request is successful', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockLocationData,
    });

    const result = await locationRequest(mockToken);

    expect(result).toEqual(mockLocationData);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/dashboard/location',
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      }
    );
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Request failed');
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      mockError
    );

    try {
      await locationRequest(mockToken);
    } catch (error) {
      expect(error).toEqual(mockError);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/dashboard/location',
        {
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        }
      );
    }
  });
});
