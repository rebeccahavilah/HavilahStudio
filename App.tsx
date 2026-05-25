import React from 'react'; // Correção: 'import' escrito com 'i' minúsculo para evitar erro no Vercel
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Booking from './pages/Booking';
import Consultancy from './pages/Consultancy';
import Care from './pages/Care';
import Chat from './pages/Chat';
import { AppRoute } from './types';

// DOCUMENTAÇÃO: Passo 1 - Importamos a nova página SobreMim da pasta pages
import SobreMim from './pages/SobreMim';

export default function App() {
  return (
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
          
          {/* DOCUMENTAÇÃO: Passo 2 - Criamos a rota para a página Sobre Mim */}
          {/* Sempre que a URL for '/sobre-mim', o componente <SobreMim /> será renderizado */}
          <Route path="/sobre-mim" element={<SobreMim />} />
          
          <Route path="*" element={<Navigate to={AppRoute.DASHBOARD} replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
