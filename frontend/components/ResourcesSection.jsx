import React from "react";

const resources = {
  title: "Free Career Development Resources",
  description:
    "Unlock your potential with our curated collection of free resources designed to help you succeed in your career journey.",
  categories: [
    {
      name: "Resume Templates",
      items: [
        {
          title: "Modern Resume Template",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpkcfdPTg1_Dp2uzZm_nxcRd2NYZ2xsni2ZoRtSLmWgtPBIKIYZ0dG0zR9saKAwkpIm2_MXCRz-nCXLUixV1ut5zsjsUf6IZz4gQV0EtJFEHwmnkFcDRZW4d29aTUPR_OVTWYtLh8M_b8g6W1OZc6xV1seOjFxtw7WlL5emPBayGbl2ct5I42_sTaeLj_4UU8eUb5R0yTslklp5lhxXzIYdnhxo1SgJHfxqXJd_lH01zKDPB7F8-jC-ScfcbiquCB89QWM4y46T-8D",
        },
        {
          title: "Creative Resume Template",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjjqU5JAwkvjvQcz8WWn9hrSjoSF4qqksvNQgpWiAGiE0x9NPFRALDvK96b3wVP1THFrblxxW5Sk4Ihoiz0Y3nyG71MGXmKj2H5EkJHZdPLB2dvG81qu12P3qBfgGiWwP-83W04YHcXWF637T5tlKT3qIve33F37TAKSttWCD3MipdI24OKrRR6KJJ_1FJk7ZMv2HbGeXdcVA3aR0tB0Nk1R1mg-koUB8rnR0BGRgtcH8bZ8JdprJbWOI1pj9bKxmi1XN5gRNQO_UZ",
        },
        {
          title: "Professional Resume Template",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBIxxNREZSYcL_yD11z3v4LJlNNlDyEPjN4y6Tl-zTFGe9d-6Xy8czB-Anydy-kcUagkNk1EVjhw3I9m0T58hTJv-TyIir__d32IP9_iHJK9-QToEHoOkvEktrkEX8RxATr__pbdeneqtlYkg2Gjfd6zLso9ACZle6QulgtQEHbi94HyWkqh1hRO0fVVmxsBL-ORLd2F6sjXsCLYkXeQdKhNsF1nuiFWt06eep8L7mldQ5MRp_9Sa_Qe_8cpY2n11jVDuTH9hXas6r",
        },
      ],
    },
    {
      name: "Interview Guides",
      items: [
        {
          title: "Behavioral Interview Guide",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9yrMmoNmxjXn_JpxarFIcCUqhjI4_BbbWj1oNSJz_yvxgtRGkTicUlh6r_WmGPhb5gCdYNRr31Wtjl13EoyXZvbqI4dubq1fZyTV3s9hnJDmIFuOb2NqksZ7xoH-X-sQmH8yaGosahqW0iDgi-ZSNp4goV6qEywZpYpt05gi8-sEDNF3LpWumQOY6yVLS0jj0G-X1h5trvSlVgoKaK4ra4ZvMDyzXqb2siXHoB_xqn8pt1tssItjZnHeXVeUxLjIj_aKjizglUSUv",
        },
        {
          title: "Technical Interview Guide",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHv5Ir8heOo_5WlvlAhmq0jEACPuNltnHdrZdM_l0VDVdcGvA2SCmcmK5ji7Mv8NdMyCc-yuNddPp0TQI2zVN5IbJSqzGTU66rJTAhEkpp_AjVwow_gakcJjSxmcCkT6DXfkNkbGYM9x0-bsvmrSRAaQNejtmCxZjONf917Al26ZPuq5-LNIcjXAjGlf0vqv-HGlxY8i6e0KNioWdL0WJdxjCXZqZWEEcPrbSaZ1UQFOsS5rDK3nocAYYPrL5KrU_ywP8BIhuLXWWV",
        },
        {
          title: "Case Study Interview Guide",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADo86U7z9sw7fGjwnMUi5cFb9AFQ4HdG_pHvqL1gLywG39SaHq2vY0VjN52IZaebW1nuYskxTGjptXyqou2-mDVxCAl5z1Us34vuflUd7lCVMEpQEgRfCQWd16JRGI7_xCpcITRDxJGr6kZUrG22uPzU06ORpqtaQ-nd6-cqHAgxDqhO5sbZifUo7eO0z_G5fAJxUM1iRYycyYYQWxaVMSqP2PfSfekKcLJ4wq9_3VtlWjZZqGOBfxQifA0hefFKO5ZZfYRPPCs5O6",
        },
      ],
    },
    {
      name: "Skill Development Materials",
      items: [
        {
          title: "Communication Skills Guide",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5q6PfZvaR372LVyNaQYwOwTAOx0taGhBuHMYW1sayuo4ehJpvCQVK0ZzC4J4wmZ_yhebcKaZglRKO6PxRv60JE5hFbfBtYgbq1oLV29-zuef0X8oilpDYzn2C6JrY1f7mWjKJ9OnhygY7CV__ouqpqfGGkVNEQECGhcIajcCgfZm77wp6Wkz9OMJuHn-yCNId7fRZe9xuW8TXkq8H6SsKfJ-cnKLDc2y7SFvRMBTFwlDoe-PhiXAej0piDUkx_hlTGgW3b_-Ru3Xz",
        },
        {
          title: "Leadership Skills Guide",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkiGV-5uIvtTMARcI2dAn1kmjMq0NXoQVopMgC9RDDnglDnb5lhNlDmOFZsD5rZK68yR9Oavesdhkg56fTzFDTrW1xE4HARmq9w31LluKx7qkokTkc54ua-Ya-PNScpJAt6l94Y1_qs3Ed86IOrX0ybjdzrvehjPZnIbglag7tGasMReyuFUtyMrQdMXs8qUqlpH7tl03LF4x9-petISw04FcWVyAtAYXCMS7D1x92xiKkPA5c7Om7K5GKvPr1VJjHq3RWDJB3u6Et",
        },
        {
          title: "Problem-Solving Skills Guide",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPHIUFTMC4TVXO9CVDJ59R4pfRnmNDroGo8Z0M8cDF9J78XAV2EkUQYI9hU6kfrdWbZuNACrEEgt5876BZipHUlX6AefLQx_vOOyC3fXTpAUkOBXJCVjJQqV1Gx57MqBF3eMKAWkii5_zzW2NEayv3dVWlbXP4MdqpTF0UotS9KlM8iMgRot_FsFVjSnWeEXFRXbSQKjhddzWWIL1SPQ3ACcH6B2cQ23J7cH9Ks-Xj1opkH3yf8Oasz-E9YeQ9wGT_wEcag5utKhyC",
        },
      ],
    },
  ],
};

const ResourcesSection = () => {
  return (
    <section className="px-4 md:px-10 lg:px-20 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-[#111518] text-[28px] md:text-[32px] font-bold leading-tight">
            {resources.title}
          </h2>
          <p className="text-[#60768a] text-base mt-2">
            {resources.description}
          </p>
        </div>

        {resources.categories.map((category, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-3">
              {category.name}
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4">
              {category.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 items-center"
                >
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 shrink-0"
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                  <h4 className="text-[#111518] text-base font-bold leading-tight">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResourcesSection;
