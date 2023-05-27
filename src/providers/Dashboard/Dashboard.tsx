import { createContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import { dashboardUser } from '../../services/dashboard/dashboard-service';

type IGenderCount = Array<{
  count: number;
  name: string;
}>;

export interface DashboardContextType {
  genderCount: IGenderCount | null;
}

export const DashboardContext = createContext<DashboardContextType | null>(
  null
);

type IDashboardProvider = { children: ReactNode };

export const DashboardProvider = ({ children }: IDashboardProvider) => {
  const { accessToken } = useAuth();
  const [genderCount, setGenderCount] = useState<IGenderCount | null>(null);
  useEffect(() => {
    if (accessToken) {
      dashboardUser(accessToken).then((response) => {
        const { gender } = response;
        setGenderCount(gender);
      });
    }
  }, [accessToken]);
  return (
    <DashboardContext.Provider value={{ genderCount }}>
      {children}
    </DashboardContext.Provider>
  );
};
