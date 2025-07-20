import React from 'react';
import { Trophy, Users, Headset, TrendUp } from "phosphor-react";

const ServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 md:px-20 lg:px-40 py-10 flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col">
          {/* Hero Section */}
          <section className="flex flex-col gap-8 items-center justify-center min-h-[500px] bg-cover bg-center bg-no-repeat p-8 rounded-2xl shadow-lg mb-16" 
                   style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')` }}>
            <h1 className="text-white text-4xl md:text-6xl font-black text-center leading-tight">
              Empowering Your Digital Presence
            </h1>
            <p className="text-white text-lg md:text-xl text-center max-w-3xl leading-relaxed">
              Transform your business with our comprehensive suite of digital services. From cutting-edge IT solutions to custom app development, we deliver results that drive growth.
            </p>
            <button className="bg-[#1383eb] hover:bg-[#0f6bb8] text-white font-bold rounded-xl px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Contact Us
            </button>
          </section>

          {/* Our Services */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-[#111518] text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-[#617689] text-lg max-w-3xl mx-auto leading-relaxed">
                We provide end-to-end digital solutions that help businesses thrive in the modern digital landscape. 
                Our expert team delivers innovative, scalable, and results-driven services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {serviceCards.map((service, idx) => (
                <div key={idx} 
                     className="border border-[#dbe1e6] bg-white p-6 rounded-xl flex flex-col gap-4 hover:shadow-xl hover:border-[#1383eb] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                  <div className="text-[#1383eb] text-3xl group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-[#111518] text-xl font-bold leading-tight">{service.title}</h3>
                  <p className="text-[#617689] text-base leading-relaxed flex-grow">{service.description}</p>
                  <div className="text-[#1383eb] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Learn More →
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-[#111518] text-3xl md:text-4xl font-bold mb-4">Why Choose TechSolutions?</h2>
              <p className="text-[#617689] text-lg max-w-3xl mx-auto leading-relaxed">
                We don't just deliver services – we deliver results. Our proven track record and commitment to excellence 
                make us the trusted partner for businesses looking to accelerate their digital transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="border border-[#dbe1e6] bg-white p-6 rounded-xl flex flex-col items-center text-center gap-4 hover:shadow-lg transition-all duration-300">
                  <div className="text-[#1383eb] text-4xl bg-blue-50 p-4 rounded-full">
                    {benefit.icon}
                  </div>
                  <h3 className="text-[#111518] text-lg font-bold leading-tight">{benefit.title}</h3>
                  <p className="text-[#617689] text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-[#111518] text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
              <p className="text-[#617689] text-lg max-w-3xl mx-auto leading-relaxed">
                We follow a proven methodology that ensures your project is delivered on time, within budget, and exceeds expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-[#1383eb] text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="text-[#111518] text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-[#617689] text-base leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-[#1383eb] to-[#0f6bb8] rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of satisfied clients who have accelerated their growth with our digital solutions. 
              Get started today and see the difference expert guidance makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#1383eb] font-bold rounded-xl px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Your Project
              </button>
              <button className="border-2 border-white text-white font-bold rounded-xl px-8 py-4 text-lg transition-all duration-300 hover:bg-white hover:text-[#1383eb]">
                Schedule Consultation
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const serviceCards = [
  {
    title: 'IT Solutions & Consulting',
    description: 'Strategic IT consulting and implementation services to optimize your technology infrastructure, reduce costs, and improve operational efficiency.',
    icon: <i className="ph ph-briefcase"></i>,
  },
  {
    title: 'Custom Website Development',
    description: 'Modern, responsive websites built with cutting-edge technologies that drive conversions and provide exceptional user experiences.',
    icon: <i className="ph ph-globe"></i>,
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that engage users, streamline operations, and create new revenue opportunities.',
    icon: <i className="ph ph-app-window"></i>,
  },
  {
    title: 'Digital Strategy & Guidance',
    description: 'Comprehensive digital transformation strategies tailored to your business goals, market position, and competitive landscape.',
    icon: <i className="ph ph-users-three"></i>,
  },
];

const benefits = [
  { 
    title: 'Proven Track Record', 
    description: '500+ successful projects delivered with 98% client satisfaction rate',
    icon: <Trophy size={40} color="#1383eb" />
  },
  { 
    title: 'Expert Team', 
    description: 'Certified professionals with 10+ years of industry experience',
    icon: <Users size={40} color="#1383eb" />
  },
  { 
    title: '24/7 Support', 
    description: 'Round-the-clock technical support and maintenance services',
    icon: <Headset size={40} color="#1383eb" />
  },
  { 
    title: 'Scalable Solutions', 
    description: 'Future-proof technology that grows with your business needs',
    icon: <TrendUp size={40} color="#1383eb" />
  },
];

const processSteps = [
  {
    title: 'Discovery & Planning',
    description: 'We analyze your requirements, goals, and current state to create a comprehensive project roadmap.'
  },
  {
    title: 'Design & Prototyping',
    description: 'Our design team creates intuitive interfaces and user experiences that align with your brand.'
  },
  {
    title: 'Development & Testing',
    description: 'We build your solution using best practices and rigorous testing to ensure quality and performance.'
  },
  {
    title: 'Launch & Support',
    description: 'We deploy your solution and provide ongoing support to ensure continued success and growth.'
  }
];

export default ServicePage;