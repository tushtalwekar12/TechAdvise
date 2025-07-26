import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutPageContent, updateAboutPageContent } from '../../features/aboutPage/aboutPageSlice';

const CLOUDINARY_CLOUD_NAME = 'dflmcqecg';
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_upload';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

const emptyMember = { name: '', role: '', image: '' };

const AdminAboutPage = () => {
  const dispatch = useDispatch();
  const { content, loading, error: reduxError } = useSelector(state => state.aboutPage);
  const [form, setForm] = useState({ mission: '', values: '', team: [emptyMember], contact: { email: '', phone: '' } });
  const [editing, setEditing] = useState(false);
  const [formError, setFormError] = useState('');
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    dispatch(fetchAboutPageContent());
  }, [dispatch]);

  useEffect(() => {
    if (content) {
      setForm({
        mission: content.mission || '',
        values: content.values || '',
        team: content.team && content.team.length ? content.team : [emptyMember],
        contact: content.contact || { email: '', phone: '' },
      });
    }
  }, [content]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleContactChange = e => setForm({ ...form, contact: { ...form.contact, [e.target.name]: e.target.value } });

  const handleTeamChange = (idx, e) => {
    const newTeam = [...form.team];
    newTeam[idx][e.target.name] = e.target.value;
    setForm({ ...form, team: newTeam });
  };

  const addTeamMember = () => setForm({ ...form, team: [...form.team, { ...emptyMember }] });
  const removeTeamMember = idx => setForm({ ...form, team: form.team.filter((_, i) => i !== idx) });

  const handleImageChange = async (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingIdx(idx);
    setUploadError('');
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
        const newTeam = [...form.team];
        newTeam[idx].image = data.secure_url;
        setForm(f => ({ ...f, team: newTeam }));
      } else {
        setUploadError('Image upload failed. Please try again.');
      }
    } catch (err) {
      setUploadError('Image upload failed. Please check your connection.');
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');
    setUploadError('');
    if (!form.mission.trim() || !form.values.trim()) {
      setFormError('Mission and values are required.');
      return;
    }
    if (!form.contact.email.trim() || !form.contact.phone.trim()) {
      setFormError('Contact email and phone are required.');
      return;
    }
    const result = await dispatch(updateAboutPageContent(form));
    if (result.error) {
      setFormError(result.error.message || 'Failed to update about page.');
      return;
    }
    setEditing(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-lg mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Manage About & Team Page</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : reduxError ? (
        <p className="text-red-600 text-center">{reduxError.message || reduxError}</p>
      ) : (
        <>
          {!editing ? (
            <div className="mb-6 bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Current About Page Content</h3>
              <p className="mb-2 text-gray-700"><b>Mission:</b> {content?.mission}</p>
              <p className="mb-4 text-gray-700"><b>Values:</b> {content?.values}</p>
              <div className="mb-4">
                <b className="text-gray-700">Team:</b>
                <ul className="list-disc ml-6">
                  {content?.team?.map((m, i) => (
                    <li key={i} className="flex items-center gap-3 my-2">
                      <span className="text-gray-800">{m.name} ({m.role})</span>
                      {m.image && <img src={m.image} alt={m.name} className="h-8 w-8 rounded-full border" />}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2 text-gray-700">
                <b>Contact:</b> {content?.contact?.email} | {content?.contact?.phone}
              </div>
              <button
                className="mt-4 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow transition-all"
                onClick={() => setEditing(true)}
              >
                Edit About Page
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-gray-50 p-6 rounded-lg shadow">
              <textarea
                className="block p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="mission"
                placeholder="Mission"
                value={form.mission}
                onChange={handleChange}
                required
              />
              <textarea
                className="block p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="values"
                placeholder="Values"
                value={form.values}
                onChange={handleChange}
                required
              />
              <h3 className="text-lg font-semibold mt-6 mb-2 text-blue-800">Team Members</h3>
              {form.team.map((member, idx) => (
                <div key={idx} className="flex flex-wrap gap-3 items-center mb-3 bg-white p-4 rounded border border-gray-200 shadow-sm">
                  <input
                    className="p-2 border border-gray-300 rounded w-full md:w-1/3"
                    name="name"
                    placeholder="Name"
                    value={member.name}
                    onChange={e => handleTeamChange(idx, e)}
                  />
                  <input
                    className="p-2 border border-gray-300 rounded w-full md:w-1/3"
                    name="role"
                    placeholder="Role"
                    value={member.role}
                    onChange={e => handleTeamChange(idx, e)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full md:w-auto"
                    onChange={e => handleImageChange(idx, e)}
                    disabled={uploadingIdx === idx}
                  />
                  {uploadingIdx === idx && <span className="text-blue-600">Uploading...</span>}
                  {member.image && <img src={member.image} alt="Preview" className="h-10 w-10 rounded-full" />}
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded transition-all"
                    onClick={() => removeTeamMember(idx)}
                    disabled={form.team.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white rounded shadow"
                onClick={addTeamMember}
              >
                Add Team Member
              </button>

              <h3 className="text-lg font-semibold mt-6 mb-2 text-blue-800">Contact Info</h3>
              <input
                className="block mb-2 p-3 w-full border border-gray-300 rounded"
                name="email"
                placeholder="Contact Email"
                value={form.contact.email}
                onChange={handleContactChange}
                required
              />
              <input
                className="block mb-2 p-3 w-full border border-gray-300 rounded"
                name="phone"
                placeholder="Contact Phone"
                value={form.contact.phone}
                onChange={handleContactChange}
                required
              />

              {formError && <p className="text-red-600">{formError}</p>}
              {uploadError && <p className="text-red-600">{uploadError}</p>}

              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
                  disabled={!!uploadingIdx}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded shadow"
                  onClick={() => {
                    setEditing(false);
                    setFormError('');
                    setUploadError('');
                  }}
                >
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

export default AdminAboutPage;
