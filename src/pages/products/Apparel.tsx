import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from '../../components/common/Modal';
import ProductForm from '../../components/products/ProductForm';
import CategoryModal from '../../components/products/CategoryModal';
import ProductTable from '../../components/products/ProductTable';

// Tipe Data
type Category = { id: number; name: string; };
type Product = { id: number; category: Category; name: string; price: number; image: string; stock: number; };

// Data Contoh Kategori Apparel
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

    useEffect(() => {
        const initialProducts: Product[] = [
            { id: 1, category: categories.find(c => c.id === 1)!, name: "Helm Safety Pro Black", price: 450000, image: "helm.jpg", stock: 20 },
            { id: 2, category: categories.find(c => c.id === 2)!, name: "Jaket Riding Premium", price: 650000, image: "jaket.jpg", stock: 15 },
            { id: 3, category: categories.find(c => c.id === 3)!, name: "Sarung Tangan Kulit", price: 185000, image: "gloves.jpg", stock: 30 },
        ];
        setProducts(initialProducts);
    }, []);

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
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Kategori Apparel</h1>
                    <p className="text-gray-500 mt-1">Manajemen Produk Apparel</p>
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

            <ProductTable
                products={products}
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