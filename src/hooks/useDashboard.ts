import { useContext } from 'react';
import { DashboardContext } from '../providers/Dashboard/Dashboard';

export function useDashboard() {
  const hook = useContext(DashboardContext);
  if (hook) return hook;
  else throw new Error('Erro ao utilizar o hook');
}
