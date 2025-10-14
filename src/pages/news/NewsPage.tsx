import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect ke halaman Data Berita
    navigate('/news/data');
  }, [navigate]);

  return null;
};

export default NewsPage;