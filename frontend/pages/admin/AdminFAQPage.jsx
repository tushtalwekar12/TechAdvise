import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ
} from '../../features/faq/faqSlice';

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
    const action = editingId
      ? updateFAQ({ id: editingId, faqData: form })
      : createFAQ(form);

    const result = await dispatch(action);
    if (result.error) {
      setFormError(result.error.message || 'Operation failed.');
      return;
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
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📘 Manage FAQs</h2>

      <button
        className="mb-6 px-5 py-2 bg-blue-400 text-white rounded-xl shadow hover:bg-blue-500 transition"
        onClick={() => {
          setShowForm(true);
          setForm(initialForm);
          setEditingId(null);
          setFormError('');
        }}
      >
        ➕ Add New FAQ
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 sm:p-6 rounded-2xl shadow-md space-y-4">
          <input
            name="question"
            placeholder="Enter question"
            value={form.question}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <textarea
            name="answer"
            placeholder="Enter answer"
            value={form.answer}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {formError && <p className="text-red-600">{formError}</p>}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              {editingId ? '✅ Update' : '✅ Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm(initialForm);
                setFormError('');
              }}
              className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p className="text-gray-500">Loading FAQs...</p>}
      {reduxError && <p className="text-red-600">{reduxError.message || reduxError}</p>}

      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Question</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Answer</th>
              <th className="text-center px-4 py-3 text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs && faqs.length > 0 ? (
              faqs.map(faq => (
                <tr key={faq._id} className="border-t">
                  <td className="px-4 py-3 text-gray-800">{faq.question}</td>
                  <td className="px-4 py-3 text-gray-700">{faq.answer}</td>
                  <td className="px-4 py-3 flex flex-col sm:flex-row justify-center gap-2">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="px-3 py-1 bg-blue-300 text-white rounded-md hover:bg-blue-400 transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(faq._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center px-4 py-6 text-gray-500">
                  No FAQs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFAQPage;
