import { useNavigate } from 'react-router-dom';
import ReservationForm from '../../components/reservations/ReservationForm';

type Reservation = {
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  date: string;
  time: string;
  notes: string;
};

const TambahReservationPage = () => {
  const navigate = useNavigate();

  const handleSaveReservation = (reservationData: Reservation) => {
    // TODO: Kirim data ke backend API
    console.log('Reservasi baru ditambahkan:', reservationData);
    alert('Reservasi berhasil ditambahkan!');
    navigate('/reservasi/data');
  };

  const handleCancel = () => {
    navigate('/reservasi/data');
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tambah Reservasi Baru</h1>
        <p className="text-gray-500 text-sm md:text-base mt-2">Form untuk menambahkan reservasi baru ke sistem</p>
      </div>

      <ReservationForm
        onSave={handleSaveReservation}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TambahReservationPage;