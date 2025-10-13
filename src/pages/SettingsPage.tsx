import { useState, useRef } from 'react';
import { User, Mail, Lock, ImagePlus } from 'lucide-react';

const SettingsPage = () => {
  // State untuk form profil
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fullName, setFullName] = useState('NAMA ADMIN'); // nanti ambil dari data asli
  const [email, setEmail] = useState('admin@motoriz.com'); // nanti ambil dari data asli

  // Ref untuk input file
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // State untuk form password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update Profil:', { fullName, email });
    alert('Profil berhasil diperbarui! (Simulasi)');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Password baru dan konfirmasi tidak cocok!');
      return;
    }
    console.log('Update Password:', { oldPassword, newPassword });
    alert('Password berhasil diubah! (Simulasi)');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Handle klik tombol "Ubah Foto"
  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
  };

  // Ketika file dipilih
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file)); // untuk menampilkan preview
    }
  };

  return (
    <div className="space-y-8">
      {/* Kartu 1: Edit Profil */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profil Admin</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="flex items-center gap-6">
            {/* Foto Profil */}
            <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Foto Profil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <ImagePlus size={32} />
                </div>
              )}
            </div>

            {/* Tombol Ubah Foto */}
            <div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleChangePhotoClick}
                className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Ubah Foto
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-brand-dark text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      {/* Kartu 2: Ubah Password */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ubah Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Lama
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Baru
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password Baru
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-brand-red text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90"
            >
              Ubah Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
