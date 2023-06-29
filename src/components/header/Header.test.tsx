/* eslint-disable react/display-name */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AuthProvider } from '../../context/auth/AuthProvider';
import { SidebarProvider, useSidebar } from '../../context/sidebarContext/SidebarContextProvider';
import { RenderResult, act } from '@testing-library/react';
import Header from './Header';
import { getLoggedUser } from '../../services/get-logged-user/get-logged-user-service';
import Home from '../../pages/Home/Home';


jest.mock('../../services/get-logged-user/get-logged-user-service');

jest.mock('../../context/sidebarContext/SidebarContextProvider', () => ({
  useSidebar: jest.fn().mockReturnValue({
    isSidebarExpanded: false,
    setMaskPosition: jest.fn(),
  }),
}));

jest.mock('../../assets/Icons/Downicons.svg', () => ({
  ReactComponent: () => <div data-testid="down-icon" />,
}));
interface User {
  nickname: string;
  profilePhoto: string;
}

describe('Header', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    jest.resetAllMocks();
    queryClient.clear();
  });

  it('renders the header component with user information', async () => {
    const user = { nickname: 'John Doe', profilePhoto: 'src/assets/profile.png' } as User;
    (getLoggedUser as jest.Mock).mockResolvedValueOnce(user);
   
   render(<QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SidebarProvider>
            <Home />
          </SidebarProvider>
        </AuthProvider>
      </QueryClientProvider>
  );

    // Wait for the user data to be fetched
    await screen.findByText('olá John Doe');

    // Verify the rendered content
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByText('olá John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('user')).toHaveAttribute('src', 'src/assets/profile.png');
  });

  it('renders the header component with default user information if user data is not available', async () => {
    (getLoggedUser as jest.Mock).mockResolvedValueOnce(null);

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SidebarProvider>
            <Header />
          </SidebarProvider>
        </AuthProvider>
      </QueryClientProvider>
    );

    // Wait for the user data to be fetched
    await screen.findByText('olá user');

    // Verify the rendered content
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByText('olá user')).toBeInTheDocument();
    expect(screen.getByAltText('user')).toHaveAttribute('src', 'src/assets/profile.png');
  });

    
});
