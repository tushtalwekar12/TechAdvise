import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHighlights } from '../features/highlights/highlightsSlice';
import { Trophy, Users, Headset, TrendUp } from 'phosphor-react';

const ICON_MAP = {
  'trophy': <Trophy size={40} color="#1383eb" />,
  'users': <Users size={40} color="#1383eb" />,
  'headset': <Headset size={40} color="#1383eb" />,
  'trend-up': <TrendUp size={40} color="#1383eb" />,
};

const HighlightsSection = () => {
  const dispatch = useDispatch();
  const { items: highlights, loading, error } = useSelector(state => state.highlights);

  useEffect(() => {
    dispatch(fetchHighlights());
  }, [dispatch]);

  return (
    <section className="py-12 px-4 md:px-10 lg:px-20 bg-white">
      <h2 className="text-[#111518] text-2xl font-bold leading-tight tracking-tight mb-8 text-center">
        Why Choose Us
      </h2>
      {loading && <div>Loading highlights...</div>}
      {error && <div className="text-red-600">Error: {error}</div>}
      {highlights && highlights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, idx) => (
            <div key={highlight._id || idx} className="border border-[#dbe1e6] bg-white p-6 rounded-xl flex flex-col items-center text-center gap-4 hover:shadow-lg transition-all duration-300">
              <div className="text-[#1383eb] text-4xl bg-blue-50 p-4 rounded-full">
                {ICON_MAP[highlight.icon] || <Trophy size={40} color="#1383eb" />}
              </div>
              <h3 className="text-[#111518] text-lg font-bold leading-tight">{highlight.title}</h3>
              <p className="text-[#617689] text-sm leading-relaxed">{highlight.description}</p>
            </div>
          ))}
        </div>
      ) : !loading && !error ? (
        <div>No highlights found.</div>
      ) : null}
    </section>
  );
};

export default HighlightsSection;
