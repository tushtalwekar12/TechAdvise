import React, { useEffect, useMemo } from 'react';
import { Trophy, Users, Headset, TrendUp } from "phosphor-react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicePageContent } from '../features/servicePage/servicePageSlice';
import { fetchFAQs } from '../features/faq/faqSlice';

const ICON_MAP = {
  'briefcase': <i className="ph ph-briefcase"></i>,
  'globe': <i className="ph ph-globe"></i>,
  'app-window': <i className="ph ph-app-window"></i>,
  'users-three': <i className="ph ph-users-three"></i>,
  'trophy': <Trophy size={40} color="#1383eb" />,
  'users': <Users size={40} color="#1383eb" />,
  'headset': <Headset size={40} color="#1383eb" />,
  'trend-up': <TrendUp size={40} color="#1383eb" />,
};

const ServicePage = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector(state => state.servicePage);
  const { items: faqs, loading: faqLoading, error: faqError } = useSelector(state => state.faq);

  useEffect(() => {
    dispatch(fetchServicePageContent());
    dispatch(fetchFAQs());
  }, [dispatch]);

  // Always call hooks before any early return
  const hero = content?.hero;
  const services = content?.services;
  const benefits = content?.benefits;
  const processSteps = content?.processSteps;
  const cta = content?.cta;

  const memoizedServices = useMemo(() => services || [], [services]);
  const memoizedBenefits = useMemo(() => benefits || [], [benefits]);
  const memoizedProcessSteps = useMemo(() => processSteps || [], [processSteps]);
  const memoizedFaqs = useMemo(() => faqs || [], [faqs]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading service page...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">Error: {error}</div>;
  if (!content) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 md:px-20 lg:px-40 py-10 flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col">
          {/* Hero Section */}
          {hero && (
            <section className="flex flex-col gap-8 items-center justify-center min-h-[500px] bg-cover bg-center bg-no-repeat p-8 rounded-2xl shadow-lg mb-16"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url('${hero.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}')` }}>
              <h1 className="text-white text-4xl md:text-6xl font-black text-center leading-tight">{hero.title}</h1>
              <p className="text-white text-lg md:text-xl text-center max-w-3xl leading-relaxed">{hero.subtitle}</p>
              {cta && cta.buttons && cta.buttons[0] && (
                <button className="bg-[#1383eb] hover:bg-[#0f6bb8] text-white font-bold rounded-xl px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {cta.buttons[0].label}
                </button>
              )}
            </section>
          )}

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
              {memoizedServices.map((service, idx) => (
                <div key={idx} className="border border-[#dbe1e6] bg-white p-6 rounded-xl flex flex-col gap-4 hover:shadow-xl hover:border-[#1383eb] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                  <div className="text-[#1383eb] text-3xl group-hover:scale-110 transition-transform duration-300">
                    {ICON_MAP[service.icon] || <i className="ph ph-briefcase"></i>}
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
              {memoizedBenefits.map((benefit, idx) => (
                <div key={idx} className="border border-[#dbe1e6] bg-white p-6 rounded-xl flex flex-col items-center text-center gap-4 hover:shadow-lg transition-all duration-300">
                  <div className="text-[#1383eb] text-4xl bg-blue-50 p-4 rounded-full">
                    {ICON_MAP[benefit.icon] || <Trophy size={40} color="#1383eb" />}
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
              {memoizedProcessSteps.map((step, idx) => (
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
          {cta && (
            <section className="bg-gradient-to-r from-[#1383eb] to-[#0f6bb8] rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{cta.title}</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">{cta.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {cta.buttons && cta.buttons.map((btn, idx) => (
                  <button key={idx} className={`bg-white text-[#1383eb] font-bold rounded-xl px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${idx > 0 ? 'border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#1383eb]' : ''}`}>
                    {btn.label}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* FAQ Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-[#111518] text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>
            {faqLoading ? (
              <p className="text-center">Loading FAQs...</p>
            ) : faqError ? (
              <p className="text-center text-red-600">{faqError.message || faqError}</p>
            ) : memoizedFaqs && memoizedFaqs.length > 0 ? (
              <div className="max-w-2xl mx-auto">
                {memoizedFaqs.map((faq, idx) => (
                  <div key={faq._id || idx} className="mb-4 border rounded bg-white p-4">
                    <div className="font-semibold text-[#111518] mb-2">Q: {faq.question}</div>
                    <div className="text-[#617689]">A: {faq.answer}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No FAQs found.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;