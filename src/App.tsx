import { Routes, Route } from 'react-router-dom';

// Layout & Komponen
import AdminLayout from './components/layouts/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Halaman Publik
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Halaman Admin - Dashboard
import Dashboard from './pages/Dashboard';

// Halaman Admin - Produk
import SukuCadangPage from './pages/products/SukuCadangListPage';
import MotorListrikPage from './pages/products/MotorListrikPage';
import ApparelPage from './pages/products/Apparel';
import AksesorisPage from './pages/products/Aksesoris';
import KategoriProdukPage from './pages/products/KategoriProductPage';
import DataProdukPage from './pages/products/DataProdukPage';

// Halaman Admin - Layanan
import ServicePage from './pages/service/ServicePage';
import DataServicePage from './pages/service/DataServicePage';
import TambahServicePage from './pages/service/TambahServicePage';

// Halaman Admin - Pelatihan
import TrainingPage from './pages/training/TrainingPage';
import DataTrainingPage from './pages/training/DataTrainingPage';
import TambahTrainingPage from './pages/training/TambahTrainingPage';

// Halaman Admin - Berita
import NewsPage from './pages/news/NewsPage';
import DataNewsPage from './pages/news/DataNewsPage';
import TambahNewsPage from './pages/news/TambahNewsPage';

// Halaman Admin - Reservasi
import ReservationPage from './pages/reservasi/ReservationPage';
import DataReservationPage from './pages/reservasi/DataReservationPage';
import TambahReservationPage from './pages/reservasi/TambahReservationPage';

// Halaman Admin - Lainnya
import SettingsPage from './pages/SettingsPage';

import './index.css';

function App() {
  return (
    <Routes>
      {/* Rute Publik (Bisa diakses siapa saja) */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Rute Admin yang Dilindungi */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Produk Routes */}
          <Route path="/products/kategori" element={<KategoriProdukPage />} />
          <Route path="/products/data" element={<DataProdukPage />} />
          <Route path="/products/motor-listrik" element={<MotorListrikPage />} />
          <Route path="/products/suku-cadang" element={<SukuCadangPage />} />
          <Route path="/products/apparel" element={<ApparelPage />} />
          <Route path="/products/aksesoris" element={<AksesorisPage />} />

          {/* Layanan Routes */}
          <Route path="/service" element={<ServicePage />} />
          <Route path="/service/data" element={<DataServicePage />} />
          <Route path="/service/tambah" element={<TambahServicePage />} />

          {/* Pelatihan Routes */}
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/training/data" element={<DataTrainingPage />} />
          <Route path="/training/tambah" element={<TambahTrainingPage />} />

          {/* Berita Routes */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/data" element={<DataNewsPage />} />
          <Route path="/news/tambah" element={<TambahNewsPage />} />

          {/* Reservasi Routes */}
          <Route path="/reservasi" element={<ReservationPage />} />
          <Route path="/reservasi/data" element={<DataReservationPage />} />
          <Route path="/reservasi/tambah" element={<TambahReservationPage />} />

          {/* Lainnya */}
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;