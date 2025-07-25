import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../features/admin/adminAuthSlice';
import {
  LayoutDashboard,
  LogOut,
  FileText,
  Users,
  Settings,
  BookOpen,
  Star,
  Home,
  Phone,
  HelpCircle,
  Quote,
  Mail
} from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [blogCount, setBlogCount] = useState(0);
  const [internshipCount, setInternshipCount] = useState(0);

  const fetchCounts = async () => {
    try {
      const blogsRes = await axios.get('/api/blog/');
      let blogs = Array.isArray(blogsRes.data)
        ? blogsRes.data
        : blogsRes.data.blogs || blogsRes.data.data || [];
      setBlogCount(blogs.length);

      const internshipsRes = await axios.get('/api/internships/');
      let internships = Array.isArray(internshipsRes.data)
        ? internshipsRes.data
        : internshipsRes.data.internships || internshipsRes.data.data || [];
      setInternshipCount(internships.length);
    } catch (error) {
      setBlogCount(0);
      setInternshipCount(0);
    }
  };

  useEffect(() => {
    if (location.pathname === '/admin/dashboard') {
      fetchCounts();
    }
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(adminLogout());
    window.location.href = '/admin/login';
  };

  const links = [
    { name: 'Dashboard', path: '/admin/dashboard/blogs', icon: LayoutDashboard },
    { name: 'Testimonials', path: '/admin/dashboard/testimonials', icon: Users },
    { name: 'Services', path: '/admin/dashboard/services', icon: Settings },
    { name: 'About/Team', path: '/admin/dashboard/about', icon: Users },
    { name: 'Resources', path: '/admin/dashboard/resources', icon: BookOpen },
    { name: 'Highlights', path: '/admin/dashboard/highlights', icon: Star },
    { name: 'Home Hero', path: '/admin/dashboard/hero', icon: Home },
    { name: 'Internships', path: '/admin/dashboard/intership-page', icon: FileText },
    { name: 'Contact Info', path: '/admin/dashboard/contact', icon: Phone },
    { name: 'Quotes', path: '/admin/dashboard/quotes', icon: Quote },
    { name: 'Blog Posts', path: '/admin/dashboard/blogs', icon: FileText },
    { name: 'Contact Submissions', path: '/admin/dashboard/contact-forms', icon: Mail },
    { name: 'Footer', path: '/admin/dashboard/footer', icon: FileText },
    { name: 'FAQ', path: '/admin/dashboard/faq', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 overflow-x-hidden">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded shadow"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
      </button>

      {/* Sidebar Drawer for mobile, static for md+ */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-200
          md:relative md:translate-x-0 md:flex
          flex-col justify-between
        `}
        style={{ minHeight: '100vh' }}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-2xl"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          &times;
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Admin Panel</h2>
          <nav className="flex flex-col gap-1 text-gray-700">
            {links.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'hover:bg-gray-100'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="text-sm">{name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        {/* Logout Button */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 w-full max-w-full overflow-x-hidden">
        {location.pathname === '/admin/dashboard' && (
          <div className="flex gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex-1 text-center">
              <div className="text-3xl font-bold text-blue-700">{blogCount}</div>
              <div className="text-gray-600 mt-2">Blogs</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex-1 text-center">
              <div className="text-3xl font-bold text-blue-700">{internshipCount}</div>
              <div className="text-gray-600 mt-2">Internships</div>
            </div>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
