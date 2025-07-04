import React from "react";

const blogArticles = [
  {
    title: "Top 5 Skills for Career Success",
    description: "Learn the essential skills that will set you apart in today's competitive job market.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADg78ogNX6iKqaEJ-CVVFsbe47RrCQyRecyk8atHK7Uwce8gvM82geSWNx9tZKAJqqXWM1a84T2JpJFli2FOTltHhWtOsILilGUQyuEun-NTWwDo4Az-05bfW1jMR4n0oI0AP3oUTTHJyG3BvFvgjMQwgzKsqxnI8oiYSt_GhLHJc5IpClihCS4TsOtUNOhKub1sS8aGJ7MIKsXSTVVXe7qtJfbd2eov1CQZrwpHaUY_D8Qdwo4_ZP7Pk77bvZ6xCOQLNrlo7RQn7U",
  },
  {
    title: "Navigating Your Career Path",
    description: "Strategies for making informed decisions and achieving your long-term career goals.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA32bevNxgoMILORL7ns2inVgbEe3Dfp0fNaISpxizEqRycgqVyFz-tn2k-dD7UlInY7Ml9Xo-mstObeWqBeZeBvAOCPYT42YthSfrh4r1BMweySeAahhroCD7CfqBYQm_CYsDF6hWOf4_N4jVD_w9JduGX8JygEzyRml9ZHkBae6Vq-JKbI1Scmp9ggdp8TQpTNMfrtKlkEkK5Zu7UJfGlhuuoFOU2IUPGmxa5JZ5UZy5SRe-O-plnSdW1KrDelfvw_RnyNxfnOT29",
  },
];

const BlogSection = () => {
  return (
    <section className="px-4 pt-10 pb-16">
      <h2 className="text-[#111518] text-2xl font-bold leading-tight tracking-tight mb-6">
        Latest Blog Articles
      </h2>

      {blogArticles.map((article, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-xl py-4 px-8 bg-white shadow-md mb-6"
        >
          {/* Text Content */}
          <div className="flex flex-col gap-2 flex-[2_2_0px]">
            <p className="text-[#111518] text-base font-semibold leading-tight">
              {article.title}
            </p>
            <p className="text-[#60768a] text-sm font-normal leading-relaxed">
              {article.description}
            </p>
            <a
              href="#"
              className="text-blue-600 hover:underline font-medium mt-2 inline-block"
            >
              Read More &rarr;
            </a>
          </div>

          {/* Image */}
          <div className="w-full md:w-64">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="rounded-xl w-full aspect-video object-cover"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default BlogSection;