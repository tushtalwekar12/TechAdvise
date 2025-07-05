import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="px-4 md:px-20 lg:px-40 py-10 flex justify-center">
      <div className="max-w-[960px] w-full flex flex-col">
        <div className="p-4">
          <h1 className="text-[32px] font-bold text-[#121416]">Privacy Policy</h1>
        </div>

        {/* Section: Introduction */}
        <Section title="Introduction">
          Welcome to TeachAdvise's Privacy Policy. This policy explains how we collect, use, and protect your personal
          information when you use our platform. By using TeachAdvise, you agree to the terms outlined in this policy.
          We are committed to safeguarding your privacy and ensuring the security of your data.
        </Section>

        {/* Section: Data Collection */}
        <Section title="Data Collection">
          We collect various types of information to provide and improve our services. This includes personal
          information such as your name, email address, contact details, and professional background. We also collect
          non-personal information like your browsing activity, IP address, and device information. This data helps us
          understand how you interact with our platform and tailor our services to your needs.
        </Section>

        {/* Section: Use of Data */}
        <Section title="Use of Data">
          The information we collect is used for several purposes. We use your personal data to manage your account,
          provide personalized recommendations, and communicate with you about our services. Non-personal data helps us
          analyze platform usage, improve our offerings, and ensure the security of our platform. We do not sell or
          share your personal information with third parties for marketing purposes.
        </Section>

        {/* Section: Data Protection */}
        <Section title="Data Protection">
          We employ robust security measures to protect your data from unauthorized access, alteration, or disclosure.
          These measures include encryption, access controls, and regular security audits. While we strive to protect
          your information, no method of transmission over the internet is completely secure, and we cannot guarantee
          absolute security.
        </Section>

        {/* Section: Your Rights */}
        <Section title="Your Rights">
          You have the right to access, correct, or delete your personal information. You can manage your account
          settings or contact us directly to exercise these rights. We will respond to your requests within a
          reasonable timeframe. You also have the right to opt-out of receiving promotional communications from us.
        </Section>

        {/* Section: Policy Updates */}
        <Section title="Policy Updates">
          We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We
          will notify you of any significant changes by posting the updated policy on our platform and, if necessary,
          through direct communication. Please review this policy regularly to stay informed about how we protect your
          privacy.
        </Section>

        {/* Section: Contact Us */}
        <Section title="Contact Us">
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at{' '}
          <a href="mailto:privacy@teachadvise.com" className="text-[#0b80ee] underline">
            privacy@teachadvise.com
          </a>
          . We are committed to addressing your inquiries and resolving any issues promptly.
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="px-4 py-4">
    <h3 className="text-lg font-bold text-[#121416] pb-2">{title}</h3>
    <p className="text-base text-[#121416] leading-relaxed">{children}</p>
  </div>
);

export default PrivacyPolicyPage;
