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
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Contact Info</h2>
      {loading ? (
        <p>Loading...</p>
      ) : reduxError ? (
        <p className="text-red-600">{reduxError.message || reduxError}</p>
      ) : (
        <>
          {!editing ? (
            <div className="mb-6 bg-gray-50 p-4 rounded border">
              <h3 className="text-lg font-semibold mb-2">Current Contact Info</h3>
              <p><b>Email:</b> {info?.email}</p>
              <p><b>Phone:</b> {info?.phone}</p>
              <p><b>Address:</b> {info?.address}</p>
              <p><b>Map Embed URL:</b> {info?.mapEmbedUrl}</p>
              {info?.image && <img src={info.image} alt="Contact" className="h-24 my-2 rounded" />}
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setEditing(true)}>
                Edit Contact Info
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-50">
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="address"
                placeholder="Address (optional)"
                value={form.address}
                onChange={handleChange}
              />
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="mapEmbedUrl"
                placeholder="Map Embed URL (optional)"
                value={form.mapEmbedUrl}
                onChange={handleChange}
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
              {formError && <p className="text-red-600">{formError}</p>}
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" disabled={uploading}>
                  Save
                </button>
                <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => { setEditing(false); setFormError(''); setUploadError(''); }}>
                  Cancel
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