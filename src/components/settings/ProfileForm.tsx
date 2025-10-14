import { useState, useRef } from 'react';
import { User, Mail, ImagePlus } from 'lucide-react';

const ProfileForm = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fullName, setFullName] = useState('NAMA ADMIN');
  const [email, setEmail] = useState('admin@motoriz.com');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update Profil:', { fullName, email, photo });
    alert('Profil berhasil diperbarui! (Simulasi)');
  };

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Profil Admin</h2>

      <form onSubmit={handleProfileSubmit} className="space-y-6">
        {/* Photo Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden mx-auto md:mx-0">
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

          <div className="text-center md:text-left">
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
              className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors w-full md:w-auto"
            >
              Ubah Foto
            </button>
            <p className="text-xs text-gray-500 mt-2 md:mt-0 md:ml-2">Max 5MB</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-secondary] transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-secondary] transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;