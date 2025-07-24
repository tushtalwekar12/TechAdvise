import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blogs/blogSlice";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const dispatch = useDispatch();
  const { items: blogArticles, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const memoizedArticles = useMemo(() => blogArticles || [], [blogArticles]);

  return (
    <section className="px-4 md:px-10 lg:px-20 pt-10 pb-16">
      <h2 className="text-[#111518] text-2xl font-bold leading-tight tracking-tight mb-6">
        Latest Blog Articles
      </h2>

      {loading && <div>Loading blogs...</div>}
      {error && <div className="text-red-600">Error: {error}</div>}

      {memoizedArticles && memoizedArticles.length > 0 ? (
        memoizedArticles.map((article, index) => (
          <Link
            to={`/blog/${article._id}`}
            key={article._id || index}
            className="block group"
          >
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-xl py-4 px-8 bg-white shadow-md mb-6 group-hover:shadow-lg transition-shadow">
              {/* Text Content */}
              <div className="flex flex-col gap-2 flex-[2_2_0px]">
                <p className="text-[#111518] text-base font-semibold leading-tight group-hover:underline">
                  {article.title}
                </p>
                <p className="text-[#60768a] text-sm font-normal leading-relaxed">
                  {article.description?.length > 150
                    ? `${article.description.slice(0, 150)}...`
                    : article.description}
                </p>
                <span className="text-blue-600 hover:underline font-medium mt-2 inline-block">
                  Read More &rarr;
                </span>
              </div>

              {/* Image */}
              <div className="w-full md:w-64">
                <img
                  src={article.imageUrl || "/default-avatar.png"}
                  alt={article.title || "Blog image"}
                  className="rounded-xl w-full aspect-video object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
              </div>
            </div>
          </Link>
        ))
      ) : !loading && !error ? (
        <div>No blog articles found.</div>
      ) : null}
    </section>
  );
};

export default BlogSection;
