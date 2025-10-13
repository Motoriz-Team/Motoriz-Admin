import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../../components/common/Modal';
import ProductForm from '../../components/products/ProductForm';
import CategoryModal from '../../components/products/CategoryModal';

// Tipe Data (biarkan seperti ini)
type Category = { id: number; name: string; };
type Product = { id: number; category: Category; name: string; price: number; image: string; stock: number; };

// Data Contoh (biarkan seperti ini)
const initialCategories: Category[] = [
    {id: 1, name: "Accu"}, {id: 2, name: "Ban"},
    {id: 3, name: "Shockbreaker"}, {id: 4, name: "Kampas Rem"},
];

const SukuCadangPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        const initialProducts: Product[] = [
            { id: 1, category: categories.find(c=>c.id===1)!, name: "GS Astra Premium N50", price: 770000, image: "sparepat.jpg", stock: 15 },
            { id: 3, category: categories.find(c=>c.id===2)!, name: "Maxxis Victra", price: 195000, image: "maxxisvic.jpg", stock: 22 },
        ];
        setProducts(initialProducts);
    }, []); // Dijalankan sekali saat komponen dimuat

    const handleCloseProductModal = () => { setIsProductModalOpen(false); setEditingProduct(null); };
    const handleAddProductClick = () => { setEditingProduct(null); setIsProductModalOpen(true); };
    const handleEditProductClick = (product: Product) => { setEditingProduct(product); setIsProductModalOpen(true); };

    const handleAddCategory = (name: string) => {
        const newCategory: Category = { id: Date.now(), name };
        setCategories(prevCategories => [...prevCategories, newCategory]);
    };
    const handleDeleteCategory = (id: number) => {
        setCategories(categories.filter(c => c.id !== id));
    };

    const handleDeleteProduct = (id: number) => {
        if (window.confirm("Yakin ingin hapus produk ini?")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleSaveProduct = (productData: Omit<Product, 'id' | 'category'> & { categoryId: number }) => {
        const category = categories.find(c => c.id === productData.categoryId);
        if (!category) return; // Pastikan kategori ditemukan

        if (editingProduct) {
            // Logika UPDATE
            setProducts(products.map(p => 
                p.id === editingProduct.id ? { ...editingProduct, ...productData, category } : p
            ));
        } else {
            // Logika CREATE
            const newProduct: Product = {
                id: Date.now(), // ID unik sementara
                ...productData,
                category,
            };
            setProducts(prevProducts => [...prevProducts, newProduct]);
        }
        handleCloseProductModal();
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                 <div>
                    <h1 className="text-3xl font-bold text-gray-800">Kategori Suku Cadang</h1>
                    <p className="text-gray-500 mt-1">Manajemen Produk Suku Cadang</p>
                </div>
                <div className="flex gap-2">
                     <button onClick={() => setIsCategoryModalOpen(true)} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-300">
                        <FaPlus /> Tambah Kategori
                    </button>
                    <button onClick={handleAddProductClick} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600">
                        <FaPlus /> Tambah Produk
                    </button>
                </div>
            </div>

            {/* Kode Tabel (Pastikan onClick memanggil fungsi yang benar) */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kategori</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Produk</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product, index) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                                <td className="py-4 px-6 text-sm text-gray-900">{product.category.name}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.name}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">Rp {product.price.toLocaleString('id-ID')}</td>
                                <td className="py-4 px-6 text-sm">{product.stock}</td>
                                <td className="py-4 px-6 text-sm flex gap-2">
                                    <button onClick={() => handleEditProductClick(product)} className="text-blue-500 hover:text-blue-700"><FaEdit size={18} /></button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700"><FaTrash size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isProductModalOpen} onClose={handleCloseProductModal} title={editingProduct ? "Edit Produk" : "Tambah Produk Baru"}>
                <ProductForm 
                    key={editingProduct ? editingProduct.id : 'new-product'} // Penting: untuk mereset form
                    onSave={handleSaveProduct}
                    onCancel={handleCloseProductModal}
                    productToEdit={editingProduct}
                    categories={categories}
                />
            </Modal>

            <CategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                categories={categories}
                onAddCategory={handleAddCategory}
                onDeleteCategory={handleDeleteCategory}
            />
        </div>
    );
};

export default SukuCadangPage;