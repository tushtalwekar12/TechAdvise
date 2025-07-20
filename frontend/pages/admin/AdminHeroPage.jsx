import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroSection, updateHeroSection } from '../../features/heroSection/heroSectionSlice';

const CLOUDINARY_CLOUD_NAME = 'dflmcqecg';
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_upload';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

const AdminHeroPage = () => {
  const dispatch = useDispatch();
  const { content: hero, loading, error: reduxError } = useSelector(state => state.heroSection);
  const [form, setForm] = useState({ title: '', subtitle: '', image: '', ctaText: '', ctaLink: '' });
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(fetchHeroSection());
  }, [dispatch]);

  useEffect(() => {
    if (hero) {
      setForm({
        title: hero.title || '',
        subtitle: hero.subtitle || '',
        image: hero.image || '',
        ctaText: hero.ctaText || '',
        ctaLink: hero.ctaLink || '',
      });
      setImagePreview(hero.image || '');
    }
  }, [hero]);

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
    if (!form.title.trim()) {
      setFormError('Title is required.');
      return;
    }
    if (form.image && !/^https?:\/\//.test(form.image)) {
      setUploadError('Please upload a valid image.');
      return;
    }
    const result = await dispatch(updateHeroSection(form));
    if (result.error) {
      setFormError(result.error.message || 'Failed to update hero section.');
      return;
    }
    setEditing(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage HomePage Hero</h2>
      {loading ? (
        <p>Loading...</p>
      ) : reduxError ? (
        <p className="text-red-600">{reduxError.message || reduxError}</p>
      ) : (
        <>
          {!editing ? (
            <div className="mb-6 bg-gray-50 p-4 rounded border">
              <h3 className="text-lg font-semibold mb-2">Current Hero Section</h3>
              <p><b>Title:</b> {hero?.title}</p>
              <p><b>Subtitle:</b> {hero?.subtitle}</p>
              <p><b>CTA Text:</b> {hero?.ctaText}</p>
              <p><b>CTA Link:</b> {hero?.ctaLink}</p>
              {hero?.image && <img src={hero.image} alt="Hero" className="h-32 my-2 rounded" />}
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setEditing(true)}>
                Edit Hero Section
              </button>
            </div>
          ) : (
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
                name="subtitle"
                placeholder="Subtitle (optional)"
                value={form.subtitle}
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
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="ctaText"
                placeholder="CTA Button Text (optional)"
                value={form.ctaText}
                onChange={handleChange}
              />
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="ctaLink"
                placeholder="CTA Button Link (optional)"
                value={form.ctaLink}
                onChange={handleChange}
              />
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

export default AdminHeroPage; 