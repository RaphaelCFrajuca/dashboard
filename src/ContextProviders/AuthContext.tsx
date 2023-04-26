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
    localStorage.getItem('access_token') as string
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refresh_token')
  );

  const handleSetAccessToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem('access_token', token);
  };

  const handleSetRefreshToken = (token: string) => {
    setRefreshToken(token);
    localStorage.setItem('refresh_token', token);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchRefresh = async () => {
      const response: string = await getRefreshToken(refreshToken as string);
      return response;
    };
    const now = Date.now() / 1000;
    if (accessToken === null || refreshToken === null) {
      if (window.location.pathname !== '/login')
        window.location.href = '/login';
    } else if (accessToken != refreshToken) {
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
      } else if (decodedRefreshToken.exp - now < 15 * 60) {
        const newRefreshToken = fetchRefresh();
        newRefreshToken.then((res) => {
          if (typeof res === 'string') {
            handleSetRefreshToken(res);
          }
        });
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
