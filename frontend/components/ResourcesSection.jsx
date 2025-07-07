import React, { useState } from "react";

const resources = {
  title: "Free Career Development Resources",
  description:
    "Unlock your potential with our curated collection of free resources designed to help you succeed in your career journey.",
  categories: [
    {
      name: "Resume Templates",
      icon: "📄",
      items: [
        {
          title: "Modern Resume Template",
          description: "Clean, professional template for tech and creative roles",
          format: "PDF",
          size: "2.1 MB",
          difficulty: "Beginner",
          timeEstimate: "15 min",
          downloads: 1247,
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpkcfdPTg1_Dp2uzZm_nxcRd2NYZ2xsni2ZoRtSLmWgtPBIKIYZ0dG0zR9saKAwkpIm2_MXCRz-nCXLUixV1ut5zsjsUf6IZz4gQV0EtJFEHwmnkFcDRZW4d29aTUPR_OVTWYtLh8M_b8g6W1OZc6xV1seOjFxtw7WlL5emPBayGbl2ct5I42_sTaeLj_4UU8eUb5R0yTslklp5lhxXzIYdnhxo1SgJHfxqXJd_lH01zKDPB7F8-jC-ScfcbiquCB89QWM4y46T-8D",
          downloadUrl: "#",
        },
        {
          title: "Creative Resume Template",
          description: "Stand out with this visually appealing design",
          format: "DOCX",
          size: "1.8 MB",
          difficulty: "Intermediate",
          timeEstimate: "20 min",
          downloads: 892,
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjjqU5JAwkvjvQcz8WWn9hrSjoSF4qqksvNQgpWiAGiE0x9NPFRALDvK96b3wVP1THFrblxxW5Sk4Ihoiz0Y3nyG71MGXmKj2H5EkJHZdPLB2dvG81qu12P3qBfgGiWwP-83W04YHcXWF637T5tlKT3qIve33F37TAKSttWCD3MipdI24OKrRR6KJJ_1FJk7ZMv2HbGeXdcVA3aR0tB0Nk1R1mg-koUB8rnR0BGRgtcH8bZ8JdprJbWOI1pj9bKxmi1XN5gRNQO_UZ",
          downloadUrl: "#",
        },
        {
          title: "Professional Resume Template",
          description: "Classic format perfect for corporate environments",
          format: "PDF",
          size: "2.5 MB",
          difficulty: "Beginner",
          timeEstimate: "12 min",
          downloads: 2156,
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBIxxNREZSYcL_yD11z3v4LJlNNlDyEPjN4y6Tl-zTFGe9d-6Xy8czB-Anydy-kcUagkNk1EVjhw3I9m0T58hTJv-TyIir__d32IP9_iHJK9-QToEHoOkvEktrkEX8RxATr__pbdeneqtlYkg2Gjfd6zLso9ACZle6QulgtQEHbi94HyWkqh1hRO0fVVmxsBL-ORLd2F6sjXsCLYkXeQdKhNsF1nuiFWt06eep8L7mldQ5MRp_9Sa_Qe_8cpY2n11jVDuTH9hXas6r",
          downloadUrl: "#",
        },
      ],
    },
    {
      name: "Interview Guides",
      icon: "🎯",
      items: [
        {
          title: "Behavioral Interview Guide",
          description: "Master the STAR method and common behavioral questions",
          format: "PDF",
          size: "3.2 MB",
          difficulty: "Intermediate",
          timeEstimate: "45 min",
          downloads: 1893,
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9yrMmoNmxjXn_JpxarFIcCUqhjI4_BbbWj1oNSJz_yvxgtRGkTicUlh6r_WmGPhb5gCdYNRr31Wtjl13EoyXZvbqI4dubq1fZyTV3s9hnJDmIFuOb2NqksZ7xoH-X-sQmH8yaGosahqW0iDgi-ZSNp4goV6qEywZpYpt05gi8-sEDNF3LpWumQOY6yVLS0jj0G-X1h5trvSlVgoKaK4ra4ZvMDyzXqb2siXHoB_xqn8pt1tssItjZnHeXVeUxLjIj_aKjizglUSUv",
          downloadUrl: "#",
        },
        {
          title: "Technical Interview Guide",
          description: "Prepare for coding challenges and system design questions",
          format: "PDF",
          size: "4.1 MB",
          difficulty: "Advanced",
          timeEstimate: "60 min",
          downloads: 1456,
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHv5Ir8heOo_5WlvlAhmq0jEACPuNltnHdrZdM_l0VDVdcGvA2SCmcmK5ji7Mv8NdMyCc-yuNddPp0TQI2zVN5IbJSqzGTU66rJTAhEkpp_AjVwow_gakcJjSxmcCkT6DXfkNkbGYM9x0-bsvmrSRAaQNejtmCxZjONf917Al26ZPuq5-LNIcjXAjGlf0vqv-HGlxY8i6e0KNioWdL0WJdxjCXZqZWEEcPrbSaZ1UQFOsS5rDK3nocAYYPrL5KrU_ywP8BIhuLXWWV",
          downloadUrl: "#",
        },
        {
          title: "Case Study Interview Guide",
          description: "Framework for solving business case studies effectively",
          format: "PDF",
          size: "2.8 MB",
          difficulty: "Advanced",
          timeEstimate: "40 min",
          downloads: 978,
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADo86U7z9sw7fGjwnMUi5cFb9AFQ4HdG_pHvqL1gLywG39SaHq2vY0VjN52IZaebW1nuYskxTGjptXyqou2-mDVxCAl5z1Us34vuflUd7lCVMEpQEgRfCQWd16JRGI7_xCpcITRDxJGr6kZUrG22uPzU06ORpqtaQ-nd6-cqHAgxDqhO5sbZifUo7eO0z_G5fAJxUM1iRYycyYYQWxaVMSqP2PfSfekKcLJ4wq9_3VtlWjZZqGOBfxQifA0hefFKO5ZZfYRPPCs5O6",
          downloadUrl: "#",
        },
      ],
    },
    {
      name: "Skill Development Materials",
      icon: "🚀",
      items: [
        {
          title: "Communication Skills Guide",
          description: "Improve your verbal and written communication abilities",
          format: "PDF",
          size: "2.9 MB",
          difficulty: "Beginner",
          timeEstimate: "35 min",
          downloads: 1678,
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5q6PfZvaR372LVyNaQYwOwTAOx0taGhBuHMYW1sayuo4ehJpvCQVK0ZzC4J4wmZ_yhebcKaZglRKO6PxRv60JE5hFbfBtYgbq1oLV29-zuef0X8oilpDYzn2C6JrY1f7mWjKJ9OnhygY7CV__ouqpqfGGkVNEQECGhcIajcCgfZm77wp6Wkz9OMJuHn-yCNId7fRZe9xuW8TXkq8H6SsKfJ-cnKLDc2y7SFvRMBTFwlDoe-PhiXAej0piDUkx_hlTGgW3b_-Ru3Xz",
          downloadUrl: "#",
        },
        {
          title: "Leadership Skills Guide",
          description: "Develop essential leadership and management capabilities",
          format: "PDF",
          size: "3.5 MB",
          difficulty: "Intermediate",
          timeEstimate: "50 min",
          downloads: 1234,
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkiGV-5uIvtTMARcI2dAn1kmjMq0NXoQVopMgC9RDDnglDnb5lhNlDmOFZsD5rZK68yR9Oavesdhkg56fTzFDTrW1xE4HARmq9w31LluKx7qkokTkc54ua-Ya-PNScpJAt6l94Y1_qs3Ed86IOrX0ybjdzrvehjPZnIbglag7tGasMReyuFUtyMrQdMXs8qUqlpH7tl03LF4x9-petISw04FcWVyAtAYXCMS7D1x92xiKkPA5c7Om7K5GKvPr1VJjHq3RWDJB3u6Et",
          downloadUrl: "#",
        },
        {
          title: "Problem-Solving Skills Guide",
          description: "Master analytical thinking and creative problem-solving",
          format: "PDF",
          size: "2.7 MB",
          difficulty: "Intermediate",
          timeEstimate: "30 min",
          downloads: 1456,
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPHIUFTMC4TVXO9CVDJ59R4pfRnmNDroGo8Z0M8cDF9J78XAV2EkUQYI9hU6kfrdWbZuNACrEEgt5876BZipHUlX6AefLQx_vOOyC3fXTpAUkOBXJCVjJQqV1Gx57MqBF3eMKAWkii5_zzW2NEayv3dVWlbXP4MdqpTF0UotS9KlM8iMgRot_FsFVjSnWeEXFRXbSQKjhddzWWIL1SPQ3ACcH6B2cQ23J7cH9Ks-Xj1opkH3yf8Oasz-E9YeQ9wGT_wEcag5utKhyC",
          downloadUrl: "#",
        },
      ],
    },
    {
      name: "Industry Guides",
      icon: "🏢",
      items: [
        {
          title: "Tech Industry Overview",
          description: "Comprehensive guide to technology career paths and trends",
          format: "PDF",
          size: "4.2 MB",
          difficulty: "Beginner",
          timeEstimate: "55 min",
          downloads: 2341,
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpkcfdPTg1_Dp2uzZm_nxcRd2NYZ2xsni2ZoRtSLmWgtPBIKIYZ0dG0zR9saKAwkpIm2_MXCRz-nCXLUixV1ut5zsjsUf6IZz4gQV0EtJFEHwmnkFcDRZW4d29aTUPR_OVTWYtLh8M_b8g6W1OZc6xV1seOjFxtw7WlL5emPBayGbl2ct5I42_sTaeLj_4UU8eUb5R0yTslklp5lhxXzIYdnhxo1SgJHfxqXJd_lH01zKDPB7F8-jC-ScfcbiquCB89QWM4y46T-8D",
          downloadUrl: "#",
        },
        {
          title: "Finance Career Paths",
          description: "Explore opportunities in banking, consulting, and fintech",
          format: "PDF",
          size: "3.8 MB",
          difficulty: "Intermediate",
          timeEstimate: "45 min",
          downloads: 1567,
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjjqU5JAwkvjvQcz8WWn9hrSjoSF4qqksvNQgpWiAGiE0x9NPFRALDvK96b3wVP1THFrblxxW5Sk4Ihoiz0Y3nyG71MGXmKj2H5EkJHZdPLB2dvG81qu12P3qBfgGiWwP-83W04YHcXWF637T5tlKT3qIve33F37TAKSttWCD3MipdI24OKrRR6KJJ_1FJk7ZMv2HbGeXdcVA3aR0tB0Nk1R1mg-koUB8rnR0BGRgtcH8bZ8JdprJbWOI1pj9bKxmi1XN5gRNQO_UZ",
          downloadUrl: "#",
        },
      ],
    },
  ],
};

const ResourcesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDownload = (resource) => {
    // Simulate download functionality
    console.log(`Downloading: ${resource.title}`);
    // In a real app, this would trigger an actual download
    alert(`Downloading ${resource.title}...`);
  };

  const filteredCategories = resources.categories.filter((category) => {
    if (selectedCategory !== "all" && category.name !== selectedCategory) {
      return false;
    }
    return true;
  });

  const filteredResources = filteredCategories.map((category) => ({
    ...category,
    items: category.items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((category) => category.items.length > 0);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDownloads = (downloads) => {
    if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}k`;
    }
    return downloads.toString();
  };

  return (
    <section className="px-4 md:px-10 lg:px-20 py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[#111518] text-[32px] md:text-[40px] font-bold leading-tight mb-4">
            {resources.title}
          </h2>
          <p className="text-[#60768a] text-lg max-w-3xl mx-auto">
            {resources.description}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Categories
            </button>
            {resources.categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.map((category, idx) => (
          <div key={idx} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-[#111518] text-[24px] font-bold leading-tight">
                {category.name}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Resource Image */}
                  <div className="relative h-48 bg-gray-100">
                    <div
                      className="w-full h-full bg-center bg-cover bg-no-repeat"
                      style={{ backgroundImage: `url(${item.img})` }}
                      role="img"
                      aria-label={`Preview of ${item.title}`}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-medium text-gray-700">
                        {item.format}
                      </span>
                    </div>
                  </div>

                  {/* Resource Content */}
                  <div className="p-6">
                    <h4 className="text-[#111518] text-lg font-bold leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    
                    <p className="text-[#60768a] text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Resource Meta */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                        {item.difficulty}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                        ⏱️ {item.timeEstimate}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                        📦 {item.size}
                      </span>
                    </div>

                    {/* Downloads and Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        📥 {formatDownloads(item.downloads)} downloads
                      </span>
                      
                      <button
                        onClick={() => handleDownload(item)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        aria-label={`Download ${item.title}`}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No resources found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourcesSection;
