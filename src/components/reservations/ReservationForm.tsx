import { useState, useEffect } from 'react';

// Tipe data untuk Reservasi
type Reservation = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  date: string; // Format YYYY-MM-DD
  time: string; // Format HH:MM
  notes: string;
};

type ReservationFormProps = {
  reservationToEdit?: Reservation | null;
  onSave: (reservationData: Omit<Reservation, 'id'>) => void;
  onCancel: () => void;
};

const ReservationForm = ({ reservationToEdit, onSave, onCancel }: ReservationFormProps) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (reservationToEdit) {
      setFullName(reservationToEdit.fullName);
      setPhone(reservationToEdit.phone);
      setEmail(reservationToEdit.email);
      setServiceType(reservationToEdit.serviceType);
      setDate(reservationToEdit.date);
      setTime(reservationToEdit.time);
      setNotes(reservationToEdit.notes);
    } else {
      // Reset form
      setFullName(''); setPhone(''); setEmail(''); setServiceType('');
      setDate(''); setTime(''); setNotes('');
    }
  }, [reservationToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ fullName, phone, email, serviceType, date, time, notes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">No Telepon</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Jenis Service</label>
        <input type="text" value={serviceType} onChange={e => setServiceType(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tanggal</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Jam</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
        </div>
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-700">Pesan Catatan</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" rows={3} />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">Batal</button>
        <button type="submit" className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Simpan</button>
      </div>
    </form>
  );
};

export default ReservationForm;