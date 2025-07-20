import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicePageContent, updateServicePageContent } from '../../features/servicePage/servicePageSlice';

const emptyService = { title: '', description: '', icon: '' };
const emptyBenefit = { title: '', description: '', icon: '' };
const emptyProcess = { title: '', description: '' };
const emptyCtaButton = { label: '', link: '' };

const AdminServicesPage = () => {
  const dispatch = useDispatch();
  const { content, loading, error: reduxError } = useSelector(state => state.servicePage);
  const [form, setForm] = useState({
    hero: { title: '', subtitle: '', image: '' },
    services: [emptyService],
    benefits: [emptyBenefit],
    processSteps: [emptyProcess],
    cta: { title: '', subtitle: '', buttons: [emptyCtaButton] },
  });
  const [editing, setEditing] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(fetchServicePageContent());
  }, [dispatch]);

  useEffect(() => {
    if (content) {
      setForm({
        hero: content.hero || { title: '', subtitle: '', image: '' },
        services: content.services && content.services.length ? content.services : [emptyService],
        benefits: content.benefits && content.benefits.length ? content.benefits : [emptyBenefit],
        processSteps: content.processSteps && content.processSteps.length ? content.processSteps : [emptyProcess],
        cta: content.cta || { title: '', subtitle: '', buttons: [emptyCtaButton] },
      });
    }
  }, [content]);

  // Handlers for hero
  const handleHeroChange = e => {
    setForm({ ...form, hero: { ...form.hero, [e.target.name]: e.target.value } });
  };

  // Handlers for services
  const handleServiceChange = (idx, e) => {
    const newServices = [...form.services];
    newServices[idx][e.target.name] = e.target.value;
    setForm({ ...form, services: newServices });
  };
  const addService = () => setForm({ ...form, services: [...form.services, { ...emptyService }] });
  const removeService = idx => setForm({ ...form, services: form.services.filter((_, i) => i !== idx) });

  // Handlers for benefits
  const handleBenefitChange = (idx, e) => {
    const newBenefits = [...form.benefits];
    newBenefits[idx][e.target.name] = e.target.value;
    setForm({ ...form, benefits: newBenefits });
  };
  const addBenefit = () => setForm({ ...form, benefits: [...form.benefits, { ...emptyBenefit }] });
  const removeBenefit = idx => setForm({ ...form, benefits: form.benefits.filter((_, i) => i !== idx) });

  // Handlers for process steps
  const handleProcessChange = (idx, e) => {
    const newSteps = [...form.processSteps];
    newSteps[idx][e.target.name] = e.target.value;
    setForm({ ...form, processSteps: newSteps });
  };
  const addProcess = () => setForm({ ...form, processSteps: [...form.processSteps, { ...emptyProcess }] });
  const removeProcess = idx => setForm({ ...form, processSteps: form.processSteps.filter((_, i) => i !== idx) });

  // Handlers for CTA
  const handleCtaChange = e => {
    setForm({ ...form, cta: { ...form.cta, [e.target.name]: e.target.value } });
  };
  const handleCtaButtonChange = (idx, e) => {
    const newButtons = [...form.cta.buttons];
    newButtons[idx][e.target.name] = e.target.value;
    setForm({ ...form, cta: { ...form.cta, buttons: newButtons } });
  };
  const addCtaButton = () => setForm({ ...form, cta: { ...form.cta, buttons: [...form.cta.buttons, { ...emptyCtaButton }] } });
  const removeCtaButton = idx => setForm({ ...form, cta: { ...form.cta, buttons: form.cta.buttons.filter((_, i) => i !== idx) } });

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');
    if (!form.hero.title.trim()) {
      setFormError('Hero title is required.');
      return;
    }
    const result = await dispatch(updateServicePageContent(form));
    if (result.error) {
      setFormError(result.error.message || 'Failed to update service page.');
      return;
    }
    setEditing(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Service Page</h2>
      {loading ? (
        <p>Loading...</p>
      ) : reduxError ? (
        <p className="text-red-600">{reduxError.message || reduxError}</p>
      ) : (
        <>
          {!editing ? (
            <div className="mb-6 bg-gray-50 p-4 rounded border">
              <h3 className="text-lg font-semibold mb-2">Current Service Page</h3>
              <p><b>Hero Title:</b> {content?.hero?.title}</p>
              <p><b>Hero Subtitle:</b> {content?.hero?.subtitle}</p>
              {content?.hero?.image && <img src={content.hero.image} alt="Hero" className="h-24 my-2 rounded" />}
              <div className="mb-2">
                <b>Services:</b>
                <ul className="list-disc ml-6">
                  {content?.services?.map((s, i) => (
                    <li key={i}>{s.title}: {s.description} {s.icon && <span>({s.icon})</span>}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <b>Benefits:</b>
                <ul className="list-disc ml-6">
                  {content?.benefits?.map((b, i) => (
                    <li key={i}>{b.title}: {b.description} {b.icon && <span>({b.icon})</span>}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <b>Process Steps:</b>
                <ul className="list-disc ml-6">
                  {content?.processSteps?.map((p, i) => (
                    <li key={i}>{p.title}: {p.description}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <b>CTA:</b> {content?.cta?.title} {content?.cta?.subtitle}
                <ul className="list-disc ml-6">
                  {content?.cta?.buttons?.map((btn, i) => (
                    <li key={i}>{btn.label}: {btn.link}</li>
                  ))}
                </ul>
              </div>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setEditing(true)}>
                Edit Service Page
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-50">
              <h3 className="font-semibold mb-2">Hero Section</h3>
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="title"
                placeholder="Hero Title"
                value={form.hero.title}
                onChange={handleHeroChange}
                required
              />
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="subtitle"
                placeholder="Hero Subtitle"
                value={form.hero.subtitle}
                onChange={handleHeroChange}
              />
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="image"
                placeholder="Hero Image URL"
                value={form.hero.image}
                onChange={handleHeroChange}
              />
              <h3 className="font-semibold mt-4 mb-2">Services</h3>
              {form.services.map((service, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    className="p-2 border rounded w-1/3"
                    name="title"
                    placeholder="Title"
                    value={service.title}
                    onChange={e => handleServiceChange(idx, e)}
                  />
                  <input
                    className="p-2 border rounded w-1/2"
                    name="description"
                    placeholder="Description"
                    value={service.description}
                    onChange={e => handleServiceChange(idx, e)}
                  />
                  <input
                    className="p-2 border rounded w-1/4"
                    name="icon"
                    placeholder="Icon name or URL"
                    value={service.icon}
                    onChange={e => handleServiceChange(idx, e)}
                  />
                  <button type="button" className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => removeService(idx)} disabled={form.services.length === 1}>Remove</button>
                </div>
              ))}
              <button type="button" className="px-2 py-1 bg-green-500 text-white rounded" onClick={addService}>Add Service</button>
              <h3 className="font-semibold mt-4 mb-2">Benefits</h3>
              {form.benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    className="p-2 border rounded w-1/3"
                    name="title"
                    placeholder="Title"
                    value={benefit.title}
                    onChange={e => handleBenefitChange(idx, e)}
                  />
                  <input
                    className="p-2 border rounded w-1/2"
                    name="description"
                    placeholder="Description"
                    value={benefit.description}
                    onChange={e => handleBenefitChange(idx, e)}
                  />
                  <input
                    className="p-2 border rounded w-1/4"
                    name="icon"
                    placeholder="Icon name or URL"
                    value={benefit.icon}
                    onChange={e => handleBenefitChange(idx, e)}
                  />
                  <button type="button" className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => removeBenefit(idx)} disabled={form.benefits.length === 1}>Remove</button>
                </div>
              ))}
              <button type="button" className="px-2 py-1 bg-green-500 text-white rounded" onClick={addBenefit}>Add Benefit</button>
              <h3 className="font-semibold mt-4 mb-2">Process Steps</h3>
              {form.processSteps.map((step, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    className="p-2 border rounded w-1/3"
                    name="title"
                    placeholder="Title"
                    value={step.title}
                    onChange={e => handleProcessChange(idx, e)}
                  />
                  <input
                    className="p-2 border rounded w-2/3"
                    name="description"
                    placeholder="Description"
                    value={step.description}
                    onChange={e => handleProcessChange(idx, e)}
                  />
                  <button type="button" className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => removeProcess(idx)} disabled={form.processSteps.length === 1}>Remove</button>
                </div>
              ))}
              <button type="button" className="px-2 py-1 bg-green-500 text-white rounded" onClick={addProcess}>Add Process Step</button>
              <h3 className="font-semibold mt-4 mb-2">CTA Section</h3>
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="title"
                placeholder="CTA Title"
                value={form.cta.title}
                onChange={handleCtaChange}
              />
              <input
                className="block mb-2 p-2 w-full border rounded"
                name="subtitle"
                placeholder="CTA Subtitle"
                value={form.cta.subtitle}
                onChange={handleCtaChange}
              />
              {form.cta.buttons.map((btn, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    className="p-2 border rounded w-1/2"
                    name="label"
                    placeholder="Button Label"
                    value={btn.label}
                    onChange={e => handleCtaButtonChange(idx, e)}
                  />
                  <input
                    className="p-2 border rounded w-1/2"
                    name="link"
                    placeholder="Button Link"
                    value={btn.link}
                    onChange={e => handleCtaButtonChange(idx, e)}
                  />
                  <button type="button" className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => removeCtaButton(idx)} disabled={form.cta.buttons.length === 1}>Remove</button>
                </div>
              ))}
              <button type="button" className="px-2 py-1 bg-green-500 text-white rounded" onClick={addCtaButton}>Add CTA Button</button>
              {formError && <p className="text-red-600">{formError}</p>}
              <div className="flex gap-2 mt-4">
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

export default AdminServicesPage; 