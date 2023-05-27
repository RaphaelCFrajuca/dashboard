import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './providers/AuthContext/AuthContext';
import { QueryClientProvider } from 'react-query';
import queryClient from './services/queryClient/queryClient';
import { DashboardProvider } from './providers/Dashboard/Dashboard';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DashboardProvider>
          <App />
        </DashboardProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
