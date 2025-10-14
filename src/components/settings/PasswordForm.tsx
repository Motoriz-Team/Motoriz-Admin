import { useState } from 'react';
import { Lock } from 'lucide-react';

const PasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (newPassword.length < 8) {
      alert('Password baru minimal 8 karakter!');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Password baru dan konfirmasi tidak cocok!');
      return;
    }

    if (oldPassword === newPassword) {
      alert('Password baru harus berbeda dengan password lama!');
      return;
    }

    console.log('Update Password:', { oldPassword, newPassword });
    alert('Password berhasil diubah! (Simulasi)');
    resetForm();
  };

  const resetForm = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Ubah Password</h2>

      <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-lg">
        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Lama
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-secondary] transition-colors"
              required
            />
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Baru
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-secondary] transition-colors"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Konfirmasi Password Baru
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-secondary] transition-colors"
              required
            />
          </div>
        </div>

        {/* Show Password Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-[--color-secondary] focus:ring-2 focus:ring-[--color-secondary]"
          />
          <label htmlFor="showPassword" className="text-sm text-gray-600 cursor-pointer">
            Tampilkan password
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto"
          >
            Ubah Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;