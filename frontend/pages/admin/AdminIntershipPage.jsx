import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addInternship,
  fetchInternships,
  updateInternship,
  deleteInternship,
  toggleInternshipStatus,
} from '../../features/internships/internshipSlice'

const defaultForm = {
  title: '',
  domain: '',
  company: '',
  location: '',
  duration: '',
  salary: '',
  deadline: '',
  status: 'Open',
  urgent: false,
  description: '',
  requirements: '',
  benefits: '',
  isActive: true,
}

const AdminIntershipPage = () => {
  const dispatch = useDispatch()
  const { items, loading } = useSelector((state) => state.internships)
  const [form, setForm] = useState(defaultForm)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    dispatch(fetchInternships())
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccessMsg('')
    setErrorMsg('')
    const payload = {
      ...form,
      duration: form.duration.split(',').map(d => Number(d.trim())),
      requirements: form.requirements.split(',').map(r => r.trim()),
      benefits: form.benefits.split(',').map(b => b.trim()),
    }
    try {
      if (editId) {
        await dispatch(updateInternship({ id: editId, data: payload })).unwrap()
        setSuccessMsg('Internship updated successfully!')
      } else {
        await dispatch(addInternship(payload)).unwrap()
        setSuccessMsg('Internship added successfully!')
      }
      setForm(defaultForm)
      setEditId(null)
    } catch (err) {
      setErrorMsg(
        Array.isArray(err?.errors)
          ? err.errors.map(e => e.msg || e.message || e).join(', ')
          : err?.message || 'An error occurred'
      )
    }
  }

  const handleEdit = (internship) => {
    setEditId(internship._id || internship.id)
    setForm({
      ...defaultForm,
      ...internship,
      duration: Array.isArray(internship.duration) ? internship.duration.join(', ') : internship.duration,
      requirements: Array.isArray(internship.requirements) ? internship.requirements.join(', ') : internship.requirements,
      benefits: Array.isArray(internship.benefits) ? internship.benefits.join(', ') : internship.benefits,
    })
    setSuccessMsg('')
    setErrorMsg('')
  }

  const handleDelete = async (id) => {
    setSuccessMsg('')
    setErrorMsg('')
    if (window.confirm('Are you sure you want to delete this internship?')) {
      try {
        await dispatch(deleteInternship(id)).unwrap()
        setSuccessMsg('Internship deleted successfully!')
      } catch (err) {
        setErrorMsg(
          Array.isArray(err?.errors)
            ? err.errors.map(e => e.msg || e.message || e).join(', ')
            : err?.message || 'An error occurred'
        )
      }
    }
  }

  const handleToggle = async (id) => {
    setSuccessMsg('')
    setErrorMsg('')
    try {
      await dispatch(toggleInternshipStatus(id)).unwrap()
      setSuccessMsg('Internship active status toggled successfully!')
    } catch (err) {
      setErrorMsg(
        Array.isArray(err?.errors)
          ? err.errors.map(e => e.msg || e.message || e).join(', ')
          : err?.message || 'An error occurred'
      )
    }
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">{editId ? 'Edit Internship' : 'Add New Internship'}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-10">
        <input className="border px-3 py-2 rounded" type="text" name="title" placeholder="Internship Title" value={form.title} onChange={handleChange} required />
        <input className="border px-3 py-2 rounded" type="text" name="domain" placeholder="Domain" value={form.domain} onChange={handleChange} required />
        <input className="border px-3 py-2 rounded" type="text" name="company" placeholder="Company Name" value={form.company} onChange={handleChange} required />
        <input className="border px-3 py-2 rounded" type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input className="border px-3 py-2 rounded" type="text" name="duration" placeholder="Duration (comma separated days, e.g. 30,60)" value={form.duration} onChange={handleChange} required />
        <input className="border px-3 py-2 rounded" type="text" name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required />
        <input className="border px-3 py-2 rounded" type="date" name="deadline" placeholder="Deadline" value={form.deadline} onChange={handleChange} required />
        <select className="border px-3 py-2 rounded" name="status" value={form.status} onChange={handleChange}>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="Pending">Pending</option>
        </select>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="urgent" checked={form.urgent} onChange={handleChange} />
          Urgent
        </label>
        <textarea className="border px-3 py-2 rounded" name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={3} required />
        <input className="border px-3 py-2 rounded" type="text" name="requirements" placeholder="Requirements (comma separated)" value={form.requirements} onChange={handleChange} required />
        <input className="border px-3 py-2 rounded" type="text" name="benefits" placeholder="Benefits (comma separated)" value={form.benefits} onChange={handleChange} required />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
          Active
        </label>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded font-semibold" disabled={loading}>
          {loading ? (editId ? 'Updating...' : 'Adding...') : (editId ? 'Update Internship' : 'Add Internship')}
        </button>
        {successMsg && <div className="text-green-600">{successMsg}</div>}
        {errorMsg && <div className="text-red-500">{errorMsg}</div>}
      </form>

      <h2 className="text-xl font-bold mb-4">All Internships</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Title</th>
              <th className="border px-3 py-2">Domain</th>
              <th className="border px-3 py-2">Company</th>
              <th className="border px-3 py-2">Location</th>
              <th className="border px-3 py-2">Duration</th>
              <th className="border px-3 py-2">Salary</th>
              <th className="border px-3 py-2">Deadline</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Urgent</th>
              <th className="border px-3 py-2">Active</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((internship) => (
                <tr key={internship._id || internship.id}>
                  <td className="border px-3 py-2">{internship.title}</td>
                  <td className="border px-3 py-2">{internship.domain}</td>
                  <td className="border px-3 py-2">{internship.company}</td>
                  <td className="border px-3 py-2">{internship.location}</td>
                  <td className="border px-3 py-2">{Array.isArray(internship.duration) ? internship.duration.join(', ') : internship.duration}</td>
                  <td className="border px-3 py-2">{internship.salary}</td>
                  <td className="border px-3 py-2">{internship.deadline ? new Date(internship.deadline).toLocaleDateString() : ''}</td>
                  <td className="border px-3 py-2">{internship.status}</td>
                  <td className="border px-3 py-2">{internship.urgent ? 'Yes' : 'No'}</td>
                  <td className="border px-3 py-2">{internship.isActive ? 'Yes' : 'No'}</td>
                  <td className="border px-3 py-2 flex gap-2">
                    <button
                      className="bg-yellow-400 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(internship)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(internship._id || internship.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleToggle(internship._id || internship.id)}
                    >
                      Toggle Active
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-3 py-2 text-center" colSpan={11}>
                  No internships found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}        
export default AdminIntershipPage; 