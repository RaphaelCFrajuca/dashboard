import axios from 'axios';

export interface DashBoardUserResponse {
  chart: Array<{
    count_by_month: Array<{
      count: number;
      month: string;
    }>;
    count_by_year: number;
    year: string;
  }>;
  gender: Array<{
    count: number;
    name: string;
  }>;
  sexual_orientation: Array<{
    count: number;
    name: string;
  }>;
  total_users: number;
}

const baseUrl = 'https://is-it-safe-api-v2.herokuapp.com';

export async function dashboardUser(
  apiKey: string
): Promise<DashBoardUserResponse> {
  const response = await axios.get<DashBoardUserResponse>(
    `${baseUrl}/is-it-safe/dashboard/user`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data;
}
