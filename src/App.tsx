import { Route, Routes } from 'react-router';
import { QueryClientProvider } from 'react-query';
import Home from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import queryClient from './services/client/query';
import { AuthProvider } from './context/auth/AuthProvider';
import Location from './pages/Location/Location';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/location" element={<Location />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
