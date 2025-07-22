import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHighlights, createHighlight, updateHighlight, deleteHighlight } from '../../features/highlights/highlightsSlice';

const initialForm = { title: '', label: '', description: '', icon: '' };

const AdminHighlightsPage = () => {
  const dispatch = useDispatch();
  const { items: highlights, loading, error: reduxError } = useSelector(state => state.highlights);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(fetchHighlights());
  }, [dispatch]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');
    if (!form.title.trim()) {
      setFormError('Title is required.');
      return;
    }
    if (!form.label.trim()) {
      setFormError('Label is required.');
      return;
    }
    if (editingId) {
      const result = await dispatch(updateHighlight({ id: editingId, highlightData: form }));
      if (result.error) {
        setFormError(result.error.message || 'Failed to update highlight.');
        return;
      }
    } else {
      const result = await dispatch(createHighlight(form));
      if (result.error) {
        setFormError(result.error.message || 'Failed to create highlight.');
        return;
      }
    }
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
    setFormError('');
  };

  const handleEdit = highlight => {
    setForm({
      title: highlight.title,
      label: highlight.label || '',
      description: highlight.description || '',
      icon: highlight.icon || '',
    });
    setEditingId(highlight._id);
    setShowForm(true);
    setFormError('');
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this highlight?')) {
      dispatch(deleteHighlight(id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Highlights</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => { setShowForm(true); setForm(initialForm); setEditingId(null); setFormError(''); }}
      >
        Add New Highlight
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-50">
          <input
            className="block mb-2 p-2 w-full border rounded"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            className="block mb-2 p-2 w-full border rounded"
            name="label"
            placeholder="Label (e.g. IT Services)"
            value={form.label}
            onChange={handleChange}
            required
          />
          <input
            className="block mb-2 p-2 w-full border rounded"
            name="icon"
            placeholder="Icon name or URL (optional)"
            value={form.icon}
            onChange={handleChange}
          />
          <textarea
            className="block mb-2 p-2 w-full border rounded"
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
          />
          {formError && <p className="text-red-600">{formError}</p>}
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              {editingId ? 'Update' : 'Create'}
            </button>
            <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => { setShowForm(false); setEditingId(null); setForm(initialForm); setFormError(''); }}>
              Cancel
            </button>
          </div>
        </form>
      )}
      {loading && <p>Loading...</p>}
      {reduxError && <p className="text-red-600">{reduxError.message || reduxError}</p>}
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Label</th>
            <th className="p-2 border">Icon</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {highlights && highlights.length > 0 ? highlights.map(highlight => (
            <tr key={highlight._id} className="border-b">
              <td className="p-2 border">{highlight.title}</td>
              <td className="p-2 border">{highlight.label || '—'}</td>
              <td className="p-2 border">{highlight.icon ? (
                highlight.icon.startsWith('http') ? <img src={highlight.icon} alt="icon" className="h-8 inline" /> : highlight.icon
              ) : '—'}</td>
              <td className="p-2 border">{highlight.description}</td>
              <td className="p-2 border">
                <button className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => handleEdit(highlight)}>Edit</button>
                <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(highlight._id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" className="text-center p-4">No highlights found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHighlightsPage; 