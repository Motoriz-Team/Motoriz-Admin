import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../../components/common/Modal';

type ProductType = {
  id: number;
  name: string;
  description: string;
};

type Category = {
  id: number;
  productTypeId: number;
  name: string;
  createdAt: string;
};

const KategoriProdukPage = () => {
  const [productTypes] = useState<ProductType[]>([
    { id: 1, name: 'Motor Listrik', description: 'Kategori produk motor listrik' },
    { id: 2, name: 'Suku Cadang', description: 'Kategori produk suku cadang' },
    { id: 3, name: 'Apparel', description: 'Kategori produk apparel/pakaian' },
    { id: 4, name: 'Aksesoris Motor', description: 'Kategori produk aksesoris motor' },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, productTypeId: 1, name: 'Mid Drive Motor', createdAt: '2025-10-14' },
    { id: 2, productTypeId: 1, name: 'Hub Motor', createdAt: '2025-10-14' },
    { id: 3, productTypeId: 2, name: 'Ban', createdAt: '2025-10-14' },
    { id: 4, productTypeId: 3, name: 'Helm', createdAt: '2025-10-14' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedProductType, setSelectedProductType] = useState(productTypes[0]?.id || 1);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleOpenModal = () => {
    setEditingCategory(null);
    setNewCategoryName('');
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setSelectedProductType(category.productTypeId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setNewCategoryName('');
  };

  const handleSaveCategory = () => {
    if (!newCategoryName.trim()) {
      alert('Nama kategori tidak boleh kosong');
      return;
    }

    if (editingCategory) {
      setCategories(
        categories.map(c =>
          c.id === editingCategory.id
            ? { ...c, name: newCategoryName, productTypeId: selectedProductType }
            : c
        )
      );
    } else {
      const newCategory: Category = {
        id: Date.now(),
        productTypeId: selectedProductType,
        name: newCategoryName,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCategories([...categories, newCategory]);
    }
    handleCloseModal();
  };

  const handleDeleteCategory = (id: number) => {
    if (window.confirm('Yakin ingin menghapus kategori ini?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const filteredCategories = categories.filter(
    c => c.productTypeId === selectedProductType
  );

  return (
    <div className="space-y-8">
      {/* Tabs untuk Jenis Produk */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Kategori Produk</h1>

        <div className="flex gap-2 mb-6 flex-wrap">
          {productTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedProductType(type.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedProductType === type.id
                  ? 'bg-[--color-secondary] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {productTypes.find(t => t.id === selectedProductType)?.name}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage kategori untuk produk {productTypes.find(t => t.id === selectedProductType)?.name}
            </p>
          </div>
          <button
            onClick={handleOpenModal}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <FaPlus /> Tambah Kategori
          </button>
        </div>

        {/* Tabel Kategori */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Kategori
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Dibuat
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{category.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{category.createdAt}</td>
                    <td className="py-4 px-6 text-sm flex gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 px-6 text-center text-gray-500">
                    Tidak ada kategori untuk tipe produk ini
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah/Edit Kategori */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Produk
            </label>
            <select
              value={selectedProductType}
              onChange={e => setSelectedProductType(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-secondary]"
            >
              {productTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Kategori
            </label>
            <input
              type="text"
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
              placeholder="Masukkan nama kategori"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-secondary]"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={handleCloseModal}
              className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              onClick={handleSaveCategory}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Simpan
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default KategoriProdukPage;