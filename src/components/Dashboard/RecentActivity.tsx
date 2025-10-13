import { Newspaper, Wrench, PackagePlus } from 'lucide-react';

// Data contoh
const activities = [
  { icon: <Wrench size={18} className="text-blue-500" />, text: "Reservasi baru dari Budi Santoso" },
  { icon: <PackagePlus size={18} className="text-green-500" />, text: "Admin menambahkan produk 'Ban Maxxis'" },
  { icon: <Newspaper size={18} className="text-orange-500" />, text: "Berita 'Tips Merawat Motor' dipublikasikan" },
  { icon: <Wrench size={18} className="text-blue-500" />, text: "Reservasi baru dari Citra Dewi" },
];

const RecentActivity = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="font-bold text-lg text-gray-700 mb-4">Aktivitas Terbaru</h3>
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-center gap-4">
            <div className="bg-gray-100 p-2 rounded-full">{activity.icon}</div>
            <span className="text-sm text-gray-600">{activity.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;