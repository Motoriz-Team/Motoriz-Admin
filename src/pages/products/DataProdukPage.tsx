import { useState, useMemo } from 'react';
import { FaSearch, FaDownload } from 'react-icons/fa';

type Product = {
  id: number;
  name: string;
  category: string;
  productType: string;
  price: number;
  stock: number;
  createdAt: string;
};

const DataProdukPage = () => {
  // Data sample dari berbagai kategori
  const [products] = useState<Product[]>([
    { id: 1, name: 'GS Astra Premium N50', category: 'Accu', productType: 'Suku Cadang', price: 770000, stock: 15, createdAt: '2025-10-01' },
    { id: 2, name: 'Maxxis Victra', category: 'Ban', productType: 'Suku Cadang', price: 195000, stock: 22, createdAt: '2025-10-02' },
    { id: 3, name: 'Mid Drive 2000W', category: 'Mid Drive Motor', productType: 'Motor Listrik', price: 5500000, stock: 8, createdAt: '2025-10-03' },
    { id: 4, name: 'Hub Motor 1500W', category: 'Hub Motor', productType: 'Motor Listrik', price: 4200000, stock: 5, createdAt: '2025-10-04' },
    { id: 5, name: 'Helm Safety Pro', category: 'Helm', productType: 'Apparel', price: 450000, stock: 20, createdAt: '2025-10-05' },
    { id: 6, name: 'Jaket Riding Premium', category: 'Jaket', productType: 'Apparel', price: 650000, stock: 15, createdAt: '2025-10-06' },
    { id: 7, name: 'Lampu LED RGB', category: 'Lampu', productType: 'Aksesoris Motor', price: 275000, stock: 25, createdAt: '2025-10-07' },
    { id: 8, name: 'Kaca Spion Premium', category: 'Kaca Spion', productType: 'Aksesoris Motor', price: 125000, stock: 18, createdAt: '2025-10-08' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Get unique categories
  const categories = ['Semua', ...Array.from(new Set(products.map(p => p.productType)))];

  // Filter data
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || product.productType === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Export to Excel function
  const handleExportExcel = () => {
    // Header
    const headers = ['No', 'Nama Produk', 'Kategori', 'Jenis Produk', 'Harga', 'Stok', 'Tanggal'];
    const rows = filteredProducts.map((product, index) => [
      index + 1,
      product.name,
      product.category,
      product.productType,
      product.price,
      product.stock,
      product.createdAt,
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => (typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell)).join(',')),
    ].join('\n');

    // Download
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
    element.setAttribute('download', `data-produk-${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Data Produk</h1>
        <p className="text-gray-500 mt-2">Lihat dan kelola semua produk dari berbagai kategori</p>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-secondary]"
          />
        </div>

        {/* Export Button */}
        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2 justify-center bg-[--color-secondary] text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <FaDownload /> Export Excel
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              selectedCategory === category
                ? 'bg-[--color-secondary] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border-l-4 border-[--color-secondary] p-4 rounded">
          <p className="text-gray-600 text-sm">Total Produk</p>
          <p className="text-2xl font-bold text-[--color-secondary]">{filteredProducts.length}</p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-gray-600 text-sm">Total Nilai Stok</p>
          <p className="text-2xl font-bold text-green-600">
            Rp {filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Produk</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Produk</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{product.category}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
                      {product.productType}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">Rp {product.price.toLocaleString('id-ID')}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className={`px-2 py-1 rounded-full font-semibold text-xs ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' :
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{product.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 px-6 text-center text-gray-500">
                  Tidak ada produk yang sesuai dengan filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataProdukPage;