import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, clearSelectedBlog } from "../features/blogs/blogSlice";
import { Helmet } from "react-helmet";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    selected: blog,
    loading,
    error,
  } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }

    // Clear state on unmount
    return () => {
       dispatch(clearSelectedBlog());
    };
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="p-10 text-gray-700 text-center">Loading blog...</div>
    );
  if (error)
    return <div className="p-10 text-red-600 text-center">Error: {error}</div>;
  if (!blog) return <div className="p-10 text-center">Blog not found.</div>;

  return (
    <>
      <Helmet>
        <title>{blog.title} | TechAdvise Blog</title>
        <meta name="description" content={blog.excerpt || blog.description?.substring(0, 160)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || blog.description?.substring(0, 160)} />
        {blog.imageUrl && <meta property="og:image" content={blog.imageUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt || blog.description?.substring(0, 160)} />
        {blog.imageUrl && <meta name="twitter:image" content={blog.imageUrl} />}
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg px-6 py-10">
          {/* Title */}
          <h1 className="text-4xl font-bold text-[#111518] mb-4 text-center">
            {blog.title}
          </h1>

          {/* Author & Date */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src={blog.authorAvatar || "/default-avatar.png"}
              alt={blog.authorName || "Author"}
              className="w-8 h-8 rounded-full border"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />
            <span className="text-sm text-gray-600">
              {blog.authorName || "Unknown Author"}
            </span>
            <span className="text-sm text-gray-400">
              • {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Image */}
          <div className="flex justify-center mb-8">
            <img
              src={blog.imageUrl || "/default-avatar.png"}
              alt={blog.title}
              className="rounded-lg shadow-md object-cover aspect-video w-full max-w-xl transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />
          </div>

          {/* Description */}
          <hr className="mb-8" />
          <p className="text-lg text-[#111518] leading-relaxed whitespace-pre-line mb-8">
            {blog.description}
          </p>
          {/*free consultaion button*/}
          <a
            href="#"
            className="inline-block text-blue-600 font-semibold px-4 py-2 rounded transition 
             hover:bg-blue-50 hover:text-blue-800 hover:underline hover:shadow-sm"
            title="Click to schedule your free consultation"
          >
            Book a free consultation with TechAdvise &rarr;
          </a>

          {/* Social Sharing (placeholder) */}
          <div className="flex gap-4 justify-center mt-4">
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
              Share
            </button>
            <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition">
              Bookmark
            </button>
          </div>

          {/* Related Articles (placeholder) */}
          <div className="mt-12">
            {/* You can add a RelatedArticles component here */}
          </div>

          {/* Comments Section (placeholder) */}
          <div className="mt-12">
            {/* You can add a Comments component here */}
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogDetailsPage;
