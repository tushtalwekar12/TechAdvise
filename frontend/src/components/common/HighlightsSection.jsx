import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHighlights } from "../../features/highlights/highlightsSlice";
import { Trophy, Users, Headset, TrendUp } from "phosphor-react";
import { Briefcase, GraduationCap, Smile } from "lucide-react";

const ICON_MAP = {
  trophy: <Briefcase size={25} color="#4f8cff" />, // IT Services
  users: <GraduationCap size={25} color="#22c55e" />, // Internships
  headset: <Smile size={25} color="#eab308" />, // Client Trust
  "trend-up": <Briefcase size={25} color="#4f8cff" />, // fallback
};

const HighlightsSection = () => {
  const dispatch = useDispatch();
  const {
    items: highlights,
    loading,
    error,
  } = useSelector((state) => state.highlights);

  useEffect(() => {
    dispatch(fetchHighlights());
  }, [dispatch]);

  return (
    <section className="py-12 px-4 md:px-10 lg:px-20 bg-white">
      <h2 className="text-[#111518] text-3xl md:text-4xl font-bold leading-tight tracking-tight text-center mb-2">
        Why Choose TechAdvise?
      </h2>
      <p className="text-[#60768a] text-sm sm:text-base text-center mb-8 max-w-4xl mx-auto">
       We offer full stack solutions including WordPress, React.js, ecommerce platforms, and cloud migration via AWS & Azure.
      </p>


      {loading && <div>Loading highlights...</div>}
      {error && <div className="text-red-600">Error: {error}</div>}
      {highlights && highlights.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {highlights.map((highlight, idx) => {
            // Force icon by index for demo
            const iconKey =
              idx === 0 ? "headset" : idx === 1 ? "users" : "trophy";
            return (
              <div
                key={highlight._id || idx}
                className="flex min-w-[250px] flex-1 flex-col gap-4 rounded-xl p-6 bg-[#f4f7fa] transition-transform hover:scale-102 hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={
                      "p-3 rounded-full " +
                      (iconKey === "trophy"
                        ? "bg-blue-100"
                        : iconKey === "users"
                          ? "bg-green-100"
                          : iconKey === "headset"
                            ? "bg-yellow-100"
                            : "bg-blue-100")
                    }
                  >
                    {ICON_MAP[iconKey] || (
                      <Briefcase size={40} color="#4f8cff" />
                    )}
                  </div>
                  <span className="text-[#111518] text-base font-medium">
                    {highlight.title}
                  </span>
                </div>
                <p className="text-[#111518] text-2xl md:text-3xl font-bold">
                  {highlight.label}
                </p>
                <p className="text-[#60768a] text-base">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      ) : !loading && !error ? (
        <div>No highlights found.</div>
      ) : null}
    </section>
  );
};

export default HighlightsSection;
