const lowStockProducts = [
    { name: "Kampas Rem Brembo", stock: 2 },
    { name: "Shockbreaker Ohlins", stock: 5 },
    { name: "Accu Nagoya N980L", stock: 8 },
];

const StockWidget = () => {
    return (
        // HAPUS style={{ backgroundColor: 'red' }} DARI SINI
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h3 className="font-bold text-lg text-gray-700 mb-4">Produk Stok Menipis</h3>
            <table className="w-full">
                {/* ... (sisa kode tidak ada perubahan, sudah benar) ... */}
                 <thead>
                    <tr className="border-b">
                        <th className="text-left text-sm font-semibold text-gray-500 pb-2">Nama Produk</th>
                        <th className="text-right text-sm font-semibold text-gray-500 pb-2">Sisa Stok</th>
                    </tr>
                </thead>
                <tbody>
                    {lowStockProducts.map((product) => (
                        // Saran: Gunakan key yang unik dari data, bukan index
                        <tr key={product.name}>
                            <td className="py-2 text-sm text-gray-600 border-t">{product.name}</td>
                            <td className="py-2 text-sm text-right font-bold text-[--color-brand-red] border-t">{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockWidget;