import Internship from '../models/Internship.js';

// Create new internship
export const createInternship = async (req, res) => {
  try {
    const { 
      title, 
      domain, 
      company, 
      location, 
      duration, 
      salary, 
      deadline, 
      status, 
      urgent, 
      description, 
      requirements, 
      benefits, 
    } = req.body;
    
    const internship = new Internship({ 
      title, 
      domain, 
      company, 
      location, 
      duration, 
      salary, 
      deadline, 
      status, 
      urgent, 
      description, 
      requirements, 
      benefits, 
    });
    
    await internship.save();
    res.status(201).json({ success: true, message: 'Internship created', data: internship });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all internships
export const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json({ success: true, data: internships });
  } catch (error) {
    res.status(500).json({ success: false, errors: error.message });
  }
};

// Get internship by ID
export const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    res.status(200).json({ success: true, data: internship });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update internship by ID
export const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    res.status(200).json({ success: true, message: 'Internship updated', data: internship });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete internship by ID
export const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    res.status(200).json({ success: true, message: 'Internship deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Toggle isActive status
export const toggleInternshipStatus = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    internship.isActive = !internship.isActive;
    await internship.save();
    res.status(200).json({ success: true, message: 'Status updated', data: internship });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get active internships only
export const getActiveInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ isActive: true });
    res.status(200).json({ success: true, data: internships });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get internships by status
export const getInternshipsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const internships = await Internship.find({ status, isActive: true });
    res.status(200).json({ success: true, data: internships });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get internships by domain
export const getInternshipsByDomain = async (req, res) => {
  try {
    const { domain } = req.params;
    const internships = await Internship.find({ domain, isActive: true });
    res.status(200).json({ success: true, data: internships });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get urgent internships
export const getUrgentInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ urgent: true, isActive: true });
    res.status(200).json({ success: true, data: internships });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update internship status
export const updateInternshipStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    internship.status = status;
    await internship.save();
    res.status(200).json({ success: true, message: 'Status updated', data: internship });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Toggle urgent status
export const toggleUrgentStatus = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    internship.urgent = !internship.urgent;
    await internship.save();
    res.status(200).json({ success: true, message: 'Urgent status updated', data: internship });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
