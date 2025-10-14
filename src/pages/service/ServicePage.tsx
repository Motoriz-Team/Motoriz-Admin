import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ServicePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect ke halaman Data Layanan
    navigate('/service/data');
  }, [navigate]);

  return null;
};

export default ServicePage;