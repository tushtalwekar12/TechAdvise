import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../features/admin/adminAuthSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(adminLogout());
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard/blogs" className="hover:text-blue-600">Blogs</Link>
          <Link to="/admin/dashboard/testimonials" className="hover:text-blue-600">Testimonials</Link>
          <Link to="/admin/dashboard/services" className="hover:text-blue-600">Services</Link>
          <Link to="/admin/dashboard/about" className="hover:text-blue-600">About/Team</Link>
          <Link to="/admin/dashboard/resources" className="hover:text-blue-600">Resources</Link>
          <Link to="/admin/dashboard/highlights" className="hover:text-blue-600">Highlights</Link>
          <Link to="/admin/dashboard/hero" className="hover:text-blue-600">HomePage Hero</Link>
          <Link to="/admin/dashboard/contact" className="hover:text-blue-600">Contact Info</Link>
          <Link to="/admin/dashboard/footer" className="hover:text-blue-600">Footer</Link>
          <Link to="/admin/dashboard/faq" className="hover:text-blue-600">FAQ</Link>
          <Link to="/admin/dashboard/quotes" className="hover:text-blue-600">Quotes</Link>
          <Link to="/admin/dashboard/contact-forms" className="hover:text-blue-600">Contact Submissions</Link>
           <Link to="/admin/dashboard/intership-page" className="hover:text-blue-600">Intership Form</Link> 
        </nav>
        <button onClick={handleLogout} className="mt-8 bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600">Logout</button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard; 