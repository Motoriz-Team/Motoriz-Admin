import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../components/common/Modal';
import ServiceForm from '../components/service/ServiceForm';

type Service = {
  id: number;
  name: string;
  subCategory: string;
  price: number;
  description: string;
  isAvailable: boolean;
};

// Data contoh, nanti ini akan datang dari database
const initialServices: Service[] = [
  { id: 1, name: "Service Baterai - Paket Standar", subCategory: "Service Motor Listrik", price: 1200000, description: "Perawatan & penggantian baterai motor listrik, cek kesehatan sel", isAvailable: true },
  { id: 2, name: "Tune Up Mesin - Paket Lengkap", subCategory: "Service Motor Bensin", price: 3500000, description: "Mid Drive 4000W, top speed 95 km/jam, jarak 120", isAvailable: true },
  { id: 3, name: "Konversi Motor Bensin ke Listrik", subCategory: "Konversi Motor", price: 15000000, description: "Hub Motor 2000W, top speed 85 km/j", isAvailable: false },
  { id: 4, name: "Service Kelistrikan - Paket Basic", subCategory: "Service Motor Listrik", price: 700000, description: "Mid drive 6500W, top speed 100 km/jam, jarak", isAvailable: true },
];

const subCategoryColors: { [key: string]: string } = {
  "Service Motor Listrik": "bg-blue-100 text-blue-800",
  "Service Motor Bensin": "bg-red-100 text-red-800",
  "Konversi Motor": "bg-yellow-100 text-yellow-800",
};

const ServicePage = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleAddService = () => {
    setEditingService(null);
    setIsModalOpen(true);
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

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Service</h1>
          <p className="text-gray-500 mt-1">Manajemen Service</p>
        </div>
        <button onClick={handleAddService} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600">
          <FaPlus /> Tambah Service
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Service</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Kategori</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ketersediaan</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service, index) => (
              <tr key={service.id} className="hover:bg-gray-50">
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
                  <button onClick={() => handleEditService(service)} className="text-blue-500 hover:text-blue-700"><FaEdit size={18} /></button>
                  <button onClick={() => handleDeleteService(service.id)} className="text-red-500 hover:text-red-700"><FaTrash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingService ? "Edit Service" : "Tambah Service Baru"}>
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

export default ServicePage;