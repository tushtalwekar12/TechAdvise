import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../features/testimonials/testimonialSlice';

const CLOUDINARY_CLOUD_NAME = 'dflmcqecg';
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_upload';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

const initialForm = { name: '', title: '', image: '', text: '', rating: 5 };

const AdminTestimonialsPage = () => {
  const dispatch = useDispatch();
  const { items: testimonials, loading, error: reduxError } = useSelector(state => state.testimonials);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    setImagePreview('');
    setForm(f => ({ ...f, image: '' }));
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setForm(f => ({ ...f, image: data.secure_url }));
        setImagePreview(data.secure_url);
      } else {
        setUploadError('Image upload failed. Please try again.');
      }
    } catch (err) {
      setUploadError('Image upload failed. Please check your connection.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');
    setUploadError('');
    try {
      if (uploading) return;
      if (!form.name.trim() || !form.title.trim() || !form.text.trim()) {
        setFormError('Name, title, and text are required.');
        return;
      }
      if (!form.image || !/^https?:\/\//.test(form.image)) {
        setUploadError('Please upload a valid image before submitting.');
        return;
      }
      if (form.rating < 1 || form.rating > 5) {
        setFormError('Rating must be between 1 and 5.');
        return;
      }
      if (editingId) {
        const result = await dispatch(updateTestimonial({ id: editingId, testimonialData: form }));
        if (result.error) {
          setFormError(result.error.message || 'Failed to update testimonial.');
          console.error('Update error:', result.error);
          return;
        }
      } else {
        const result = await dispatch(createTestimonial(form));
        if (result.error) {
          setFormError(result.error.message || 'Failed to create testimonial.');
          console.error('Create error:', result.error);
          return;
        }
      }
      setForm(initialForm);
      setEditingId(null);
      setShowForm(false);
      setImagePreview('');
      setUploadError('');
      setFormError('');
    } catch (err) {
      setFormError('Unexpected error: ' + (err.message || err));
      console.error('Unexpected error:', err);
    }
  };

  const handleEdit = testimonial => {
    setForm({
      name: testimonial.name,
      title: testimonial.title,
      image: testimonial.image || '',
      text: testimonial.text,
      rating: testimonial.rating || 5,
    });
    setEditingId(testimonial._id);
    setShowForm(true);
    setImagePreview(testimonial.image || '');
    setUploadError('');
    setFormError('');
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      dispatch(deleteTestimonial(id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Testimonials</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => { setShowForm(true); setForm(initialForm); setEditingId(null); setImagePreview(''); setUploadError(''); setFormError(''); }}
      >
        Add New Testimonial
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-50">
          <input
            className="block mb-2 p-2 w-full border rounded"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="block mb-2 p-2 w-full border rounded"
            name="title"
            placeholder="Title (e.g. CEO, Customer)"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="block mb-2"
            onChange={handleImageChange}
            disabled={uploading}
          />
          {uploading && <p className="text-blue-600">Uploading image...</p>}
          {uploadError && <p className="text-red-600">{uploadError}</p>}
          {(imagePreview || form.image) && (
            <img src={imagePreview || form.image} alt="Preview" className="h-24 mb-2" />
          )}
          <textarea
            className="block mb-2 p-2 w-full border rounded"
            name="text"
            placeholder="Testimonial text"
            value={form.text}
            onChange={handleChange}
            required
          />
          <input
            className="block mb-2 p-2 w-full border rounded"
            name="rating"
            type="number"
            min="1"
            max="5"
            value={form.rating}
            onChange={handleChange}
            required
          />
          {formError && <p className="text-red-600">{formError}</p>}
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" disabled={uploading}>
              {editingId ? 'Update' : 'Create'}
            </button>
            <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => { setShowForm(false); setEditingId(null); setForm(initialForm); setImagePreview(''); setUploadError(''); setFormError(''); }}>
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
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Text</th>
            <th className="p-2 border">Rating</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials && testimonials.length > 0 ? testimonials.map(testimonial => (
            <tr key={testimonial._id} className="border-b">
              <td className="p-2 border">{testimonial.name}</td>
              <td className="p-2 border">{testimonial.title}</td>
              <td className="p-2 border">{testimonial.image ? <img src={testimonial.image} alt="" className="h-12" /> : '—'}</td>
              <td className="p-2 border">{testimonial.text}</td>
              <td className="p-2 border">{testimonial.rating}</td>
              <td className="p-2 border">
                <button className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => handleEdit(testimonial)}>Edit</button>
                <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(testimonial._id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="6" className="text-center p-4">No testimonials found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTestimonialsPage; 