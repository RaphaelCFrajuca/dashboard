import { Route, Routes } from 'react-router';
import { QueryClientProvider } from 'react-query';
import Home from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import queryClient from './services/client/query';
import { AuthProvider } from './context/auth/AuthProvider';
import { SidebarProvider } from './context/sidebarContext/SidebarContextProvider';


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </SidebarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
