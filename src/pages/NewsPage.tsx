import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../components/common/Modal';
import NewsForm from '../components/news/NewsForm';

// Tipe data
type NewsArticle = {
  id: number;
  date: string;
  image: string; // Properti ini harus selalu string (URL)
  title: string;
  category: string;
  content: string;
};

// Data contoh
const initialNews: NewsArticle[] = [
  { id: 1, date: "24/9/2025", image: "https://via.placeholder.com/150/92c952", title: "By Sarah Miller, Local News Reporter SONOMA", category: "political news", content: "Isi berita pertama di sini..." },
  { id: 2, date: "24/9/2025", image: "https://via.placeholder.com/150/771796", title: "Breaking: New Tech Unveiled at Annual Expo", category: "technology", content: "Isi berita kedua di sini..." },
];

const NewsPage = () => {
  const [news, setNews] = useState<NewsArticle[]>(initialNews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleAddNews = () => {
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  const handleEditNews = (article: NewsArticle) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleDeleteNews = (id: number) => {
    if (window.confirm("Yakin ingin menghapus berita ini?")) {
      setNews(news.filter(n => n.id !== id));
    }
  };

  const handleSaveNews = (articleData: Omit<NewsArticle, 'id' | 'date' | 'image'> & { image?: File | string }) => {
    
    // ===== INI BAGIAN PERBAIKANNYA =====
    const getImageUrl = (imageData: File | string | undefined): string => {
      // Jika datanya adalah object File (upload baru), buat URL sementara
      if (imageData instanceof File) {
        return URL.createObjectURL(imageData);
      }
      // Jika datanya adalah string (URL lama), gunakan langsung
      if (typeof imageData === 'string' && imageData) {
        return imageData;
      }
      // Jika tidak ada gambar, gunakan placeholder
      return "https://via.placeholder.com/150";
    };

    const imageUrl = getImageUrl(articleData.image);
    // ===================================

    if (editingArticle) {
      // Logika UPDATE
      setNews(news.map(n => 
        n.id === editingArticle.id ? { ...editingArticle, ...articleData, image: imageUrl } : n
      ));
    } else {
      // Logika CREATE
      const newArticle: NewsArticle = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-GB'),
        ...articleData,
        image: imageUrl, // Gunakan URL yang sudah pasti string
      };
      setNews([...news, newArticle]);
    }
    handleCloseModal();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      {/* ... Sisa kode JSX Anda (tidak ada perubahan) ... */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">News & Article</h1>
          <p className="text-gray-500 mt-1">Manajemen News & Article</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-600">Total Berita: {news.length}</span>
          <button type="button" onClick={handleAddNews} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600">
            <FaPlus /> Tambah News
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Date Update</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Post Image</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Post Title</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {news.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-900">{article.date}</td>
                <td className="py-4 px-6"><img src={article.image} alt="Post" className="h-10 w-16 object-cover rounded"/></td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 max-w-sm truncate">{article.title}</td>
                <td className="py-4 px-6 text-sm text-gray-500">{article.category}</td>
                <td className="py-4 px-6 text-sm flex gap-2">
                  <button onClick={() => handleEditNews(article)} className="text-blue-500 hover:text-blue-700"><FaEdit size={18} /></button>
                  <button onClick={() => handleDeleteNews(article.id)} className="text-red-500 hover:text-red-700"><FaTrash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingArticle ? "Edit Post" : "Tambah Post Baru"}>
        <NewsForm
          key={editingArticle ? editingArticle.id : 'new-article'}
          onSave={handleSaveNews}
          onCancel={handleCloseModal}
          articleToEdit={editingArticle}
        />
      </Modal>
    </div>
  );
};

export default NewsPage;