import { useState, useEffect, useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from '../../components/common/Modal';
import ProductForm from '../../components/products/ProductForm';
import CategoryModal from '../../components/products/CategoryModal';
import ProductTable from '../../components/products/ProductTable';
import SearchBar from '../../components/common/SearchBar';

type Category = { id: number; name: string; };
type Product = { 
  id: number; 
  category: Category; 
  name: string; 
  brand?: string;
  price: number; 
  images: string[]; 
  stock: number;
  description?: string;
};

const initialCategories: Category[] = [
    { id: 1, name: "Helm" },
    { id: 2, name: "Jaket" },
    { id: 3, name: "Sarung Tangan" },
    { id: 4, name: "Sepatu" },
];

const ApparelPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

    useEffect(() => {
        const initialProducts: Product[] = [
            { 
              id: 1, 
              category: categories.find(c => c.id === 1)!, 
              name: "Helm Safety Pro Black", 
              brand: "KYT",
              price: 450000, 
              images: ["helm.jpg"], 
              stock: 20,
              description: "Helm full face dengan standar SNI dan DOT, dilengkapi double visor"
            },
            { 
              id: 2, 
              category: categories.find(c => c.id === 2)!, 
              name: "Jaket Riding Premium", 
              brand: "Alpinestars",
              price: 650000, 
              images: ["jaket.jpg"], 
              stock: 15,
              description: "Jaket riding dengan protector di siku, bahu, dan punggung. Waterproof dan breathable"
            },
            { 
              id: 3, 
              category: categories.find(c => c.id === 3)!, 
              name: "Sarung Tangan Kulit", 
              brand: "Taichi",
              price: 185000, 
              images: ["gloves.jpg"], 
              stock: 30,
              description: "Sarung tangan kulit asli dengan protector knuckle, nyaman dan tahan lama"
            },
        ];
        setProducts(initialProducts);
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const matchesCategory = selectedCategory === 'all' || product.category.id === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

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
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kategori Apparel</h1>
                    <p className="text-gray-500 text-sm md:text-base mt-1">Manajemen Produk Apparel</p>
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
                    placeholder="Cari berdasarkan nama produk, kategori, atau merk..."
                />
            </div>

            {/* Filter Kategori */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            selectedCategory === 'all'
                                ? 'bg-blue-200 text-blue-800'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Semua ({products.length})
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                selectedCategory === category.id
                                    ? 'bg-blue-200 text-blue-800'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {category.name} ({products.filter(p => p.category.id === category.id).length})
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 border-l-4 border-[--color-secondary] p-4 rounded">
                    <p className="text-gray-600 text-sm">Produk Ditampilkan</p>
                    <p className="text-2xl font-bold text-[--color-secondary]">{filteredProducts.length}</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <p className="text-gray-600 text-sm">Total Nilai Stok</p>
                    <p className="text-2xl font-bold text-green-600">
                        Rp {filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString('id-ID')}
                    </p>
                </div>
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

export default ApparelPage;