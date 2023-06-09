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
  accessToken: string;
  refreshToken: string;
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
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  const handleSetAccessToken = (token: string) => {
    setAccessToken(token);
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  };

  const handleSetRefreshToken = (token: string) => {
    setRefreshToken(token);
    if (token) {
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
    const tokenHandler = async () => {
      const now = Date.now() / 1000;

      if (!!accessToken && accessToken !== refreshToken) {
        const decodedToken: JwtPayload = jwtDecode(accessToken);
        if (decodedToken.exp - now < 5 * 60) {
          handleSetAccessToken(refreshToken);
        }
        return;
      }

      if (refreshToken) {
        const decodedRefreshToken: JwtPayload = jwtDecode(refreshToken);

        if (decodedRefreshToken.exp < now) {
          handleLogout();
        } else if (decodedRefreshToken.exp - now < 15 * 60) {
          await getRefreshToken(refreshToken).then((res) => {
            handleSetRefreshToken(res.refresh_token);
          });
        }
      }
    };
    tokenHandler().catch(() => {});
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
