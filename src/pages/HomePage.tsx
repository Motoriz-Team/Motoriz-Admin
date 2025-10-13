import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <h1 className="text-5xl font-bold text-brand-dark mb-4">
        Selamat Datang, Admin!
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        Ini adalah pusat kendali untuk mengelola seluruh konten dan operasional website Motoriz. Silakan login untuk memulai.
      </p>
      <Link
        to="/login"
        className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
      >
        <LogIn size={20} />
        Login ke Dashboard
      </Link>
    </div>
  );
};

export default HomePage;