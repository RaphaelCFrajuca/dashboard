import { render, waitFor, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Location from './Location';

jest.mock('../../context/auth/AuthProvider', () => ({
  useAuth: jest.fn(() => ({
    accessToken: 'mockAccessToken',
  })),
}));

jest.mock('../../services/location/location-service', () => ({
  locationRequest: jest.fn(() => Promise.resolve({ total_locations: 12 })),
}));

describe('Location', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should render the number of locations', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Location />
      </QueryClientProvider>
    );

    await waitFor(() => expect(screen.getByText('12')).toBeInTheDocument());
  });
});
