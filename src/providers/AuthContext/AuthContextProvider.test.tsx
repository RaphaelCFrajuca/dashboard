import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { refreshToken as getRefreshToken } from '../../services/refresh-token/refresh-token-service';
import jwt_decode from 'jwt-decode';
import { useAuth, AuthContext } from './AuthContext';

jest.mock('../services/refresh-token/refresh-token-service');
jest.mock('jwt-decode');

const now = Date.now() / 1000;
const accessToken = 'access-token' || null;
const refreshToken = 'refresh-token' || null;

const getAuthContextValue = (
  overrides?: Partial<ReturnType<typeof useAuth>>
) => {
  return {
    accessToken,
    refreshToken,
    setAccessToken: jest.fn(),
    setRefreshToken: jest.fn(),
    handleLogout: jest.fn(),
    handleSetAccessToken: jest.fn(),
    handleSetRefreshToken: jest.fn(),
    ...overrides,
  };
};

describe('AuthContext', () => {
  it('redirects to /login if access or refresh token is null', () => {
    const authContextValue = getAuthContextValue();
    authContextValue.accessToken = null;
    authContextValue.refreshToken = null;
    const mockWindowLocation = {
      href: '/',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: mockWindowLocation,
    });
    renderHook(() => useAuth());
    waitFor(() => expect(window.location.href).toBe('/login'));
  });

  it('Does not redirects to /login if already on /login', () => {
    const mockHistoryPush = jest.fn();
    const mockWindowLocation = {
      href: '/login',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: mockWindowLocation,
    });
    renderHook(() => useAuth());

    expect(mockHistoryPush).not.toHaveBeenCalled();
  });

  it('does not call any function if access token is valid', () => {
    const expirationTime = now + 10 * 60;
    (jwt_decode as jest.Mock).mockReturnValueOnce({ exp: expirationTime });
    const authContextValue = getAuthContextValue();
    renderHook(() => useAuth(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <AuthContext.Provider value={authContextValue}>
          {children}
        </AuthContext.Provider>
      ),
    });

    expect(authContextValue.setAccessToken).not.toHaveBeenCalled();
    expect(authContextValue.setRefreshToken).not.toHaveBeenCalled();
    expect(authContextValue.handleLogout).not.toHaveBeenCalled();
  });

  it('does not call setRefreshToken if refresh token and access token are equal', async () => {
    (jwt_decode as jest.Mock).mockReturnValueOnce({ exp: now + 20 * 60 });
    const authContextValue = getAuthContextValue();
    authContextValue.accessToken = authContextValue.refreshToken;
    renderHook(() => useAuth(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <AuthContext.Provider value={authContextValue}>
          {children}
        </AuthContext.Provider>
      ),
    });

    expect(jwt_decode).not.toHaveBeenCalled();
  });

  it('does not call setRefreshToken if refresh token is valid', async () => {
    (jwt_decode as jest.Mock).mockReturnValueOnce({ exp: now + 20 * 60 });
    const authContextValue = getAuthContextValue();
    renderHook(() => useAuth(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <AuthContext.Provider value={authContextValue}>
          {children}
        </AuthContext.Provider>
      ),
    });

    expect(authContextValue.setRefreshToken).not.toHaveBeenCalled();
  });

  it('calls handleSetAccessToken with refresh token if access token is about to expire', async () => {
    act(() => {
      (jwt_decode as jest.Mock).mockReturnValueOnce({ exp: now + 4 * 60 });
      const authContextValue = getAuthContextValue();

      renderHook(() => useAuth(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <AuthContext.Provider value={authContextValue}>
            {children}
          </AuthContext.Provider>
        ),
      });

      waitFor(() =>
        expect(authContextValue.handleSetAccessToken).toHaveBeenCalledWith(
          refreshToken
        )
      );
    });
  });

  it('calls handleSetRefreshToken with new token if refresh token is about to expire', async () => {
    act(() => {
      (jwt_decode as jest.Mock).mockReturnValueOnce({ exp: now + 15 * 60 });
      (getRefreshToken as jest.Mock).mockResolvedValueOnce('new-refresh-token');
      const authContextValue = getAuthContextValue();
      renderHook(() => useAuth(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <AuthContext.Provider value={authContextValue}>
            {children}
          </AuthContext.Provider>
        ),
      });
      waitFor(() =>
        expect(authContextValue.handleSetRefreshToken).toHaveBeenCalledWith(
          'new-refresh-token'
        )
      );
    });
  });

  it('calls handleLogout if refresh token has expired', () => {
    act(() => {
      (jwt_decode as jest.Mock).mockReturnValueOnce({ exp: now - 1 });
      const authContextValue = getAuthContextValue();
      renderHook(() => useAuth(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <AuthContext.Provider value={authContextValue}>
            {children}
          </AuthContext.Provider>
        ),
      });
      waitFor(() =>
        expect(authContextValue.handleLogout).toHaveBeenCalledTimes(1)
      );
    });
  });
});
