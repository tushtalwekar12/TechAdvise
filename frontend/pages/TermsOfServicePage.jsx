import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="px-4 md:px-20 lg:px-40 py-10 flex justify-center">
      <div className="max-w-[960px] w-full flex flex-col">
        <div className="p-4">
          <h1 className="text-[32px] font-bold text-[#111518]">Terms of Service</h1>
        </div>

        <Section title="1. Acceptance of Terms">
          By accessing or using the TeachAdvise platform, you agree to be bound by these Terms of Service. If you do
          not agree to these terms, please do not use our services.
        </Section>

        <Section title="2. User Responsibilities">
          You are responsible for maintaining the confidentiality of your account information and for all activities
          that occur under your account. You agree to provide accurate and complete information when creating your
          account and to update your information as necessary.
        </Section>

        <Section title="3. Acceptable Use">
          You agree to use the TeachAdvise platform only for lawful purposes and in a manner that does not infringe the
          rights of, restrict, or inhibit anyone else's use and enjoyment of the platform. Prohibited behavior includes
          harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content,
          or disrupting the normal flow of dialogue within our platform.
        </Section>

        <Section title="4. Limitations of Liability">
          TeachAdvise is not liable for any indirect, incidental, special, consequential, or punitive damages, or any
          loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or
          other intangible losses, resulting from (a) your access to or use of or inability to access or use the
          services; (b) any conduct or content of any third party on the services; (c) any content obtained from the
          services; and (d) unauthorized access, use, or alteration of your transmissions or content.
        </Section>

        <Section title="5. Modifications to Terms">
          We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new
          terms on this page. Your continued use of the platform after any such changes constitutes your acceptance of
          the new terms.
        </Section>

        <Section title="6. Governing Law">
          These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
          TeachAdvise operates, without regard to its conflict of law provisions.
        </Section>

        <Section title="7. Contact Us">
          If you have any questions about these terms, please contact us at{' '}
          <a href="mailto:support@teachadvise.com" className="text-[#0b80ee] underline">
            support@teachadvise.com
          </a>
          .
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="px-4 py-4">
    <h3 className="text-lg font-bold text-[#111518] pb-2">{title}</h3>
    <p className="text-base text-[#111518] leading-relaxed">{children}</p>
  </div>
);

export default TermsOfServicePage;
