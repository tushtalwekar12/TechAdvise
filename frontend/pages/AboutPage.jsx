import React from 'react';

const teamMembers = [
  {
    name: 'Sameer Randive',
    role: 'CEO',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzELrx5Lg1cNafARq-psl45h33wBqqe2kFE_NfMD5vECRGFygG9cJpzSUPZljRmn_ZUuZ1QW_1ngmrFfxS2B3Ej4qHJni8PcQHpIwUvutN7qcMBliDKVkMVZKJPvybocGthnZ0WwV2AtwhtNaxCrK3h4TxcYWnqC0tmLyh7rw862ikCXTZaSqwc9-W0Mccl_hLy123q-0h85LV1XQTASLvy8kScm3JnQtx3fIBGAZguvy3z8Lv2k4uLVdFLzw5n74z6PfF40_tAuCw',
  },
  {
    name: 'Tushar Talwekar',
    role: 'CTO',
    image:
      '/src/assets/tusharphoto.jpg',
  },
  {
    name: 'Vaibhav Rane',
    role: 'Marketing Head',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgOIBo7J37gXR0wx2pjHH75jLJGj37IRoHJNbJYRlr5p0BDCIXLpsrsQD_8XMg639iO4kw81tYLi2q1K6lSMeNX0oslHgwz6s2Wcc5uOZGjFE15yws0xwL0pzZP-vA8_4GlsZmKIcHSIFJEULa0i0k4rBddVm_NtIp3W-tAjv2KhWdQ6bZvc-MViB0l00nMLepujlbdB19O28BAedoTGaotYGaOb_6hYBRuzPNIANnk56Up5MtNAWwaCrmQR3Qy47MnIumH-06SB_X',
  },
];

const AboutPage = () => {
  return (
    <div className="px-4 md:px-20 lg:px-40 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <div className="text-[32px] font-bold text-[#121416]">About TeachAdvise</div>

        {/* Mission */}
        <section>
          <h2 className="text-[22px] font-bold text-[#121416] px-2 pb-3">Our Mission</h2>
          <p className="text-base font-normal text-[#121416] px-2">
            At TeachAdvise, our mission is to empower students and professionals to achieve their career aspirations. We provide a
            comprehensive platform that connects individuals with internships, jobs, virtual classes, and valuable resources. Our goal is to
            bridge the gap between education and employment, offering personalized guidance and support every step of the way.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-[22px] font-bold text-[#121416] px-2 pb-3">Our Values</h2>
          <p className="text-base font-normal text-[#121416] px-2">
            We are committed to excellence, integrity, and innovation. We believe in fostering a supportive community where individuals can
            learn, grow, and succeed. Our values drive us to continuously improve our services and deliver exceptional experiences to our
            users.
          </p>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-[22px] font-bold text-[#121416] px-2 pb-3">Meet Our Team</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6 px-2">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-2">
                <div
                  className="w-24 h-24 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${member.image})` }}
                ></div>
                <p className="text-[#121416] text-base font-medium">{member.name}</p>
                <p className="text-[#6a7681] text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-[22px] font-bold text-[#121416] px-2 pb-3">Contact Us</h2>
          <p className="text-base font-normal text-[#121416] px-2">
            We'd love to hear from you! If you have any questions, feedback, or inquiries, please reach out to us at
            <strong> support@teachadvise.com </strong> or call us at <strong>(555) 123-4567</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
