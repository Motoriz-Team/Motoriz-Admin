import { useNavigate } from 'react-router-dom';
import NewsForm from '../../components/news/NewsForm';

type NewsArticle = {
  title: string;
  category: string;
  content: string;
  image?: File | string;
};

const TambahNewsPage = () => {
  const navigate = useNavigate();

  const handleSaveNews = (articleData: NewsArticle) => {
    // TODO: Kirim data ke backend API
    console.log('Berita baru ditambahkan:', articleData);
    alert('Berita berhasil ditambahkan!');
    navigate('/news/data');
  };

  const handleCancel = () => {
    navigate('/news/data');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tambah Berita Baru</h1>
        <p className="text-gray-500 mt-2">Form untuk mempublikasikan berita dan artikel baru</p>
      </div>

      <NewsForm
        onSave={handleSaveNews}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TambahNewsPage;