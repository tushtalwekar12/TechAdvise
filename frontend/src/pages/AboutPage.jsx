import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutPageContent } from '../features/aboutPage/aboutPageSlice'
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector(state => state.aboutPage);

  useEffect(() => {
    dispatch(fetchAboutPageContent());
  }, [dispatch]);

  if (loading) return <div>Loading about page...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!content) return null;

  // Only destructure after confirming content is not null
  const { mission, values, team, contact } = content;
  // Remove useMemo, use team directly
  // const memoizedTeam = useMemo(() => team || [], [team]);
  
  return (
    <>
      <Helmet>
        <title>{content?.title || "About Us | TechAdvise"}</title>
        <meta name="description" content={content?.content || "Learn more about TechAdvise, a modern digital agency empowering learners and creators."} />
        <meta property="og:title" content={content?.title || "About Us | TechAdvise"} />
        <meta property="og:description" content={content?.content || "Learn more about TechAdvise, a modern digital agency empowering learners and creators."} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content?.title || "About Us | TechAdvise"} />
        <meta name="twitter:description" content={content?.content || "Learn more about TechAdvise, a modern digital agency empowering learners and creators."} />
      </Helmet>
      <div className="px-4 md:px-20 lg:px-40 py-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div className="text-[32px] font-bold text-[#121416]">About TeachAdvise</div>

          {/* Mission */}
          {mission && (
            <section>
              <h2 className="text-[22px] font-bold text-[#121416] px-2 pb-3">Our Mission</h2>
              <p className="text-base font-normal text-[#121416] px-2">{mission}</p>
            </section>
          )}

          {/* Values */}
          {values && (
            <section>
              <h2 className="text-[22px] font-bold text-[#121416] px-2 pb-3">Our Values</h2>
              <p className="text-base font-normal text-[#121416] px-2">{values}</p>
            </section>
          )}

          {/* Team */}
          {team && team.length > 0 && (
            <section>
              <h2 className="text-[22px] font-bold text-[#121416] px-2 pb-3">Meet Our Team</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6 px-2">
                {team.map((member, index) => (
                  <div key={index} className="flex flex-col items-center text-center gap-2">
                    <div
                      className="w-24 h-24 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${member.image || '/default-avatar.png'})` }}
                      onError={e => { e.target.style.backgroundImage = `url('/default-avatar.png')`; }}
                    ></div>
                    <p className="text-[#121416] text-base font-medium">{member.name}</p>
                    <p className="text-[#6a7681] text-sm">{member.role}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Contact */}
          {contact && (
            <section>
              <h2 className="text-[22px] font-bold text-[#121416] px-2 pb-3">Contact Us</h2>
              <p className="text-base font-normal text-[#121416] px-2">
                We'd love to hear from you! If you have any questions, feedback, or inquiries, please reach out to us at
                <strong> {contact.email} </strong> or call us at <strong>{contact.phone}</strong>.
              </p>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
