import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import jwt_decode from 'jwt-decode';
import getRefreshToken from '../services/GetRefreshToken';
export interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  handleLogout: () => void;
}
interface JwtPayload {
  sub: string;
  roles: string;
  iat: number;
  exp: number;
}
const emptyFn = (): never => {
  throw new Error('Function not implemented');
};

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  setAccessToken: emptyFn,
  setRefreshToken: emptyFn,
  handleLogout: emptyFn,
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

  const handleSetAccessToken = (token: string | null) => {
    if (refreshToken === null) {
      return;
    }
    setAccessToken(token);
    localStorage.setItem('access_token', token || '');
  };

  const handleSetRefreshToken = (token: string | null) => {
    if (refreshToken === null) {
      return;
    }
    setRefreshToken(token);
    localStorage.setItem('refresh_token', token || '');
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    const now = Date.now() / 1000;
    if (accessToken === null || refreshToken === null) {
      if (window.location.pathname !== '/login')
        window.location.href = '/login';
    } else if (accessToken !== refreshToken) {
      const decodedToken: JwtPayload = jwt_decode(accessToken);
      if (decodedToken.exp - now < 5 * 60) {
        handleSetAccessToken(refreshToken);
      } else {
        return;
      }
    } else {
      const decodedRefreshToken: JwtPayload = jwt_decode(refreshToken);
      if (decodedRefreshToken.exp < now) {
        handleLogout();
      } else if (decodedRefreshToken.exp - now < 9999 * 60) {
        const newRefreshToken = async () => {
          const response = await getRefreshToken(refreshToken);
          return response;
        };
        if (typeof newRefreshToken === 'string') {
          handleSetRefreshToken(newRefreshToken);
        }
      }
    }
  }, [accessToken, refreshToken]);

  const contextValues = useMemo(
    () => ({
      accessToken,
      refreshToken,
      handleLogout,
      setAccessToken: handleSetAccessToken,
      setRefreshToken: handleSetRefreshToken,
    }),
    [accessToken, refreshToken]
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
