import { Motorbike, Wrench, Shirt, ClipboardList } from 'lucide-react'; // <-- NAMA IKON DIPERBAIKI
import StatCard from '../components/Dashboard/StatCard';
import SalesChart from '../components/Dashboard/SalesChart';
import StockWidget from '../components/Dashboard/StockWidget';

const Dashboard = () => {
  // Data ini nantinya akan diambil dari API
  const stats = {
    totalMotor: 153,
    totalLayanan: 12,
    totalProduk: 87,
    totalReservasi: 24,
  };

  return (
    <div className="space-y-8">
      {/* Bagian Atas: Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Unit Motor" value={stats.totalMotor} icon={<Motorbike size={28} />} color="blue" />
        <StatCard title="Total Produk" value={stats.totalProduk} icon={<Shirt size={28} />} color="yellow" />
        <StatCard title="Total Layanan" value={stats.totalLayanan} icon={<Wrench size={28} />} color="red" />
        <StatCard title="Total Reservasi" value={stats.totalReservasi} icon={<ClipboardList size={28} />} color="cyan" />
      </div>

      {/* Bagian Bawah: Grafik dan Widget Sampingan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Utama (Grafik) */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        {/* Kolom Sampingan (Widget) */}
        <div className="space-y-8">
          <StockWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;