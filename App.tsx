import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Booking from './pages/Booking';
import Consultancy from './pages/Consultancy';
import Care from './pages/Care';
import Chat from './pages/Chat';
import { AppRoute } from './types';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path={AppRoute.WELCOME} element={<Navigate to={AppRoute.DASHBOARD} replace />} />
            <Route path={AppRoute.DASHBOARD} element={<Dashboard />} />
            <Route path={AppRoute.PRICING} element={<Pricing />} />
            <Route path={AppRoute.BOOKING} element={<Booking />} />
            <Route path={AppRoute.CONSULTANCY} element={<Consultancy />} />
            <Route path={AppRoute.CARE} element={<Care />} />
            <Route path={AppRoute.CHAT} element={<Chat />} />
            <Route path="*" element={<Navigate to={AppRoute.DASHBOARD} replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;