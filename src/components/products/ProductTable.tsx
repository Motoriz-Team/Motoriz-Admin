import { FaEdit, FaTrash } from 'react-icons/fa';

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
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Produk</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merk</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
              <td className="py-4 px-6">
                <div className="flex gap-1">
                  {product.images && product.images.length > 0 ? (
                    <>
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="h-12 w-12 object-cover rounded border"
                      />
                      {product.images.length > 1 && (
                        <div className="h-12 w-12 bg-gray-200 rounded border flex items-center justify-center text-xs font-semibold text-gray-600">
                          +{product.images.length - 1}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      No Img
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.name}</td>
              <td className="py-4 px-6 text-sm text-gray-600">{product.brand || '-'}</td>
              <td className="py-4 px-6 text-sm text-gray-900">{product.category.name}</td>
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