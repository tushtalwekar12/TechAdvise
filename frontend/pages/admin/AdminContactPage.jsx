import React, { useEffect, useState } from 'react';

const AdminContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusUpdating, setStatusUpdating] = useState("");

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/contact', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      } else {
        setError(data.message || "Failed to load contacts.");
      }
    } catch (err) {
      setError("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleStatusChange = async (id, status) => {
    setStatusUpdating(id);
    try {
      const res = await fetch(`/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setContacts(contacts => contacts.map(c => c._id === id ? { ...c, status } : c));
      }
    } finally {
      setStatusUpdating("");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Contact Form Submissions</h2>
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
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? contacts.map(c => (
              <tr key={c._id} className="border-b">
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.email}</td>
                <td className="p-2 border">{c.message}</td>
                <td className="p-2 border">
                  <select
                    value={c.status || 'new'}
                    onChange={e => handleStatusChange(c._id, e.target.value)}
                    disabled={statusUpdating === c._id}
                    className="border rounded px-2 py-1"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </td>
                <td className="p-2 border">
                  {/* Optionally add delete or view details here */}
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" className="text-center p-4">No contact submissions found.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminContactPage; 