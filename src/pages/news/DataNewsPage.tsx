import { useState, useMemo } from 'react';
import { FaPlus, FaEdit, FaTrash, FaDownload, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import NewsForm from '../../components/news/NewsForm';

type NewsArticle = {
  id: number;
  date: string;
  image: string;
  title: string;
  category: string;
  content: string;
};

const initialNews: NewsArticle[] = [
  { id: 1, date: "24/9/2025", image: "https://via.placeholder.com/150/92c952", title: "By Sarah Miller, Local News Reporter SONOMA", category: "political news", content: "Isi berita pertama di sini..." },
  { id: 2, date: "24/9/2025", image: "https://via.placeholder.com/150/771796", title: "Breaking: New Tech Unveiled at Annual Expo", category: "technology", content: "Isi berita kedua di sini..." },
  { id: 3, date: "23/9/2025", image: "https://via.placeholder.com/150/b47d5f", title: "Tips Merawat Motor Listrik dengan Benar", category: "tips", content: "Isi berita ketiga di sini..." },
];

const DataNewsPage = () => {
  const [news, setNews] = useState<NewsArticle[]>(initialNews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredNews = useMemo(() => {
    return news.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [news, searchTerm]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
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
    const getImageUrl = (imageData: File | string | undefined): string => {
      if (imageData instanceof File) {
        return URL.createObjectURL(imageData);
      }
      if (typeof imageData === 'string' && imageData) {
        return imageData;
      }
      return "https://via.placeholder.com/150";
    };

    const imageUrl = getImageUrl(articleData.image);

    if (editingArticle) {
      setNews(news.map(n =>
        n.id === editingArticle.id ? { ...editingArticle, ...articleData, image: imageUrl } : n
      ));
    } else {
      const newArticle: NewsArticle = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-GB'),
        ...articleData,
        image: imageUrl,
      };
      setNews([...news, newArticle]);
    }
    handleCloseModal();
  };

  const handleExportExcel = () => {
    const headers = ['No', 'Tanggal', 'Judul', 'Kategori'];
    const rows = filteredNews.map((article, index) => [
      index + 1,
      article.date,
      article.title,
      article.category,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => 
        (typeof cell === 'string' && cell.includes(',')) ? `"${cell}"` : cell
      ).join(',')),
    ].join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
    element.setAttribute('download', `data-berita-${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Data Berita</h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">Kelola semua berita dan artikel yang dipublikasikan</p>
        </div>
        <div className="flex items-center gap-2 flex-col sm:flex-row">
          <span className="font-semibold text-gray-600 text-sm">Total Berita: {filteredNews.length}</span>
          <button
            onClick={handleExportExcel}
            className="bg-[--color-secondary] text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors w-full sm:w-auto justify-center"
          >
            <FaDownload /> Export Excel
          </button>
          <button
            type="button"
            onClick={() => navigate('/news/tambah')}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors w-full sm:w-auto justify-center"
          >
            <FaPlus /> Tambah Berita
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berita berdasarkan judul, kategori, atau konten..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-secondary] transition-colors"
          />
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">No</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Gambar</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredNews.map((article, index) => (
              <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{article.date}</td>
                <td className="py-4 px-6">
                  <img src={article.image} alt="Post" className="h-10 w-16 object-cover rounded" />
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 max-w-sm truncate">{article.title}</td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
                    {article.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm flex gap-2">
                  <button onClick={() => handleEditNews(article)} className="text-blue-500 hover:text-blue-700 transition-colors p-1 hover:bg-blue-50 rounded">
                    <FaEdit size={18} />
                  </button>
                  <button onClick={() => handleDeleteNews(article.id)} className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded">
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredNews.map((article, index) => (
          <div key={article.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500">No {index + 1} • {article.date}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{article.title}</p>
              </div>
              <div className="flex gap-2 ml-2">
                <button onClick={() => handleEditNews(article)} className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded">
                  <FaEdit size={18} />
                </button>
                <button onClick={() => handleDeleteNews(article.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded">
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
            <img src={article.image} alt="Post" className="w-full h-32 object-cover rounded" />
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
              {article.category}
            </span>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingArticle ? "Edit Berita" : "Tambah Berita Baru"}>
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

export default DataNewsPage;