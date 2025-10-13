import { useState, useEffect } from 'react';

// Tipe data untuk Pelatihan
type Training = {
  id: number;
  name: string;
  price: number;
  description: string;
  isAvailable: boolean;
};

type TrainingFormProps = {
  trainingToEdit?: Training | null;
  onSave: (trainingData: Omit<Training, 'id'>) => void;
  onCancel: () => void;
};

const TrainingForm = ({ trainingToEdit, onSave, onCancel }: TrainingFormProps) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (trainingToEdit) {
      setName(trainingToEdit.name);
      setPrice(trainingToEdit.price);
      setDescription(trainingToEdit.description);
      setIsAvailable(trainingToEdit.isAvailable);
    } else {
      // Reset form
      setName(''); setPrice(0); setDescription(''); setIsAvailable(true);
    }
  }, [trainingToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, price, description, isAvailable });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama Pelatihan</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Harga</label>
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" rows={3} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Ketersediaan</label>
        <select value={isAvailable.toString()} onChange={e => setIsAvailable(e.target.value === 'true')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required>
          <option value="true">Tersedia</option>
          <option value="false">Tidak Tersedia</option>
        </select>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">Batal</button>
        <button type="submit" className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Simpan</button>
      </div>
    </form>
  );
};

export default TrainingForm;