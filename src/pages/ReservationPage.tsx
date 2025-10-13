import { useState, useMemo } from 'react';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import Modal from '../components/common/Modal';
import ReservationForm from '../components/reservations/ReservationForm';

type Reservation = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  date: string;
  time: string;
  notes: string;
};

// Data contoh, nanti ini akan datang dari database
const initialReservations: Reservation[] = [
  { id: 1, fullName: "Andi Prasetyo", phone: "081234567890", email: "andi@example.com", serviceType: "Service Baterai", date: "2025-10-05", time: "09:00", notes: "Baterai cepat habis, mohon dicek." },
  { id: 2, fullName: "Budi Santoso", phone: "081298765432", email: "budi@example.com", serviceType: "Service Rem", date: "2025-10-06", time: "10:30", notes: "Rem belakang bunyi saat digunakan." },
  { id: 3, fullName: "Citra Dewi", phone: "081355667788", email: "citra@example.com", serviceType: "Service Mesin Listrik", date: "2025-10-07", time: "13:00", notes: "Motor bergetar ketika dinyalakan." },
];

const ReservationPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReservation(null);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setIsModalOpen(true);
  };

  const handleDeleteReservation = (id: number) => {
    if (window.confirm("Yakin ingin menghapus reservasi ini?")) {
      setReservations(reservations.filter(r => r.id !== id));
    }
  };

  const handleSaveReservation = (reservationData: Omit<Reservation, 'id'>) => {
    if (editingReservation) {
      setReservations(reservations.map(r => r.id === editingReservation.id ? { ...editingReservation, ...reservationData } : r));
    } else {
      const newReservation: Reservation = { id: Date.now(), ...reservationData };
      setReservations([...reservations, newReservation]);
    }
    handleCloseModal();
  };
  
  // Logika untuk filter pencarian
  const filteredReservations = useMemo(() => {
    return reservations.filter(res =>
      res.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.phone.includes(searchTerm) ||
      res.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reservations, searchTerm]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reservasi</h1>
          <p className="text-gray-500 mt-1">Manajemen Reservasi</p>
        </div>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">No</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Nama Lengkap</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">No Telepon</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Jenis Service</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Jam</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Pesan</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredReservations.map((res, index) => (
              <tr key={res.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{res.fullName}</td>
                <td className="py-4 px-6 text-sm text-gray-500">{res.phone}</td>
                <td className="py-4 px-6 text-sm text-gray-500">{res.email}</td>
                <td className="py-4 px-6 text-sm text-gray-500">{res.serviceType}</td>
                <td className="py-4 px-6 text-sm text-gray-500">{res.date}</td>
                <td className="py-4 px-6 text-sm text-gray-500">{res.time} WIB</td>
                <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate">{res.notes}</td>
                <td className="py-4 px-6 text-sm flex gap-2">
                  <button onClick={() => handleEditReservation(res)} className="text-blue-500 hover:text-blue-700"><FaEdit size={18} /></button>
                  <button onClick={() => handleDeleteReservation(res.id)} className="text-red-500 hover:text-red-700"><FaTrash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingReservation ? "Edit Reservasi" : "Tambah Reservasi Baru"}>
        <ReservationForm
          key={editingReservation ? editingReservation.id : 'new-reservation'}
          onSave={handleSaveReservation}
          onCancel={handleCloseModal}
          reservationToEdit={editingReservation}
        />
      </Modal>
    </div>
  );
};

export default ReservationPage;