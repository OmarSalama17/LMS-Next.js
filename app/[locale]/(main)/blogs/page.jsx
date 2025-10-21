"use client";

import { useState } from "react";

const newsData = [
  {
    category: "Featured Article",
    title: "The Future of Learning: How AI is Revolutionizing Education",
    description:
      "Discover how artificial intelligence is shaping the next generation of learning tools and platforms, personalizing student experiences, and empowering educators like never before.",
    author: "Admin",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1iqZBmQiJNQBd8JJZ6sbstoSXRcCzyLKY4WzZmCF83xT-K0G7YCa_TF34YZIexSnGCcNn3UxMsbbED_IKDH66W6twoKPscQBPKbazSulcTG_X0clMH6cxb2IsrToDdgpbcYPajdYClIjY8fXME_yXYC7Kp3rac4Pcy3UBgDBg0_8jUdMpwqPl91NZgu1iVx4pgl2k_DSoAnKPV-PFO87Fh-o433UE6Upfl6oEMdWeRvV1hI9n46DhNPiwaDA9uGddvaccoAJ8XeDs",
  },
  {
    title: "5 Essential Study Tips for Online Students",
    author: "Jane Doe - May 28, 2024",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaJ_nO2Li2evsGRyHv4qGLgKQeutTfQR1KoEv5fWzntA5hKzQZCtOMl9mEiuu0G3Sx8D7qNgq7XdcDL3_60wa0vnapAuhWMy8PsKUk2spOhtawJXwje-fAOemnHBYSXjeTv4m-ye63CYPW108y5mCw70CaN_OMH1fihx048pIpZC4pKaBOva6eFq8XVbtxpR93f6EgTgwu7x5Mr6dPhL8RlCTlFBBVAZZV49OnJ7AJcpMGBB27PJSVM04maBEQctbJlpK4Pm7fdZ31",
    category: "Study Tips",
  },
  {
    title: "New Feature: Introducing Collaborative Whiteboards",
    author: "Admin - May 25, 2024",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBovV4kia2YIG5wzJvSYTmn-1ktCebwyPAA0o7r528zc7AiK76-iFcQ_zytwI0Z3_FVyYAgen4oh1jssBE_bHvVvf453mExlv24Bf0bq6u4awA8TGsSKM-MNRzneRUczdm-mErnqLedxQJ9fRqWX-5XDKZdoSaLlouvECTEXG8m-8emp2Lzt8vRLhtH3rycyrt67YGW4VHDu_4RYi8BitFW5RuX0Ud8NqxXBZfhyVFr1n0FhAFmaEdhigQfq7D9vCzu3ZAF-P3MOSdo",
    category: "Product Updates",
  },
  {
    title: "Instructor Spotlight: Dr. Evelyn Reed",
    author: "By Staff Writer - May 22, 2024",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYP4JCskfAA3pvqDUQ7AIo3pD6zMj-4u7WUPbVVxBEhgd68WOx-UkHB6BbalGLTfY1IUp_z0TrYzoBmiQ9qgOWcWDRMbVjGWZVfb-dJFmijcWE2hFODEIvMLMTYBL_LzzriV_5Q4fzchJaepM_ZWbX-WroQd3W6Qd0Q1SfqVHGdTZTwTvWsTn3hTXRdCgHOnCgBIf0P74iwZvuSE4lh3sorY4GcExZ4oH_FxKNdB2pcV2-6N3DsMaknaUHxDtIUYov0cCqUSBHbMO1",
    category: "Instructor Resources",
  },
  {
    title: "Maximizing Student Engagement in Virtual Classrooms",
    author: "By John Smith - May 20, 2024",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkWYvXNghTJ87kcmg0go8dkejI9hDKiBrM-zPUGbNAhQoGic3IVKR3O2L8IN_bPQEDi108gA1DDpWMOTECJtJC4UKGzeYO7wiI8OFDW_uEB5kc6omQNG1OUB3AuDYr-2DAGonWJOIvNfiukK-gdkmdUU0oIB-nfrYrvbAI-L-gE4lIUbLzedxebrsbesW0G1kmGPOmlkPHlXzTMs5Rzje_pA7SIeSBe5BGt_P4kCYW-Sie3r_sPYHBbEq8jfeUZnT_oZnZXwOcJbPv",
    category: "Study Tips",
  },
  {
    title: "The Gamification of Learning: A Deep Dive",
    author: "By Dr. Alan Grant - May 18, 2024",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_q7BGPhQKVqzFwyq0u0wBI0GcJWiWEMGFY4SNDYr9HoSSzXrGVTOLbvA5s1IQp9LZqC9ZpuUQWNSxCUHDV6shDdWEQavG6ftYAXb217iBEcIUxQv1fZF7TUuDRCc-tiIvfkh0WkducPbCnR_Fllf9nebFseIaZl7sF7dq6hf7QJ9agTR8Of9-RDzoKBFRRg5x0X3_kTbpbUAZfAgunQ7ykkebuf1-G8nKn2zY-qawXHqeDyy53-ez91fN3bTPvIgSCq5xgl8Qu7kO",
    category: "Platform News",
  },
  {
    title: "Security Update: Enhanced Data Protection for Your Account",
    author: "By Security Team - May 15, 2024",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzyMOEy3pXXTeLpd6L0F-rLluGwk6ciHyAF8P4EGYnGleRROn4boNaSFuTnI3m2o87EOHrDtbE9teADna7Zs30APpd0Zgko8cdrIVi-C-b-5totMnCxCyFPD-85NgHdtW1GhGN0RcoWGBTLV_s4ZNuD_62g-d7PbFx-ERBlCMXWMtApaxrT42zWcbNgZ2W1mLw55KTgTr-18U4bPEj-T_FOTmzy0oFZ6Hj7Wqv8Isfu_7Bl9tUBI7P3OX-JfEHtSt9XjANTJwqWoMB",
    category: "Platform News",
  },
];

export default function page() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Product Updates",
    "Study Tips",
    "Instructor Resources",
    "Platform News",
  ];

  const filteredNews =
    selectedCategory === "All"
      ? newsData
      : newsData.filter((item) => item.category === selectedCategory);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-between gap-3 p-4 py-8">
        <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          LMS News & Updates
        </p>
      </div>

      <div className="flex gap-3 p-3 overflow-x-auto">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 cursor-pointer ${
              selectedCategory === cat
                ? "bg-primary text-white"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <p className="text-sm font-medium leading-normal">{cat}</p>
          </div>
        ))}
      </div>

      {filteredNews.slice(0, 1).map((item, index) => (
        <div key={index} className="p-4 @container">
          <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start shadow-[0_0_10px_rgba(0,0,0,0.05)] bg-white dark:bg-gray-800 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div
              className="w-full @xl:w-2/5 h-64 @xl:h-auto @xl:self-stretch bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>
            <div className="flex w-full @xl:w-3/5 min-w-72 grow flex-col items-stretch justify-center gap-3 p-6 @xl:p-8">
              <p className="text-primary text-sm font-bold leading-normal">
                {item.category || "Featured Article"}
              </p>
              <p className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
                {item.title}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                  By {item.author}
                </p>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal hover:bg-primary/90">
                  <span className="truncate">Read More</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredNews.slice(1).map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 pb-3 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover"
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>
            <div className="p-4 flex flex-col gap-2">
              <p className="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                {item.title}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                {item.author}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 m-4 mt-10 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Stay in the Loop
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Get the latest news, updates, and study tips delivered right to your
          inbox.
        </p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
          <input
            className="form-input flex-grow w-full h-12 px-4 rounded-lg border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-primary focus:border-primary"
            placeholder="Enter your email address"
            type="email"
          />
          <button
            className="flex justify-center items-center w-full sm:w-auto h-12 px-8 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
    </main>
  );
}
