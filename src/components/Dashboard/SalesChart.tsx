import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 1. Definisikan tipe data untuk objek di dalam array
type ChartData = {
  name: string;
  reservasi: number;
};

// 2. Terapkan tipe data tersebut ke konstanta 'data'
const data: ChartData[] = [
  { name: 'Senin', reservasi: 4 },
  { name: 'Selasa', reservasi: 3 },
  { name: 'Rabu', reservasi: 5 },
  { name: 'Kamis', reservasi: 4 },
  { name: 'Jumat', reservasi: 6 },
  { name: 'Sabtu', reservasi: 11 },
  { name: 'Minggu', reservasi: 8 },
];

const SalesChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="font-bold text-lg text-gray-700 mb-4">Reservasi Minggu Ini</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* 3. Pastikan komponen XAxis dan lainnya digunakan di sini */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="reservasi" 
            stroke="var(--color-brand-dark)" 
            strokeWidth={2} 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;