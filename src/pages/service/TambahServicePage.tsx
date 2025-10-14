import { useNavigate } from 'react-router-dom';
import ServiceForm from '../../components/service/ServiceForm';

type Service = {
  name: string;
  subCategory: string;
  price: number;
  description: string;
  isAvailable: boolean;
};

const TambahServicePage = () => {
  const navigate = useNavigate();

  const handleSaveService = (serviceData: Service) => {
    // TODO: Kirim data ke backend API
    console.log('Layanan baru ditambahkan:', serviceData);
    alert('Layanan berhasil ditambahkan!');
    navigate('/service/data');
  };

  const handleCancel = () => {
    navigate('/service/data');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tambah Layanan Baru</h1>
        <p className="text-gray-500 mt-2">Form untuk menambahkan layanan baru ke sistem</p>
      </div>

      <ServiceForm
        onSave={handleSaveService}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TambahServicePage;