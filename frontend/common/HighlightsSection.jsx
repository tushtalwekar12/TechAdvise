import React from 'react';
import CountUp from 'react-countup';
import { Briefcase, GraduationCap, SmileIcon } from 'lucide-react';

const HighlightsSection = () => {
  return (
    <>
      <h2 className="text-2xl sm:text-3xl font-bold text-center px-4 pt-8 pb-2 text-[#111518]">
        Why Choose TechAdvise?
      </h2>

      <div className="flex flex-wrap gap-6 p-6 justify-center">
        {/* IT Services Card */}
        <div className="flex min-w-[250px] flex-1 flex-col gap-4 rounded-xl p-6 bg-gradient-to-br from-[#f9fafc] to-[#e8ecf1] transition-transform hover:scale-102 hover:shadow-xl hover:border-l-4 hover:border-blue-500">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Briefcase className="text-blue-600 w-5 h-5" />
            </div>
            <p className="text-[#111518] text-base font-medium">IT Services</p>
          </div>
          <p className="text-[#111518] text-2xl font-bold">
            <CountUp end={15} duration={8} />+ Tailored Solutions
          </p>
          <p className="text-[#60768a] text-sm">
            Apps, websites, and modern IT platforms — built for startups and enterprises.
          </p>
        </div>

        {/* Internships Card */}
        <div className="flex min-w-[250px] flex-1 flex-col gap-4 rounded-xl p-6 bg-gradient-to-br from-[#f9fafc] to-[#e8ecf1] transition-transform hover:scale-102 hover:shadow-xl hover:border-l-4 hover:border-green-500">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <GraduationCap className="text-green-600 w-5 h-5" />
            </div>
            <p className="text-[#111518] text-base font-medium">Internships</p>
          </div>
          <p className="text-[#111518] text-2xl font-bold">
            <CountUp end={500} duration={8} />+ Opportunities Created
          </p>
          <p className="text-[#60768a] text-sm">
            Real-world internship experience in IT, Web, and Software directly at TechAdvise.
          </p>
        </div>

        {/* Client Trust Card */}
        <div className="flex min-w-[250px] flex-1 flex-col gap-4 rounded-xl p-6 bg-gradient-to-br from-[#f9fafc] to-[#e8ecf1] transition-transform hover:scale-102 hover:shadow-xl hover:border-l-4 hover:border-yellow-400">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-full">
              <SmileIcon className="text-yellow-600 w-5 h-5" />
            </div>
            <p className="text-[#111518] text-base font-medium">Client Trust</p>
          </div>
          <p className="text-[#111518] text-2xl font-bold">
            <CountUp end={100} duration={8} />+ Happy Clients
          </p>
          <p className="text-[#60768a] text-sm">
            Trusted by startups & businesses for reliable delivery, clarity, and results.
          </p>
        </div>
      </div>
    </>
  );
};

export default HighlightsSection;
