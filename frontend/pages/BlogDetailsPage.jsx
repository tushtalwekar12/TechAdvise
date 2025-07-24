import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById, clearSelectedBlog } from '../features/blogs/blogSlice';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selected: blog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }

    // Clear state on unmount
    return () => {
      // dispatch(clearSelectedBlog());
    };
  }, [dispatch, id]);

  if (loading) return <div className="p-10 text-gray-700">Loading blog...</div>;
  if (error) return <div className="p-10 text-red-600">Error: {error}</div>;
  if (!blog) return <div className="p-10">Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#111518] mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Published on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full rounded-lg mb-6 object-cover max-h-[400px]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-avatar.png';
          }}
        />
      )}
      <p className="text-base text-[#111518] leading-7 whitespace-pre-line">
        {blog.description}
      </p>
    </div>
  );
};

export default BlogDetailsPage;
