import { useState, useEffect } from 'react';

// Tipe data
type Product = { id: number; category: { id: number; name: string }; name: string; price: number; image: string; stock: number; };
type Category = { id: number; name: string; };

type ProductFormProps = {
    productToEdit?: Product | null;
    categories: Category[];
    onSave: (productData: Omit<Product, 'id' | 'category'> & { categoryId: number }) => void;
    onCancel: () => void;
};

const ProductForm = ({ productToEdit, categories, onSave, onCancel }: ProductFormProps) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState('');
    const [categoryId, setCategoryId] = useState(categories[0]?.id || 0);

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setPrice(productToEdit.price);
            setStock(productToEdit.stock);
            setImage(productToEdit.image);
            setCategoryId(productToEdit.category.id);
        }
    }, [productToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Pastikan categoryId valid sebelum menyimpan
        if (!categoryId) {
            alert("Silakan pilih kategori.");
            return;
        }
        onSave({ name, price, stock, image, categoryId });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Kategori</label>
                <select value={categoryId} onChange={e => setCategoryId(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required>
                    <option value="">-- Pilih Kategori --</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Harga</label>
                <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Stok</label>
                <input type="number" value={stock} onChange={e => setStock(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">Batal</button>
                 <button type="submit" className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Simpan</button>
            </div>
        </form>
    );
};

export default ProductForm;