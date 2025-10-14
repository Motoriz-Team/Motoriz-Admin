import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TrainingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect ke halaman Data Pelatihan
    navigate('/training/data');
  }, [navigate]);

  return null;
};

export default TrainingPage;