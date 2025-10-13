import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'red' | 'yellow' | 'cyan';
}

// Objek ini memetakan properti 'color' ke kelas-kelas Tailwind
const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  red: 'bg-red-100 text-red-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  cyan: 'bg-cyan-100 text-cyan-600',
};

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <p className="text-4xl font-bold text-gray-800">{value}</p>
        <p className="text-gray-500 mt-1">{title}</p>
      </div>
      <div className={`w-16 h-16 rounded-lg grid place-items-center ${colorClasses[color]}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;