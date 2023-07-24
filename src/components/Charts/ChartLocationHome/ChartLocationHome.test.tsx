import { render, screen } from '@testing-library/react';
import { ChartLocationHome } from './ChartLocationHome';

jest.mock('../../../assets/Icons/Righticons.svg', () => 'RightIcon');
jest.mock('../../../assets/Icons/Lefticons.svg', () => 'LeftIcon');

jest.mock('react-query', () => ({
  useQuery: jest.fn((key, fetchData) => ({
    data: fetchData(),
    isLoading: false,
  })),
}));

describe('ChartLocation', () => {
  test('renders loading state', () => {
    jest.mock('react-query', () => ({
      useQuery: jest.fn((key, fetchData) => ({
        data: null,
        isLoading: true,
      })),
    }));

    render(<ChartLocationHome />);
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });

  test('renders chart data', () => {
    const mockChartData = {
      chart: [
        {
          count_by_month: [
            { count: 10, month: 'Jan' },
            { count: 15, month: 'Feb' },
            { count: 20, month: 'Mar' },
          ],
          count_by_year: 45,
          year: '2022',
        },
      ],
      total_locations: 45,
    };

    jest.mock('react-query', () => ({
      useQuery: jest.fn(() => ({
        data: mockChartData,
        isLoading: false,
      })),
    }));

    render(<ChartLocationHome />);
  });
});
