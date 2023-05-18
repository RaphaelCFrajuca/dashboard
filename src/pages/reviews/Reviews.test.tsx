import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Reviews from './Reviews';
import {
  AuthContext,
  AuthContextType,
} from '../../ContextProviders/AuthContext';
import { reviewNumberRequest } from '../../services/review-number/review-number-service';

const queryClient = new QueryClient();

const mockAuthContext: AuthContextType = {
  accessToken: 'test_access_token',
  refreshToken: null,
  setAccessToken: jest.fn(),
  setRefreshToken: jest.fn(),
  handleLogout: jest.fn(),
};

jest.mock('../../services/review-number/review-number-service.ts', () => ({
  reviewNumberRequest: jest.fn(() => Promise.resolve(10)),
}));

describe('Reviews', () => {
  it('should render the number of reviews fetched from the server', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuthContext}>
          <Reviews />
        </AuthContext.Provider>
      </QueryClientProvider>
    );

    const reviewCount = await screen.findByText(/10/);
    expect(reviewCount).toBeInTheDocument();
  });

  it('should call the reviewNumberRequest function with the correct access token', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuthContext}>
          <Reviews />
        </AuthContext.Provider>
      </QueryClientProvider>
    );

    expect(reviewNumberRequest).toHaveBeenCalledWith('test_access_token');
  });
});
