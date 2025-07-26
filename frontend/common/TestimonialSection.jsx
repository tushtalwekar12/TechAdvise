import React, { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import { Star, BadgeCheck, Quote } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        if (data.success) {
          setTestimonials(data.data);
        } else {
          setError(data.message || "Failed to load testimonials.");
        }
      } catch (err) {
        setError("Failed to load testimonials.");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    fade: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const memoizedTestimonials = useMemo(() => testimonials, [testimonials]);

  return (
    <section className="px-4 md:px-10 lg:px-20 pt-10 pb-16">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#111518] mb-8">
        What Our Clients Say
      </h2>
      <p className="text-center text-sm sm:text-base text-[#60768a] mb-8">
  Trusted by clients looking for custom web development, IT support, and mobile app development across India.
</p>
      {loading ? (
        <p className="text-center">Loading testimonials...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : testimonials.length === 0 ? (
        <p className="text-center">No testimonials found.</p>
      ) : (
        <Slider {...settings}>
          {memoizedTestimonials.map((item, idx) => (
            <div key={item._id || idx} className="flex justify-center px-2 pb-10">
              <div className="relative bg-white rounded-xl shadow-2xl border border-blue-100 p-5 max-w-xs w-full mt-10 transform transition-transform hover:scale-105">
                {/* Quote Icon in Background */}
                <Quote className="absolute top-3 left-3 text-gray-300 opacity-10 w-10 h-10" />

                {/* Profile Image */}
                <div className="absolute -top-8 left-6">
                  <img
                    src={item.image || '/default-avatar.png'}
                    alt={item.name}
                    className="w-14 h-14 rounded-full border-4 border-white shadow-md object-cover"
                    onError={e => { e.target.onerror = null; e.target.src = '/default-avatar.png'; }}
                  />
                </div>

                {/* Rating */}
                <div className="flex justify-end gap-1 mb-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-blue-500 fill-blue-500" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-base text-[#111518] mb-4 mt-4">{item.text}</p>

                {/* Name and Role */}
                <div>
                  <p className="font-bold text-[#111518] text-sm">{item.name}</p>
                  <p className="text-[#60768a] text-xs">{item.title}</p>

                  {/* Badge */}
                  <span className="inline-flex items-center gap-1 mt-2 text-blue-600 text-xs font-medium bg-blue-50 px-2 py-1 rounded-full">
                    <BadgeCheck className="w-4 h-4" /> Testimonial
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};

export default TestimonialSection;
