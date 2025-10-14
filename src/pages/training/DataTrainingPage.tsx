import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
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
  const navigate = useNavigate();

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

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Data Pelatihan</h1>
          <p className="text-gray-500 mt-1">Kelola semua program pelatihan yang tersedia</p>
        </div>
        <button
          onClick={() => navigate('/training/tambah')}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600"
        >
          <FaPlus /> Tambah Pelatihan
        </button>
      </div>

      <div className="overflow-x-auto">
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
            {trainings.map((training, index) => (
              <tr key={training.id} className="hover:bg-gray-50">
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
                  <button onClick={() => handleEditTraining(training)} className="text-blue-500 hover:text-blue-700 transition-colors">
                    <FaEdit size={18} />
                  </button>
                  <button onClick={() => handleDeleteTraining(training.id)} className="text-red-500 hover:text-red-700 transition-colors">
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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