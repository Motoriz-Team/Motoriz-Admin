import { useState, useEffect } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

// Tipe data
type Product = { 
  id: number; 
  category: { id: number; name: string }; 
  name: string; 
  brand?: string;
  price: number; 
  images: string[]; 
  stock: number;
  description?: string;
};
type Category = { id: number; name: string; };

type ProductFormProps = {
    productToEdit?: Product | null;
    categories: Category[];
    onSave: (productData: Omit<Product, 'id' | 'category'> & { categoryId: number }) => void;
    onCancel: () => void;
};

const ProductForm = ({ productToEdit, categories, onSave, onCancel }: ProductFormProps) => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(categories[0]?.id || 0);

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setBrand(productToEdit.brand || '');
            setPrice(productToEdit.price);
            setStock(productToEdit.stock);
            setImages(productToEdit.images || []);
            setDescription(productToEdit.description || '');
            setCategoryId(productToEdit.category.id);
        }
    }, [productToEdit]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages: string[] = [];
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push(reader.result as string);
                    if (newImages.length === files.length) {
                        setImages([...images, ...newImages]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!categoryId) {
            alert("Silakan pilih kategori.");
            return;
        }
        
        if (images.length === 0) {
            alert("Silakan upload minimal 1 gambar produk.");
            return;
        }
        
        onSave({ name, brand, price, stock, images, description, categoryId });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-secondary]" 
                    required 
                    placeholder="Contoh: Motor Listrik X1"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Merk</label>
                    <input 
                        type="text" 
                        value={brand} 
                        onChange={e => setBrand(e.target.value)} 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-secondary]" 
                        placeholder="Contoh: Tesla, Honda, dll"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Kategori</label>
                    <select 
                        value={categoryId} 
                        onChange={e => setCategoryId(Number(e.target.value))} 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-secondary]" 
                        required
                    >
                        <option value="">-- Pilih Kategori --</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Harga</label>
                    <input 
                        type="number" 
                        value={price} 
                        onChange={e => setPrice(Number(e.target.value))} 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-secondary]" 
                        required 
                        min="0"
                        placeholder="0"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stok</label>
                    <input 
                        type="number" 
                        value={stock} 
                        onChange={e => setStock(Number(e.target.value))} 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-secondary]" 
                        required 
                        min="0"
                        placeholder="0"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Produk (Multi Upload)</label>
                <div className="space-y-3">
                    {/* Preview Images */}
                    {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {images.map((img, index) => (
                                <div key={index} className="relative group">
                                    <img 
                                        src={img} 
                                        alt={`Product ${index + 1}`} 
                                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Upload Button */}
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[--color-secondary] hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FaPlus className="text-gray-400 text-2xl mb-2" />
                            <p className="text-sm text-gray-500 font-semibold">Upload Gambar</p>
                            <p className="text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB)</p>
                        </div>
                        <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Deskripsi Produk</label>
                <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-secondary]" 
                    rows={4}
                    placeholder="Jelaskan detail produk, spesifikasi, keunggulan, dll..."
                />
            </div>
            
            <div className="mt-6 flex justify-end gap-3 pt-4 border-t">
                <button 
                    type="button" 
                    onClick={onCancel} 
                    className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Batal
                </button>
                <button 
                    type="submit" 
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Simpan
                </button>
            </div>
        </form>
    );
};

export default ProductForm;