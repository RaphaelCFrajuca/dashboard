import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '../pages/Home/Home';
import Reviews from '../pages/reviews/Reviews';
import { Login } from '../pages/Login/Login';
import Lugares from '../pages/Lugares/Lugares';

export function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const checkLoggedIn = () => {
    const refresh_token = localStorage.getItem('refresh_token');
    setIsLoggedIn(!!refresh_token);
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/lugares" element={<Lugares />} />
      </Routes>
    </BrowserRouter>
  );
}
