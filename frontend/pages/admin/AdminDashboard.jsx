import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
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

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    { name: 'Contact Info', path: '/admin/dashboard/contact', icon: Phone },
    { name: 'Footer', path: '/admin/dashboard/footer', icon: FileText },
    { name: 'FAQ', path: '/admin/dashboard/faq', icon: HelpCircle },
    { name: 'Quotes', path: '/admin/dashboard/quotes', icon: Quote },
    { name: 'Contact Submissions', path: '/admin/dashboard/contact-forms', icon: Mail }
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col justify-between sticky top-0 h-screen">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Admin Panel</h2>
          <nav className="flex flex-col gap-3 text-gray-700">
            {links.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                    isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {name}
              </NavLink>
            ))}
          </nav>
        </div>
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

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Sticky Header */}
        

        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
