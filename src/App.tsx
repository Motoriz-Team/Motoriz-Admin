// src/App.tsx (Versi Lengkap yang Benar)

import { Routes, Route } from 'react-router-dom';

// Layout & Komponen
import AdminLayout from './components/layouts/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Halaman Publik
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Halaman Admin
import Dashboard from './pages/Dashboard';
// ... import halaman admin lainnya ...

import './index.css';
import SukuCadangPage from './pages/products/SukuCadangListPage';
import ServicePage from './pages/ServicePage';
import TrainingPage from './pages/TrainingPage';
import NewsPage from './pages/NewsPage';
import ReservationPage from './pages/ReservationPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Routes>
      {/* Rute Publik (Bisa diakses siapa saja) */}
      <Route path="/" element={<HomePage />} /> {/* <-- Biarkan rute utama mengarah ke HomePage */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Rute Admin yang Dilindungi */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} /> {/* <-- INI PERUBAHANNYA */}
          <Route path="/products/suku-cadang" element={<SukuCadangPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/reservasi" element={<ReservationPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;