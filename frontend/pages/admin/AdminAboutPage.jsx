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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleContactChange = e => {
    setForm({ ...form, contact: { ...form.contact, [e.target.name]: e.target.value } });
  };
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
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage About & Team</h2>
      {loading ? (
        <p>Loading...</p>
      ) : reduxError ? (
        <p className="text-red-600">{reduxError.message || reduxError}</p>
      ) : (
        <>
          {!editing ? (
            <div className="mb-6 bg-gray-100 p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Current About Page</h3>
              <p className="mb-2"><b>Mission:</b> {content?.mission}</p>
              <p className="mb-2"><b>Values:</b> {content?.values}</p>
              <div className="mb-2">
                <b>Team:</b>
                <ul className="list-disc ml-6 mt-1">
                  {content?.team?.map((m, i) => (
                    <li key={i} className="mb-1">
                      {m.name} ({m.role})
                      {m.image && <img src={m.image} alt={m.name} className="inline h-8 w-8 rounded-full ml-2 border border-gray-300" />}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <b>Contact:</b> {content?.contact?.email} | {content?.contact?.phone}
              </div>
              <button
                className="mt-2 px-5 py-2 bg-blue-200 text-blue-900 rounded hover:bg-blue-300 transition"
                onClick={() => setEditing(true)}
              >
                Edit About Page
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mb-4 p-6 border rounded-xl bg-gray-50 shadow">
              <textarea
                className="block mb-4 p-3 w-full border rounded-lg focus:outline-blue-300"
                name="mission"
                placeholder="Mission"
                value={form.mission}
                onChange={handleChange}
                required
              />
              <textarea
                className="block mb-4 p-3 w-full border rounded-lg focus:outline-blue-300"
                name="values"
                placeholder="Values"
                value={form.values}
                onChange={handleChange}
                required
              />
              <h3 className="font-semibold text-gray-700 mt-6 mb-3">Team Members</h3>
              {form.team.map((member, idx) => (
                <div key={idx} className="flex flex-wrap gap-3 mb-4 items-center">
                  <input
                    className="p-2 border rounded w-full sm:w-1/4"
                    name="name"
                    placeholder="Name"
                    value={member.name}
                    onChange={e => handleTeamChange(idx, e)}
                  />
                  <input
                    className="p-2 border rounded w-full sm:w-1/4"
                    name="role"
                    placeholder="Role"
                    value={member.role}
                    onChange={e => handleTeamChange(idx, e)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="block"
                    onChange={e => handleImageChange(idx, e)}
                    disabled={uploadingIdx === idx}
                  />
                  {uploadingIdx === idx && <span className="text-blue-600">Uploading...</span>}
                  {member.image && <img src={member.image} alt="Preview" className="h-10 w-10 rounded-full border border-gray-300" />}
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                    onClick={() => removeTeamMember(idx)}
                    disabled={form.team.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 mb-6"
                onClick={addTeamMember}
              >
                Add Team Member
              </button>

              <h3 className="font-semibold text-gray-700 mb-2">Contact Info</h3>
              <input
                className="block mb-3 p-3 w-full border rounded-lg"
                name="email"
                placeholder="Contact Email"
                value={form.contact.email}
                onChange={handleContactChange}
                required
              />
              <input
                className="block mb-4 p-3 w-full border rounded-lg"
                name="phone"
                placeholder="Contact Phone"
                value={form.contact.phone}
                onChange={handleContactChange}
                required
              />

              {formError && <p className="text-red-600 mb-2">{formError}</p>}
              {uploadError && <p className="text-red-600 mb-2">{uploadError}</p>}

              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition"
                  disabled={!!uploadingIdx}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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
