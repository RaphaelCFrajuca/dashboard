import { render, waitFor, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Reviews from './Reviews';

jest.mock('../../context/auth/AuthProvider', () => ({
  useAuth: jest.fn(() => ({
    accessToken: 'mockAccessToken',
  })),
}));

jest.mock('../../services/review-number/review-number-service', () => ({
  reviewNumberRequest: jest.fn(() => Promise.resolve(10)),
}));

describe('Reviews', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should render the number of reviews', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Reviews />
      </QueryClientProvider>
    );

    await waitFor(() => expect(screen.getByText('10')).toBeInTheDocument());
  });
});
