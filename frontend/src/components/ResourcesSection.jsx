import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResources } from '../features/resources/resourcesSlice';

const ResourcesSection = () => {
  const dispatch = useDispatch();
  const { items: resources, loading, error } = useSelector(state => state.resources);

  useEffect(() => {
    dispatch(fetchResources());
  }, [dispatch]);

  return (
    <section className="px-4 md:px-10 lg:px-20 pt-10 pb-16">
      <h2 className="text-[#111518] text-2xl font-bold leading-tight tracking-tight mb-6">
        Resources
      </h2>
      {loading && <div>Loading resources...</div>}
      {error && <div className="text-red-600">Error: {error}</div>}
      {resources && resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, idx) => (
            <a
              key={resource._id || idx}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {resource.image && (
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="rounded-lg w-full h-40 object-cover mb-4"
                />
              )}
              <h3 className="text-lg font-bold text-[#111518] mb-2">{resource.title}</h3>
              <p className="text-[#60768a] text-sm mb-2">{resource.description}</p>
              <span className="text-blue-600 font-medium">Visit Resource →</span>
            </a>
          ))}
        </div>
      ) : !loading && !error ? (
        <div>No resources found.</div>
      ) : null}
    </section>
  );
};

export default ResourcesSection;
