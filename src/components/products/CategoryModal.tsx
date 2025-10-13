import { useState } from 'react';
import Modal from '../common/Modal'; // Kita pakai ulang modal yang sudah ada
import { FaTrash } from 'react-icons/fa';

type Category = {
  id: number;
  name: string;
};

type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAddCategory: (name: string) => void;
  onDeleteCategory: (id: number) => void;
};

const CategoryModal = ({ isOpen, onClose, categories, onAddCategory, onDeleteCategory }: CategoryModalProps) => {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSave = () => {
    if (newCategoryName.trim() === '') return; // Jangan simpan jika kosong
    onAddCategory(newCategoryName.trim());
    setNewCategoryName(''); // Kosongkan input setelah disimpan
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Kategori">
      <div>
        <label className="block text-sm font-medium text-gray-700">Kategori</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Buat kategori baru..."
            className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button onClick={handleSave} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600">
            Simpan
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Kategori yang sudah ada:</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                <span>{cat.name}</span>
                <button onClick={() => onDeleteCategory(cat.id)} className="ml-2 text-purple-600 hover:text-purple-800">
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryModal;