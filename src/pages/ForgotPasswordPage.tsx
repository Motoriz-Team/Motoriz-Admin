import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Hubungkan dengan API backend untuk mengirim email reset password
    console.log({ email });
    alert(`Link reset password telah dikirim ke ${email} (Simulasi)`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-center text-brand-dark">
            Lupa Password
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Masukkan email Anda dan kami akan mengirimkan link untuk mereset password Anda.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email terdaftar"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-dark"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-brand-red rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Kirim Link Reset
          </button>
        </form>
        <div className="text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-brand-dark hover:underline">
            <ArrowLeft size={16} />
            Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;