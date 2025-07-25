import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactInfo, updateContactInfo } from '../../features/contactInfo/contactInfoSlice';

const CLOUDINARY_CLOUD_NAME = 'dflmcqecg';
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_upload';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

const AdminContactInfoPage = () => {
  const dispatch = useDispatch();
  const { content: info, loading, error: reduxError } = useSelector(state => state.contactInfo);
  const [form, setForm] = useState({ address: '', email: '', phone: '', mapEmbedUrl: '', image: '' });
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(fetchContactInfo());
  }, [dispatch]);

  useEffect(() => {
    if (info) {
      setForm({
        address: info.address || '',
        email: info.email || '',
        phone: info.phone || '',
        mapEmbedUrl: info.mapEmbedUrl || '',
        image: info.image || '',
      });
      setImagePreview(info.image || '');
    }
  }, [info]);

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
    if (!form.email.trim() || !form.phone.trim()) {
      setFormError('Email and phone are required.');
      return;
    }
    const result = await dispatch(updateContactInfo(form));
    if (result.error) {
      setFormError(result.error.message || 'Failed to update contact info.');
      return;
    }
    setEditing(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">📞 Manage Contact Info</h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : reduxError ? (
        <p className="text-red-600 text-center">{reduxError.message || reduxError}</p>
      ) : (
        <>
          {!editing ? (
            <div className="mb-6 bg-gray-100 p-6 rounded-lg border border-gray-300">
              <h3 className="text-xl font-semibold mb-4">📋 Current Contact Info</h3>
              <p className="mb-2"><strong>Email:</strong> {info?.email}</p>
              <p className="mb-2"><strong>Phone:</strong> {info?.phone}</p>
              <p className="mb-2"><strong>Address:</strong> {info?.address}</p>
              <p className="mb-2"><strong>Map Embed URL:</strong> {info?.mapEmbedUrl}</p>
              {info?.image && <img src={info.image} alt="Contact" className="h-32 my-4 rounded-lg shadow" />}
              <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition" onClick={() => setEditing(true)}>
                ✏️ Edit Contact Info
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-6 border rounded-lg shadow">
              <input
                className="block p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="block p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                className="block p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="address"
                placeholder="Address (optional)"
                value={form.address}
                onChange={handleChange}
              />
              <input
                className="block p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="mapEmbedUrl"
                placeholder="Map Embed URL (optional)"
                value={form.mapEmbedUrl}
                onChange={handleChange}
              />
              <input
                type="file"
                accept="image/*"
                className="block p-2 border rounded bg-white"
                onChange={handleImageChange}
                disabled={uploading}
              />
              {uploading && <p className="text-blue-600">Uploading image...</p>}
              {uploadError && <p className="text-red-600">{uploadError}</p>}
              {(imagePreview || form.image) && (
                <img src={imagePreview || form.image} alt="Preview" className="h-32 rounded-lg shadow" />
              )}
              {formError && <p className="text-red-600">{formError}</p>}
              <div className="flex gap-4 pt-2">
                <button type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition" disabled={uploading}>
                  💾 Save
                </button>
                <button type="button" className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition" onClick={() => { setEditing(false); setFormError(''); setUploadError(''); }}>
                  ❌ Cancel
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default AdminContactInfoPage;