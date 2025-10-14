import { Motorbike, Wrench, Shirt, ClipboardList, GraduationCap, Newspaper } from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import SalesChart from '../components/Dashboard/SalesChart';
import StockWidget from '../components/Dashboard/StockWidget';
import RecentActivity from '../components/Dashboard/RecentActivity';

const Dashboard = () => {
  // Data produk dari localStorage atau state management
  const getProductCount = () => {
    // Simulasi: hitung total produk dari semua kategori
    // Nanti bisa diganti dengan fetch dari API
    const sukuCadang = JSON.parse(localStorage.getItem('products_suku_cadang') || '[]');
    const motorListrik = JSON.parse(localStorage.getItem('products_motor_listrik') || '[]');
    const apparel = JSON.parse(localStorage.getItem('products_apparel') || '[]');
    const aksesoris = JSON.parse(localStorage.getItem('products_aksesoris') || '[]');
    
    return sukuCadang.length + motorListrik.length + apparel.length + aksesoris.length;
  };

  const getServiceCount = () => {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    return services.length;
  };

  const getTrainingCount = () => {
    const trainings = JSON.parse(localStorage.getItem('trainings') || '[]');
    return trainings.length;
  };

  const getNewsCount = () => {
    const news = JSON.parse(localStorage.getItem('news') || '[]');
    return news.length;
  };

  const getReservationCount = () => {
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    return reservations.length;
  };

  const stats = {
    totalProduk: getProductCount() || 87,
    totalLayanan: getServiceCount() || 12,
    totalPelatihan: getTrainingCount() || 8,
    totalBerita: getNewsCount() || 15,
    totalReservasi: getReservationCount() || 24,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Selamat datang di panel admin Motoriz</p>
      </div>

      {/* Bagian Atas: Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard 
          title="Total Produk" 
          value={stats.totalProduk} 
          icon={<Shirt size={28} />} 
          color="blue" 
        />
        <StatCard 
          title="Total Layanan" 
          value={stats.totalLayanan} 
          icon={<Wrench size={28} />} 
          color="red" 
        />
        <StatCard 
          title="Total Pelatihan" 
          value={stats.totalPelatihan} 
          icon={<GraduationCap size={28} />} 
          color="yellow" 
        />
        <StatCard 
          title="Total Berita" 
          value={stats.totalBerita} 
          icon={<Newspaper size={28} />} 
          color="cyan" 
        />
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold text-gray-800">{stats.totalReservasi}</p>
            <p className="text-gray-500 mt-1">Total Reservasi</p>
          </div>
          <div className="w-16 h-16 rounded-lg grid place-items-center bg-purple-100 text-purple-600">
            <ClipboardList size={28} />
          </div>
        </div>
      </div>

      {/* Bagian Bawah: Grafik dan Widget Sampingan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Utama (Grafik) */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        {/* Kolom Sampingan (Widget) */}
        <div className="space-y-6">
          <StockWidget />
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;