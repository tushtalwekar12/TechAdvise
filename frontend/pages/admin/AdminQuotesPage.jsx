import React, { useEffect, useState } from 'react';

const AdminQuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusUpdating, setStatusUpdating] = useState("");
  const [deleteLoading, setDeleteLoading] = useState("");

  const fetchQuotes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/quotes', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      const data = await res.json();
      if (data.success) {
        setQuotes(data.data);
      } else {
        setError(data.message || "Failed to load quotes.");
      }
    } catch (err) {
      setError("Failed to load quotes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleStatusChange = async (id, status) => {
    setStatusUpdating(id);
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setQuotes(quotes => quotes.map(q => q._id === id ? { ...q, status } : q));
      }
    } finally {
      setStatusUpdating("");
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this quote request?')) return;
    setDeleteLoading(id);
    try {
      await fetch(`/api/quotes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setQuotes(quotes => quotes.filter(q => q._id !== id));
    } finally {
      setDeleteLoading("");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Quote Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.length > 0 ? quotes.map(q => (
              <tr key={q._id} className="border-b">
                <td className="p-2 border">{q.name}</td>
                <td className="p-2 border">{q.email}</td>
                <td className="p-2 border">{q.phone}</td>
                <td className="p-2 border">{q.service}</td>
                <td className="p-2 border">{q.message}</td>
                <td className="p-2 border">
                  <select
                    value={q.status}
                    onChange={e => handleStatusChange(q._id, e.target.value)}
                    disabled={statusUpdating === q._id}
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded"
                    onClick={() => handleDelete(q._id)}
                    disabled={deleteLoading === q._id}
                  >
                    {deleteLoading === q._id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="7" className="text-center p-4">No quote requests found.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminQuotesPage; 