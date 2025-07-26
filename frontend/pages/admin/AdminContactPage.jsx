import React, { useEffect, useState } from 'react';
import api from '../../utils/api'; // axios instance

const AdminContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, limit: 10 });

  const fetchContacts = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/api/contact?page=${page}&limit=${pagination.limit}`);
      if (res.data.success) {
        setContacts(res.data.data);
        setPagination(res.data.pagination);
      } else {
        setError(res.data.message || 'Failed to fetch contacts');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(pagination.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setStatusUpdating(id);
    try {
      const res = await api.patch(`/api/contact/${id}/status`, { status: newStatus });
      if (res.data.success) {
        setContacts(prev =>
          prev.map(contact =>
            contact._id === id ? { ...contact, status: newStatus } : contact
          )
        );
      }
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Failed to update status. Please try again.');
    } finally {
      setStatusUpdating(null);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchContacts(newPage);
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Contact Form Submissions</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <>
          <table className="w-full table-auto border shadow text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Message</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map(contact => (
                  <tr key={contact._id}>
                    <td className="border p-2">{contact.name}</td>
                    <td className="border p-2">{contact.email}</td>
                    <td className="border p-2">{contact.message}</td>
                    <td className="border p-2">
                      <select
                        value={contact.status}
                        onChange={e => handleStatusChange(contact._id, e.target.value)}
                        disabled={statusUpdating === contact._id}
                        className="border rounded px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </td>
                    <td className="border p-2 text-center">—</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">No contacts found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {pagination.pages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-3 py-1">{pagination.page} / {pagination.pages}</span>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminContactPage;
