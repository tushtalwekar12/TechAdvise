import React from "react";
import Slider from "react-slick";
import { Star, BadgeCheck, Quote } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Rakesh Sharma",
    title: "(Founder, Sharma Tours & Travels)- Service: Website Development",
    image: "/src/assets/tusharphoto.jpg",
    text: "TechAdvise transformed our outdated website into a modern, high-performing platform. Their team was professional, fast, and always available for updates",
    rating: 5,
  },
  {
    name: "Megha Arora",
    title: "(CEO, FitTrack App) - Service: Android & iOS App Development",
    image: "/src/assets/tusharphoto.jpg",
    text: "We approached TechAdvise for a custom mobile app. The results were beyond expectations — clean UI, smooth UX, and timely delivery.",
    rating: 4,
  },
  {
    name: "Aman Verma",
    title: "(Co-founder, EduNest) - Service: Full-stack Web & Cloud Integration",
    image: "/src/assets/tusharphoto.jpg",
    text: "From backend architecture to front-end design, TechAdvise delivered a complete IT solution for our startup. Highly recommended for any tech project.",
    rating: 3,
  },
  {
    name: "Sneha Kulkarni",
    title: "( Founder, UrbanRoots) - Service: E-commerce Website Development",
    image: "/src/assets/tusharphoto.jpg",
    text: "TechAdvise built our entire e-commerce platform from scratch. The site is fast, secure, and user-friendly. Sales increased by 40% within the first month of launch!",
    rating: 5,
  },
];

const TestimonialSection = () => {
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

  return (
    <section className="px-4 md:px-10 lg:px-20 pt-10 pb-16">
      <h2 className="text-center text-3xl font-bold text-[#111518] mb-10">
        What Our Clients Say
      </h2>
      <Slider {...settings}>
        {testimonials.map((item, idx) => (
          <div key={idx} className="flex justify-center px-2 pb-10">
            <div className="relative bg-white rounded-xl shadow-2xl border border-blue-100 p-5 max-w-xs w-full mt-10 transform transition-transform hover:scale-105">
              {/* Quote Icon in Background */}
              <Quote className="absolute top-3 left-3 text-gray-300 opacity-10 w-10 h-10" />

              {/* Profile Image */}
              <div className="absolute -top-8 left-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full border-4 border-white shadow-md object-cover"
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
    </section>
  );
};

export default TestimonialSection;
