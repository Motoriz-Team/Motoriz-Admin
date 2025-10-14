import { useState, useMemo } from 'react';
import { FaPlus, FaEdit, FaTrash, FaDownload, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import ServiceForm from '../../components/service/ServiceForm';

type Service = {
  id: number;
  name: string;
  subCategory: string;
  price: number;
  description: string;
  isAvailable: boolean;
};

const initialServices: Service[] = [
  { id: 1, name: "Service Baterai - Paket Standar", subCategory: "Service Motor Listrik", price: 1200000, description: "Perawatan & penggantian baterai motor listrik, cek kesehatan sel", isAvailable: true },
  { id: 2, name: "Tune Up Mesin - Paket Lengkap", subCategory: "Service Motor Bensin", price: 3500000, description: "Mid Drive 4000W, top speed 95 km/jam, jarak 120", isAvailable: true },
  { id: 3, name: "Konversi Motor Bensin ke Listrik", subCategory: "Konversi Motor", price: 15000000, description: "Hub Motor 2000W, top speed 85 km/j", isAvailable: false },
  { id: 4, name: "Service Kelistrikan - Paket Basic", subCategory: "Service Motor Listrik", price: 700000, description: "Mid drive 6500W, top speed 100 km/jam, jarak", isAvailable: true },
];

const DataServicePage = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredServices = useMemo(() => {
    return services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDeleteService = (id: number) => {
    if (window.confirm("Yakin ingin menghapus layanan ini?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleSaveService = (serviceData: Omit<Service, 'id'>) => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...editingService, ...serviceData } : s));
    } else {
      const newService: Service = { id: Date.now(), ...serviceData };
      setServices([...services, newService]);
    }
    handleCloseModal();
  };

  const handleExportExcel = () => {
    const headers = ['No', 'Nama Layanan', 'Sub Kategori', 'Harga', 'Deskripsi', 'Ketersediaan'];
    const rows = filteredServices.map((service, index) => [
      index + 1,
      service.name,
      service.subCategory,
      service.price,
      service.description,
      service.isAvailable ? 'Tersedia' : 'Tidak Tersedia',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => 
        (typeof cell === 'string' && cell.includes(',')) ? `"${cell}"` : cell
      ).join(',')),
    ].join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
    element.setAttribute('download', `data-layanan-${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const subCategoryColors: { [key: string]: string } = {
    "Service Motor Listrik": "bg-blue-100 text-blue-800",
    "Service Motor Bensin": "bg-red-100 text-red-800",
    "Konversi Motor": "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Data Layanan</h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">Kelola semua data layanan yang tersedia</p>
        </div>
        <div className="flex gap-2 flex-col sm:flex-row">
          <button
            onClick={handleExportExcel}
            className="bg-[--color-secondary] text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors justify-center"
          >
            <FaDownload /> Export Excel
          </button>
          <button
            onClick={() => navigate('/service/tambah')}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors justify-center"
          >
            <FaPlus /> Tambah Layanan
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari layanan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-secondary] transition-colors"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border-l-4 border-[--color-secondary] p-4 rounded">
          <p className="text-gray-600 text-sm">Total Layanan</p>
          <p className="text-2xl font-bold text-[--color-secondary]">{filteredServices.length}</p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-gray-600 text-sm">Layanan Tersedia</p>
          <p className="text-2xl font-bold text-green-600">
            {filteredServices.filter(s => s.isAvailable).length}
          </p>
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Layanan</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Kategori</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ketersediaan</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredServices.map((service, index) => (
              <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{service.name}</td>
                <td className="py-4 px-6 text-sm">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${subCategoryColors[service.subCategory] || 'bg-gray-100'}`}>
                    {service.subCategory}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">Rp {service.price.toLocaleString('id-ID')}</td>
                <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate">{service.description}</td>
                <td className="py-4 px-6 text-sm">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${service.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {service.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm flex gap-2">
                  <button onClick={() => handleEditService(service)} className="text-blue-500 hover:text-blue-700 transition-colors p-1 hover:bg-blue-50 rounded">
                    <FaEdit size={18} />
                  </button>
                  <button onClick={() => handleDeleteService(service.id)} className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded">
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredServices.map((service, index) => (
          <div key={service.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500">No {index + 1}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{service.name}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEditService(service)} className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded">
                  <FaEdit size={18} />
                </button>
                <button onClick={() => handleDeleteService(service.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded">
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${subCategoryColors[service.subCategory]}`}>
              {service.subCategory}
            </span>
            <p className="text-xl font-bold text-[--color-secondary]">Rp {service.price.toLocaleString('id-ID')}</p>
            <p className="text-sm text-gray-600">{service.description}</p>
            <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${service.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {service.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
            </span>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingService ? "Edit Layanan" : "Tambah Layanan Baru"}>
        <ServiceForm
          key={editingService ? editingService.id : 'new-service'}
          onSave={handleSaveService}
          onCancel={handleCloseModal}
          serviceToEdit={editingService}
        />
      </Modal>
    </div>
  );
};

export default DataServicePage;