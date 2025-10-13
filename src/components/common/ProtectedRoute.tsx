import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. Ambil status login dari kotak penyimpanan browser
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  // 2. Tambahkan log ini untuk melihat apa yang dibaca oleh komponen
  console.log('ProtectedRoute is checking auth status:', isAuthenticated);

  // 3. Cek apakah statusnya adalah string 'true'
  if (isAuthenticated === 'true') {
    // Jika ya, izinkan akses ke halaman yang dituju (misal: Dashboard)
    return <Outlet />;
  }

  // Jika tidak (null atau 'false'), tendang ke halaman login
  return <Navigate to="/login" />;
};

export default ProtectedRoute;