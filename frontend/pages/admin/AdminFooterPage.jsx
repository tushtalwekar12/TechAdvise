import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFooterContent, updateFooterContent } from '../../features/footer/footerSlice';

const emptyLink = { label: '', url: '' };
const emptySocial = { platform: '', url: '' };

const AdminFooterPage = () => {
  const dispatch = useDispatch();
  const { content: footer, loading, error: reduxError } = useSelector(state => state.footer);
  const [form, setForm] = useState({ copyright: '', links: [], social: [] });
  const [editing, setEditing] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(fetchFooterContent());
  }, [dispatch]);

  useEffect(() => {
    if (footer) {
      setForm({
        copyright: footer.copyright || '',
        links: footer.links && footer.links.length ? footer.links : [emptyLink],
        social: footer.social && footer.social.length ? footer.social : [emptySocial],
      });
    }
  }, [footer]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLinkChange = (idx, e) => {
    const newLinks = [...form.links];
    newLinks[idx][e.target.name] = e.target.value;
    setForm({ ...form, links: newLinks });
  };

  const handleSocialChange = (idx, e) => {
    const newSocial = [...form.social];
    newSocial[idx][e.target.name] = e.target.value;
    setForm({ ...form, social: newSocial });
  };

  const addLink = () => setForm({ ...form, links: [...form.links, { ...emptyLink }] });
  const removeLink = idx => setForm({ ...form, links: form.links.filter((_, i) => i !== idx) });
  const addSocial = () => setForm({ ...form, social: [...form.social, { ...emptySocial }] });
  const removeSocial = idx => setForm({ ...form, social: form.social.filter((_, i) => i !== idx) });

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');
    if (!form.copyright.trim()) {
      setFormError('Copyright is required.');
      return;
    }
    const result = await dispatch(updateFooterContent(form));
    if (result.error) {
      setFormError(result.error.message || 'Failed to update footer.');
      return;
    }
    setEditing(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Footer</h2>
      {loading ? (
        <p>Loading...</p>
      ) : reduxError ? (
        <p className="text-red-600">{reduxError.message || reduxError}</p>
      ) : (
        <>
          {!editing ? (
            <div className="mb-6 bg-gray-50 p-4 rounded border">
              <h3 className="text-lg font-semibold mb-2">Current Footer</h3>
              <p><b>Copyright:</b> {footer?.copyright}</p>
              <div className="mb-2">
                <b>Links:</b>
                <ul className="list-disc ml-6">
                  {footer?.links?.map((l, i) => (
                    <li key={i}>{l.label}: <a href={l.url} className="text-blue-600 underline">{l.url}</a></li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <b>Social:</b>
                <ul className="list-disc ml-6">
                  {footer?.social?.map((s, i) => (
                    <li key={i}>{s.platform}: <a href={s.url} className="text-blue-600 underline">{s.url}</a></li>
                  ))}
                </ul>
              </div>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setEditing(true)}>
                Edit Footer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-50">
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="copyright"
                placeholder="Copyright"
                value={form.copyright}
                onChange={handleChange}
                required
              />
              <div className="mb-4">
                <b>Links:</b>
                {form.links.map((link, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      className="p-2 border rounded w-1/2"
                      name="label"
                      placeholder="Label"
                      value={link.label}
                      onChange={e => handleLinkChange(idx, e)}
                    />
                    <input
                      className="p-2 border rounded w-1/2"
                      name="url"
                      placeholder="URL"
                      value={link.url}
                      onChange={e => handleLinkChange(idx, e)}
                    />
                    <button type="button" className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => removeLink(idx)} disabled={form.links.length === 1}>Remove</button>
                  </div>
                ))}
                <button type="button" className="px-2 py-1 bg-green-500 text-white rounded" onClick={addLink}>Add Link</button>
              </div>
              <div className="mb-4">
                <b>Social:</b>
                {form.social.map((social, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      className="p-2 border rounded w-1/2"
                      name="platform"
                      placeholder="Platform"
                      value={social.platform}
                      onChange={e => handleSocialChange(idx, e)}
                    />
                    <input
                      className="p-2 border rounded w-1/2"
                      name="url"
                      placeholder="URL"
                      value={social.url}
                      onChange={e => handleSocialChange(idx, e)}
                    />
                    <button type="button" className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => removeSocial(idx)} disabled={form.social.length === 1}>Remove</button>
                  </div>
                ))}
                <button type="button" className="px-2 py-1 bg-green-500 text-white rounded" onClick={addSocial}>Add Social</button>
              </div>
              {formError && <p className="text-red-600">{formError}</p>}
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Save
                </button>
                <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => { setEditing(false); setFormError(''); }}>
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

export default AdminFooterPage; 