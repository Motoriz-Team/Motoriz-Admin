import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { LogOut, LayoutDashboard, ShoppingBag, Settings, Wrench, GraduationCap, Newspaper, CalendarCheck } from 'lucide-react'; // Import ikon baru

const Sidebar = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  // Cek apakah URL saat ini berada di bawah /products
  const isProductRouteActive = location.pathname.startsWith('/products');

  return (
    <aside className="w-64 bg-brand-dark text-gray-200 p-6 flex flex-col">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-500 mx-auto mb-4"></div>
        <h3 className="font-bold">NAMA ADMIN</h3>
      </div>
      <nav className="flex-grow">
        <ul>
          <li className="mb-2">
            <Link to="/dashboard" className={`flex items-center gap-3 py-2 px-4 rounded-md ${location.pathname === '/dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </li>
          
          {/* MENU PRODUK BARU */}
         <li className="mb-2">
            <button 
              onClick={toggleProductMenu} 
              className={`w-full flex justify-between items-center py-2 px-4 rounded-md text-left ${isProductRouteActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              <span className="flex items-center gap-3"><ShoppingBag size={18} /> Product</span>
              {isProductMenuOpen ? <FaAngleDown /> : <FaAngleRight />}
            </button>
            {isProductMenuOpen && (
              <ul className="pl-8 mt-2 space-y-2">
                {/* KEMBALIKAN LINK SUKU CADANG */}
                <li>
                  <Link 
                    to="/products/suku-cadang" 
                    className={`block py-1 px-2 text-sm rounded-md ${location.pathname === '/products/suku-cadang' ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                  >
                    Suku Cadang
                  </Link>
                </li>
                {/* Anda bisa menambahkan link lain di sini jika perlu */}
              </ul>
            )}
          </li>

          <li className="mb-2"><Link to="/service" className={`flex items-center gap-3 py-2 px-4 rounded-md ${location.pathname === '/service' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}><Wrench size={18} /> Service</Link>  </li>
          <li className="mb-2"><Link to="/training" className={`flex items-center gap-3 py-2 px-4 rounded-md ${location.pathname === '/training' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}><GraduationCap size={18} /> Training</Link></li>
          <li className="mb-2"><Link to="/news" className={`flex items-center gap-3 py-2 px-4 rounded-md ${location.pathname === '/news' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}><Newspaper size={18} /> News</Link></li>
          <li className="mb-2"><Link to="/reservasi" className={`flex items-center gap-3 py-2 px-4 rounded-md ${location.pathname === '/reservasi' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}><CalendarCheck size={18} /> Reservasi</Link></li>
        </ul>
      </nav>
      
      {/* PENGATURAN & LOGOUT */}
      <div className="mt-auto space-y-2">
        <Link to="/settings" className={`flex items-center gap-3 py-2 px-4 rounded-md ${location.pathname === '/settings' ? 'bg-gray-700' : 'hover:bg-gray-700'}`} > <Settings size={18} /> Pengaturan</Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 py-2 px-4 text-red-400 hover:bg-red-900/50 rounded-md">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen"> 
      <Sidebar />
      <main className="flex-grow p-8 bg-gray-100"><Outlet /></main>
    </div>
  );
};

export default AdminLayout;