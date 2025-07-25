import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from '../../features/blogs/blogSlice';

const CLOUDINARY_CLOUD_NAME = 'dflmcqecg';
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_upload';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

const initialForm = { title: '', description: '', imageUrl: '' ,author:''};

const AdminBlogsPage = () => {
  const dispatch = useDispatch();
  const { items: blogs, loading, error: reduxError } = useSelector(state => state.blogs);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(fetchBlogs());
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
    setForm(f => ({ ...f, imageUrl: '' }));
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
        setForm(f => ({ ...f, imageUrl: data.secure_url }));
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
      if (uploading) return; // Prevent submit while uploading
      if (!form.title.trim() || !form.description.trim()) {
        setFormError('Title and description are required.');
        return;
      }
      if (!form.imageUrl || !/^https?:\/\//.test(form.imageUrl)) {
        setUploadError('Please upload a valid image before submitting.');
        return;
      }
      if (editingId) {
        const result = await dispatch(updateBlog({ id: editingId, blogData: form }));
        if (result.error) {
          setFormError(result.error.message || 'Failed to update blog.');
          console.error('Update error:', result.error);
          return;
        }
      } else {
        const result = await dispatch(createBlog(form));
        if (result.error) {
          setFormError(result.error.message || 'Failed to create blog.');
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

  const handleEdit = blog => {
    setForm({ title: blog.title, description: blog.description, imageUrl: blog.imageUrl || '' });
    setEditingId(blog._id);
    setShowForm(true);
    setImagePreview(blog.imageUrl || '');
    setUploadError('');
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Blogs</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => { setShowForm(true); setForm(initialForm); setEditingId(null); setImagePreview(''); setUploadError(''); }}
      >
        Add New Blog
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
          <textarea
            className="block mb-2 p-2 w-full border rounded"
            name="description"
            placeholder="Description"
            value={form.description}
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
                    <input
            className="block mb-2 p-2 w-full border rounded"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
          />
          {uploading && <p className="text-blue-600">Uploading image...</p>}
          {uploadError && <p className="text-red-600">{uploadError}</p>}
          {formError && <p className="text-red-600">{formError}</p>}
          {(imagePreview || form.imageUrl) && (
            <img src={imagePreview || form.imageUrl} alt="Preview" className="h-24 mb-2" />
          )}
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" disabled={uploading}>
              {editingId ? 'Update' : 'Create'}
            </button>
            <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => { setShowForm(false); setEditingId(null); setForm(initialForm); setImagePreview(''); setUploadError(''); }}>
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
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Image</th>
             <th className="p-2 border">Author</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs && blogs.length > 0 ? blogs.map(blog => (
            <tr key={blog._id} className="border-b">
              <td className="p-2 border">{blog.title}</td>
              <td className="p-2 border">{blog.description}</td>
              <td className="p-2 border">{blog.imageUrl ? <img src={blog.imageUrl} alt="" className="h-12" /> : '—'}</td>
               <td className="p-2 border">{blog.author}</td>
              <td className="p-2 border">
                <button className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => handleEdit(blog)}>Edit</button>
                <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(blog._id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="4" className="text-center p-4">No blogs found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlogsPage; 