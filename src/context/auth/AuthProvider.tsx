/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useContext,
  useEffect,
} from 'react';

import {
  getRefreshToken,
  RefreshTokenResponse,
} from '../../services/refresh-token/refresh-token-service';
import jwtDecode from 'jwt-decode';

export interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  handleLogout: () => void;
}

interface JwtPayload {
  sub: string;
  roles: string;
  iat: number;
  exp: number;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: '',
  refreshToken: '',
  setAccessToken: () => {},
  setRefreshToken: () => {},
  handleLogout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refresh_token')
  );

  const handleSetAccessToken = (token: string) => {
    if (token) {
      setAccessToken(token);
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  };

  const handleSetRefreshToken = (token: string) => {
    if (token) {
      setRefreshToken(token);
      localStorage.setItem('refresh_token', token);
    } else {
      localStorage.removeItem('refresh_token');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken('');
    setRefreshToken('');
  };

  useEffect(() => {
    const handleTokenRefresh = async () => {
      const now = Date.now() / 1000;

      if (!!accessToken && accessToken !== refreshToken) {
        const decodedToken: JwtPayload = jwtDecode(accessToken);
        if (decodedToken.exp - now < 5 * 60) {
          handleSetAccessToken(refreshToken ?? '');
        }
        return;
      }

      if (refreshToken) {
        const decodedRefreshToken: JwtPayload = jwtDecode(refreshToken);

        if (decodedRefreshToken.exp < now) {
          handleLogout();
        } else if (decodedRefreshToken.exp - now < 15 * 60) {
          await getRefreshToken(refreshToken).then((res) => {
            if (typeof res === 'string') {
              handleSetRefreshToken(res);
            }
          });
        }
      }
    };
    handleTokenRefresh();
  }, [accessToken, refreshToken, handleSetAccessToken, handleLogout]);

  const contextValues = useMemo(
    () => ({
      accessToken,
      refreshToken,
      handleLogout,
      setAccessToken: handleSetAccessToken,
      setRefreshToken: handleSetRefreshToken,
    }),
    [accessToken, refreshToken, handleLogout]
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
