import { useState, useEffect, useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from '../../components/common/Modal';
import ProductForm from '../../components/products/ProductForm';
import CategoryModal from '../../components/products/CategoryModal';
import ProductTable from '../../components/products/ProductTable';
import SearchBar from '../../components/common/SearchBar';

type Category = { id: number; name: string; };
type Product = { id: number; category: Category; name: string; price: number; image: string; stock: number; };

const initialCategories: Category[] = [
    { id: 1, name: "Accu" }, { id: 2, name: "Ban" },
    { id: 3, name: "Shockbreaker" }, { id: 4, name: "Kampas Rem" },
];

const SukuCadangListPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const initialProducts: Product[] = [
            { id: 1, category: categories.find(c => c.id === 1)!, name: "GS Astra Premium N50", price: 770000, image: "sparepat.jpg", stock: 15 },
            { id: 3, category: categories.find(c => c.id === 2)!, name: "Maxxis Victra", price: 195000, image: "maxxisvic.jpg", stock: 22 },
        ];
        setProducts(initialProducts);
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const handleCloseProductModal = () => {
        setIsProductModalOpen(false);
        setEditingProduct(null);
    };

    const handleAddProductClick = () => {
        setEditingProduct(null);
        setIsProductModalOpen(true);
    };

    const handleEditProductClick = (product: Product) => {
        setEditingProduct(product);
        setIsProductModalOpen(true);
    };

    const handleDeleteProduct = (id: number) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const handleAddCategory = (name: string) => {
        const newCategory: Category = { id: Date.now(), name };
        setCategories(prevCategories => [...prevCategories, newCategory]);
    };

    const handleDeleteCategory = (id: number) => {
        setCategories(categories.filter(c => c.id !== id));
    };

    const handleSaveProduct = (productData: Omit<Product, 'id' | 'category'> & { categoryId: number }) => {
        const category = categories.find(c => c.id === productData.categoryId);
        if (!category) return;

        if (editingProduct) {
            setProducts(products.map(p =>
                p.id === editingProduct.id ? { ...editingProduct, ...productData, category } : p
            ));
        } else {
            const newProduct: Product = {
                id: Date.now(),
                ...productData,
                category,
            };
            setProducts(prevProducts => [...prevProducts, newProduct]);
        }
        handleCloseProductModal();
    };

    return (
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kategori Suku Cadang</h1>
                    <p className="text-gray-500 text-sm md:text-base mt-1">Manajemen Produk Suku Cadang</p>
                </div>
                <div className="flex gap-2 flex-col sm:flex-row">
                    <button onClick={() => setIsCategoryModalOpen(true)} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors w-full sm:w-auto justify-center">
                        <FaPlus /> Tambah Kategori
                    </button>
                    <button onClick={handleAddProductClick} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors w-full sm:w-auto justify-center">
                        <FaPlus /> Tambah Produk
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Cari berdasarkan nama produk atau kategori..."
                />
            </div>

            <ProductTable
                products={filteredProducts}
                onEdit={handleEditProductClick}
                onDelete={handleDeleteProduct}
            />

            <Modal isOpen={isProductModalOpen} onClose={handleCloseProductModal} title={editingProduct ? "Edit Produk" : "Tambah Produk Baru"}>
                <ProductForm
                    key={editingProduct ? editingProduct.id : 'new-product'}
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

export default SukuCadangListPage;