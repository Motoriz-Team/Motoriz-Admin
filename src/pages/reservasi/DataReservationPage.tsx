import { useState, useMemo } from 'react';
import { FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import ReservationForm from '../../components/reservations/ReservationForm';

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

const initialReservations: Reservation[] = [
  { id: 1, fullName: "Andi Prasetyo", phone: "081234567890", email: "andi@example.com", serviceType: "Service Baterai", date: "2025-10-05", time: "09:00", notes: "Baterai cepat habis, mohon dicek." },
  { id: 2, fullName: "Budi Santoso", phone: "081298765432", email: "budi@example.com", serviceType: "Service Rem", date: "2025-10-06", time: "10:30", notes: "Rem belakang bunyi saat digunakan." },
  { id: 3, fullName: "Citra Dewi", phone: "081355667788", email: "citra@example.com", serviceType: "Service Mesin Listrik", date: "2025-10-07", time: "13:00", notes: "Motor bergetar ketika dinyalakan." },
];

const DataReservationPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
const navigate = useNavigate();

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
      setReservations(
        reservations.map(r =>
          r.id === editingReservation.id ? { ...editingReservation, ...reservationData } : r
        )
      );
    } else {
      const newReservation: Reservation = { id: Date.now(), ...reservationData };
      setReservations([...reservations, newReservation]);
    }
    handleCloseModal();
  };

  const filteredReservations = useMemo(() => {
    return reservations.filter(res =>
      res.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.phone.includes(searchTerm) ||
      res.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reservations, searchTerm]);

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Data Reservasi</h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">Kelola semua reservasi yang masuk</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600 w-full md:w-auto justify-center transition-colors"
        >
          <FaPlus /> Tambah Reservasi
        </button>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, telepon, atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[--color-secondary] transition-colors"
          />
        </div>
      </div>

      {/* Table Section - Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">No</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Nama Lengkap</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">No Telepon</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Jenis Service</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Jam</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Pesan</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredReservations.length > 0 ? (
              filteredReservations.map((res, index) => (
                <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{res.fullName}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{res.phone}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{res.email}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{res.serviceType}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{res.date}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{res.time} WIB</td>
                  <td className="py-4 px-4 text-sm text-gray-500 max-w-xs truncate">{res.notes}</td>
                  <td className="py-4 px-4 text-sm flex gap-2">
                    <button
                      onClick={() => handleEditReservation(res)}
                      className="text-blue-500 hover:text-blue-700 transition-colors p-1 hover:bg-blue-50 rounded"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteReservation(res.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-8 px-4 text-center text-gray-500">
                  Tidak ada data reservasi yang sesuai
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card View - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((res, index) => (
            <div key={res.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-gray-500">No {index + 1}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{res.fullName}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditReservation(res)}
                    className="text-blue-500 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteReservation(res.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 font-semibold">Telepon</p>
                  <p className="text-gray-900 break-all">{res.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Email</p>
                  <p className="text-gray-900 truncate">{res.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Service</p>
                  <p className="text-gray-900">{res.serviceType}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Tanggal & Jam</p>
                  <p className="text-gray-900">{res.date} {res.time}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-500 font-semibold text-sm">Catatan</p>
                <p className="text-gray-900 text-sm mt-1">{res.notes}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada data reservasi yang sesuai</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Total Reservasi: <span className="font-bold text-gray-900">{filteredReservations.length}</span> dari{' '}
          <span className="font-bold text-gray-900">{reservations.length}</span>
        </p>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingReservation ? "Edit Reservasi" : "Tambah Reservasi Baru"}
      >
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

export default DataReservationPage;