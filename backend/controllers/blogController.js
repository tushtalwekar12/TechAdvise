import Blog from '../models/Blog.js';

// Create a new blog post
export const createBlog = async (req, res) => {
  const { title, description, imageUrl,author } = req.body;

if (!title || !description || !author) {
  return res.status(400).json({ success: false, message: 'Title, Description, and Author are required' });
}

  try {
    const blog = await Blog.create({ title, description, imageUrl ,author});
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get a single blog by id
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update a blog post
export const updateBlog = async (req, res) => {
  try {
    const updates = {};
    ['title', 'description', 'imageUrl'].forEach((field) => {
      if (req.body[field]) updates[field] = req.body[field];
    });

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid blog ID' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



// Delete a blog post
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
