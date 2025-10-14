import { useState, useMemo } from 'react';
import { FaPlus, FaEdit, FaTrash, FaDownload, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import TrainingForm from '../../components/training/TrainingForm';

type Training = {
  id: number;
  name: string;
  price: number;
  description: string;
  isAvailable: boolean;
};

const initialTrainings: Training[] = [
  { id: 1, name: "Perawatan Motor Mandiri", price: 2500000, description: "Kurikulum berbasis teknologi kendaraan listrik terbaru", isAvailable: true },
  { id: 2, name: "Tune Up Sepeda Motor Injeksi", price: 2000000, description: "Kurikulum berbasis teknologi kendaraan listrik terbaru", isAvailable: true },
  { id: 3, name: "Pelatihan Sepeda Motor Listrik", price: 1500000, description: "Kurikulum berbasis teknologi kendaraan listrik terbaru", isAvailable: true },
  { id: 4, name: "Sepeda Motor Konversi Bensin ke Listrik", price: 1800000, description: "Kurikulum berbasis teknologi kendaraan listrik terbaru", isAvailable: false },
];

const DataTrainingPage = () => {
  const [trainings, setTrainings] = useState<Training[]>(initialTrainings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredTrainings = useMemo(() => {
    return trainings.filter(training =>
      training.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [trainings, searchTerm]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTraining(null);
  };

  const handleEditTraining = (training: Training) => {
    setEditingTraining(training);
    setIsModalOpen(true);
  };

  const handleDeleteTraining = (id: number) => {
    if (window.confirm("Yakin ingin menghapus pelatihan ini?")) {
      setTrainings(trainings.filter(t => t.id !== id));
    }
  };

  const handleSaveTraining = (trainingData: Omit<Training, 'id'>) => {
    if (editingTraining) {
      setTrainings(trainings.map(t => t.id === editingTraining.id ? { ...editingTraining, ...trainingData } : t));
    } else {
      const newTraining: Training = { id: Date.now(), ...trainingData };
      setTrainings([...trainings, newTraining]);
    }
    handleCloseModal();
  };

  const handleExportExcel = () => {
    const headers = ['No', 'Nama Pelatihan', 'Harga', 'Deskripsi', 'Ketersediaan'];
    const rows = filteredTrainings.map((training, index) => [
      index + 1,
      training.name,
      training.price,
      training.description,
      training.isAvailable ? 'Tersedia' : 'Tidak Tersedia',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => 
        (typeof cell === 'string' && cell.includes(',')) ? `"${cell}"` : cell
      ).join(',')),
    ].join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
    element.setAttribute('download', `data-pelatihan-${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Data Pelatihan</h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">Kelola semua program pelatihan yang tersedia</p>
        </div>
        <div className="flex gap-2 flex-col sm:flex-row">
          <button
            onClick={handleExportExcel}
            className="bg-[--color-secondary] text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors justify-center"
          >
            <FaDownload /> Export Excel
          </button>
          <button
            onClick={() => navigate('/training/tambah')}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors justify-center"
          >
            <FaPlus /> Tambah Pelatihan
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pelatihan berdasarkan nama atau deskripsi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-secondary] transition-colors"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border-l-4 border-[--color-secondary] p-4 rounded">
          <p className="text-gray-600 text-sm">Total Pelatihan</p>
          <p className="text-2xl font-bold text-[--color-secondary]">{filteredTrainings.length}</p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-gray-600 text-sm">Pelatihan Tersedia</p>
          <p className="text-2xl font-bold text-green-600">
            {filteredTrainings.filter(t => t.isAvailable).length}
          </p>
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pelatihan</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ketersediaan</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTrainings.map((training, index) => (
              <tr key={training.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{training.name}</td>
                <td className="py-4 px-6 text-sm text-gray-500">Rp {training.price.toLocaleString('id-ID')}</td>
                <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate">{training.description}</td>
                <td className="py-4 px-6 text-sm">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${training.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {training.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm flex gap-2">
                  <button onClick={() => handleEditTraining(training)} className="text-blue-500 hover:text-blue-700 transition-colors p-1 hover:bg-blue-50 rounded">
                    <FaEdit size={18} />
                  </button>
                  <button onClick={() => handleDeleteTraining(training.id)} className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded">
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
        {filteredTrainings.map((training, index) => (
          <div key={training.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500">No {index + 1}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{training.name}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEditTraining(training)} className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded">
                  <FaEdit size={18} />
                </button>
                <button onClick={() => handleDeleteTraining(training.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded">
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
            <p className="text-xl font-bold text-[--color-secondary]">Rp {training.price.toLocaleString('id-ID')}</p>
            <p className="text-sm text-gray-600">{training.description}</p>
            <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${training.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {training.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
            </span>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingTraining ? "Edit Pelatihan" : "Tambah Pelatihan Baru"}>
        <TrainingForm
          key={editingTraining ? editingTraining.id : 'new-training'}
          onSave={handleSaveTraining}
          onCancel={handleCloseModal}
          trainingToEdit={editingTraining}
        />
      </Modal>
    </div>
  );
};

export default DataTrainingPage;