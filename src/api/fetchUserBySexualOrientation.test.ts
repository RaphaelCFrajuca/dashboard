import axios from 'axios';
import fetchUserBySexualOrientation from './fetchUserBySexualOrientation';

jest.mock('axios');

describe('fetchUserBySexualOrientation function', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reset all mocks before each test
  });

  const baseUrl =
    'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/dashboard/user';
  const mockToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE2ODQxNzU2NjEsImV4cCI6MTY4NDE3NjU2MX0.LAjNkLJgkGbF9V8b-4HPO5Nv2ht-jUzvIST6VzMxRGBIF_g6S_TiK_dYiysMKhHyLeeLuqDz586CISQ_wJXUuw';

  const mockResponse = [
    { count: 2, name: 'QUEER' },
    { count: 17, name: 'HETEROSEXUAL' },
    { count: 4, name: 'PANSEXUAL' },
    { count: 8, name: 'BISSEXUAL' },
  ];

  it('should return an object containing application data', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockResponse,
    });

    const response = await fetchUserBySexualOrientation();

    // eslint-disable-next-line no-console
    console.log(response);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/dashboard/user',
      {
        headers: {
          Authorization: 'Bearer ' + mockToken,
        },
      }
    );
    expect(response).toEqual(mockResponse);
  });
});
