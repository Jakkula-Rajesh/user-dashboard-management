import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import UserDetailsPage from './pages/UserDetailsPage';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/user/:id" element={<UserDetailsPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
