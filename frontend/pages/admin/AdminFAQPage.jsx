import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFAQs, createFAQ, updateFAQ, deleteFAQ } from '../../features/faq/faqSlice';

const initialForm = { question: '', answer: '' };

const AdminFAQPage = () => {
  const dispatch = useDispatch();
  const { items: faqs, loading, error: reduxError } = useSelector(state => state.faq);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');
    if (!form.question.trim() || !form.answer.trim()) {
      setFormError('Both question and answer are required.');
      return;
    }
    if (editingId) {
      const result = await dispatch(updateFAQ({ id: editingId, faqData: form }));
      if (result.error) {
        setFormError(result.error.message || 'Failed to update FAQ.');
        return;
      }
    } else {
      const result = await dispatch(createFAQ(form));
      if (result.error) {
        setFormError(result.error.message || 'Failed to create FAQ.');
        return;
      }
    }
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
    setFormError('');
  };

  const handleEdit = faq => {
    setForm({ question: faq.question, answer: faq.answer });
    setEditingId(faq._id);
    setShowForm(true);
    setFormError('');
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      dispatch(deleteFAQ(id));
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage FAQ</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => { setShowForm(true); setForm(initialForm); setEditingId(null); setFormError(''); }}
      >
        Add New FAQ
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-50">
          <input
            className="block mb-2 p-2 w-full border rounded"
            name="question"
            placeholder="Question"
            value={form.question}
            onChange={handleChange}
            required
          />
          <textarea
            className="block mb-2 p-2 w-full border rounded"
            name="answer"
            placeholder="Answer"
            value={form.answer}
            onChange={handleChange}
            required
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
            <th className="p-2 border">Question</th>
            <th className="p-2 border">Answer</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs && faqs.length > 0 ? faqs.map(faq => (
            <tr key={faq._id} className="border-b">
              <td className="p-2 border">{faq.question}</td>
              <td className="p-2 border">{faq.answer}</td>
              <td className="p-2 border">
                <button className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => handleEdit(faq)}>Edit</button>
                <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(faq._id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="3" className="text-center p-4">No FAQs found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFAQPage; 