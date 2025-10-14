import { FaEdit, FaTrash } from 'react-icons/fa';

type Category = { id: number; name: string; };
type Product = { id: number; category: Category; name: string; price: number; image: string; stock: number; };

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  const handleDelete = (id: number) => {
    if (window.confirm("Yakin ingin hapus produk ini?")) {
      onDelete(id);
    }
  };

  return (
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
                <button onClick={() => onEdit(product)} className="text-blue-500 hover:text-blue-700"><FaEdit size={18} /></button>
                <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700"><FaTrash size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;