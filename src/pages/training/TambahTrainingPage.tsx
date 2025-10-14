import { useNavigate } from 'react-router-dom';
import TrainingForm from '../../components/training/TrainingForm';

type Training = {
  name: string;
  price: number;
  description: string;
  isAvailable: boolean;
};

const TambahTrainingPage = () => {
  const navigate = useNavigate();

  const handleSaveTraining = (trainingData: Training) => {
    // TODO: Kirim data ke backend API
    console.log('Pelatihan baru ditambahkan:', trainingData);
    alert('Pelatihan berhasil ditambahkan!');
    navigate('/training/data');
  };

  const handleCancel = () => {
    navigate('/training/data');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tambah Pelatihan Baru</h1>
        <p className="text-gray-500 mt-2">Form untuk menambahkan program pelatihan baru ke sistem</p>
      </div>

      <TrainingForm
        onSave={handleSaveTraining}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TambahTrainingPage;