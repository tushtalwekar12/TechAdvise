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
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage About & Team</h2>
      {loading ? (
        <p>Loading...</p>
      ) : reduxError ? (
        <p className="text-red-600">{reduxError.message || reduxError}</p>
      ) : (
        <>
          {!editing ? (
            <div className="mb-6 bg-gray-50 p-4 rounded border">
              <h3 className="text-lg font-semibold mb-2">Current About Page</h3>
              <p><b>Mission:</b> {content?.mission}</p>
              <p><b>Values:</b> {content?.values}</p>
              <div className="mb-2">
                <b>Team:</b>
                <ul className="list-disc ml-6">
                  {content?.team?.map((m, i) => (
                    <li key={i}>{m.name} ({m.role}) {m.image && <img src={m.image} alt={m.name} className="inline h-8 w-8 rounded-full ml-2" />}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <b>Contact:</b> {content?.contact?.email} | {content?.contact?.phone}
              </div>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setEditing(true)}>
                Edit About Page
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-50">
              <textarea
                className="block mb-2 p-2 w-full border rounded"
                name="mission"
                placeholder="Mission"
                value={form.mission}
                onChange={handleChange}
                required
              />
              <textarea
                className="block mb-2 p-2 w-full border rounded"
                name="values"
                placeholder="Values"
                value={form.values}
                onChange={handleChange}
                required
              />
              <h3 className="font-semibold mt-4 mb-2">Team Members</h3>
              {form.team.map((member, idx) => (
                <div key={idx} className="flex gap-2 mb-2 items-center">
                  <input
                    className="p-2 border rounded w-1/3"
                    name="name"
                    placeholder="Name"
                    value={member.name}
                    onChange={e => handleTeamChange(idx, e)}
                  />
                  <input
                    className="p-2 border rounded w-1/3"
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
                  {member.image && <img src={member.image} alt="Preview" className="h-10 w-10 rounded-full" />}
                  <button type="button" className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => removeTeamMember(idx)} disabled={form.team.length === 1}>Remove</button>
                </div>
              ))}
              <button type="button" className="px-2 py-1 bg-green-500 text-white rounded" onClick={addTeamMember}>Add Team Member</button>
              <h3 className="font-semibold mt-4 mb-2">Contact Info</h3>
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="email"
                placeholder="Contact Email"
                value={form.contact.email}
                onChange={handleContactChange}
                required
              />
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="phone"
                placeholder="Contact Phone"
                value={form.contact.phone}
                onChange={handleContactChange}
                required
              />
              {formError && <p className="text-red-600">{formError}</p>}
              {uploadError && <p className="text-red-600">{uploadError}</p>}
              <div className="flex gap-2 mt-4">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" disabled={!!uploadingIdx}>
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

export default AdminAboutPage; 