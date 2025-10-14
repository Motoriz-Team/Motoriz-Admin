import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReservationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect ke halaman Data Reservasi
    navigate('/reservasi/data');
  }, [navigate]);

  return null;
};

export default ReservationPage;