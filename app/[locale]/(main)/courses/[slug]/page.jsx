import React from "react";
const api = process.env.URL_API
async function getAllProducts() {
  const res = await fetch(`${api}/product`); // Endpoint بيجيب كله
  return res.json();
}
const page = async ({params}) => {
  
  const {slug , locale} = await params
  const allProducts = await getAllProducts();
  const productInfo = allProducts.find(
    (p) => p.title[locale].toLowerCase().replace(/ /g, '-') === params.slug
   );
  console.log(`productinfo :: ${productInfo}     ///     slug :: ${slug} `);
  
  if (!productInfo) {
    return <div>Product not found!</div>;
  }
  const id = productInfo.id;
  // const api = ``
  const res = await fetch(`${api}/product/${id}`);
  const data = await res.json();
  console.log(data);
  
  return (
    <main className="flex-1">
      <div className="w-full bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 pt-12 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl shadow-lg"
                  data-alt="A vibrant abstract gradient representing the course's topic"
                  style={{
                    backgroundImage:
                      `url(${data.image})`,
                  }}
                ></div>
              </div>

              <div>
                <span className="text-primary font-semibold text-sm">
                  USER EXPERIENCE DESIGN
                </span>
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
                  {data.title[locale]}
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg mt-4 max-w-3xl">
                    {data.description[locale]}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square rounded-full w-12 h-12"
                    data-alt="Instructor's profile picture"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_sCTOQVHZaVJmSjWxRoIW8pk3WnvvBJ_Arq6ZnJO4qL4drrRl-hGlRZVoFieYUIulufjD4rNhhujgI4oUQ-FwoUsEYyyQy0yM9uYkkjAFQtspKLVPuBuDaX9Bh2OHvbvRD1SSLRNRVDK5t5mZ3By9yedLvgDXLbPxmMg24mgqWuIV_kRNko1wGvGOTWzgSBjuxxzlR2m8vb2ck9lIiPdgHtWLnCOsDigulFhZkWdOEkU_ycPXbREolKtLlz-a3m44i6wFEsqj-tGb')",
                    }}
                  ></div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {data.instructor[locale]}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Lead at Google
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-background-light dark:bg-background-dark rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <p className="text-4xl font-bold text-slate-900 dark:text-white">
                    {data.price}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 line-through text-lg">
                    $199
                  </p>
                </div>
                <p className="text-green-600 dark:text-green-400 font-semibold mt-1">
                  50% off for a limited time
                </p>
                <button className="mt-6 flex min-w-[84px] w-full items-center justify-center rounded-lg h-14 px-5 bg-primary text-slate-50 text-lg font-bold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 transform hover:-translate-y-1">
                  <span className="truncate">Enroll Now</span>
                </button>
                <button className="mt-3 flex min-w-[84px] w-full items-center justify-center rounded-lg h-12 px-5 bg-slate-200 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-base font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                  <span className="truncate">Add to Wishlist</span>
                </button>
                <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                  30-Day Money-Back Guarantee
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 mt-6 pt-5 flex flex-col gap-4">
                  <p className="font-bold text-slate-900 dark:text-white">
                    Course Inclusions:
                  </p>
                  <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                    <span
                      className="material-symbols-outlined text-primary mt-0.5"
                      style={{ fontSize: 20 }}
                    >
                      ondemand_video
                    </span>
                    <span>12 hours of on-demand video</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                    <span
                      className="material-symbols-outlined text-primary mt-0.5"
                      style={{ fontSize: 20 }}
                    >
                      article
                    </span>
                    <span>25 articles &amp; resources</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                    <span
                      className="material-symbols-outlined text-primary mt-0.5"
                      style={{ fontSize: 20 }}
                    >
                      code
                    </span>
                    <span>5 downloadable project files</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                    <span
                      className="material-symbols-outlined text-primary mt-0.5"
                      style={{ fontSize: 20 }}
                    >
                      all_inclusive
                    </span>
                    <span>Full lifetime access</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                    <span
                      className="material-symbols-outlined text-primary mt-0.5"
                      style={{ fontSize: 20 }}
                    >
                      workspace_premium
                    </span>
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-background-light dark:bg-background-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-12">
            {/* Left side - What you'll learn + Course syllabus */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-12">
                {/* What you'll learn */}
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                    What you'll learn
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    {data.whatLearn.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-slate-800/50 shadow-sm"
                      >
                        <span
                          className="material-symbols-outlined text-primary mt-1"
                          style={{ fontSize: 24 }}
                        >
                          check_circle
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">
                          {item[locale]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Syllabus */}
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                    Course Syllabus
                  </h3>

                  <div className="space-y-3">
                    {data.courseSyllabus.map((section, i) => (
                      <details
                        key={i}
                        className="group rounded-xl bg-white dark:bg-slate-800/50 shadow-sm overflow-hidden"
                        open={i === 0}
                      >
                        <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-slate-900 dark:text-white list-none">
                          <div className="flex items-center gap-4">
                            <span className="text-primary font-bold text-lg">
                              {section.moduleNumber}
                            </span>
                            <span className="font-semibold text-lg">
                              {section.moduleTitle[locale]}
                            </span>
                          </div>
                          <span className="ml-4 shrink-0 transition duration-300 group-open:rotate-180">
                            <span className="material-symbols-outlined">
                              expand_more
                            </span>
                          </span>
                        </summary>

                        <div className="bg-slate-50 dark:bg-slate-900/70 p-5 border-t border-slate-200 dark:border-slate-800">
                          <div className="space-y-4 text-slate-600 dark:text-slate-300">
                            {section.lessons.map((lesson, j) => (
                              <div key={j} className="flex items-center gap-3">
                                <span
                                  className="material-symbols-outlined text-slate-500"
                                  style={{ fontSize: 20 }}
                                >
                                  play_circle
                                </span>
                                <span>{lesson[locale]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Student Reviews */}
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-10">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                    Student Reviews
                  </h3>

                  <div className="space-y-6">
                    {[
                      {
                        name: "Sarah Johnson",
                        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqDSWnX-BQnRX9JcwTCTp7LR11ksZLqX9OEhrugbrPwG9hpBg_fNq52VU08j3JWPnocZVVIQp-7EBGZOZm0wz5q3YW-1rWowisjFzk6ecFoMOJFjxuVwYut8cJYEzWLoaz4Gk3ghFwoeJSvh34X0yiCNPLSfhqVfJTIqS02bV4A9S0xa7V2pMm8fh4eH4b1Ht5Tsny72iM7TUED6ZhlUyCIGoiydLhfn5_7HK0-b8qfxASEMQY7FWce4OggmWBm0FK_AKJLDDUFm2F",
                        rating: 4.5,
                        text: `"This course was fantastic! The instructor explained complex topics clearly and the projects were very practical and relevant to the industry today."`,
                      },
                      {
                        name: "Mike Chen",
                        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx9BX5IXMmOYsTsWcM0f6NE9JSfdirsNxzO2Wa8_oY4DmpLIfvcNnveaWch5BtvsTilkBW6jtb0dYt4tlS3aJZfjCiqLMKkICo7LTCGluJcrbT7yvv1OGbZsydO2S7BKXR05pPQV041iukfSqYJ4qD36t-GgYF-nA8zfnR5FwHldqeFr6iXXYEtPBIhIPsyHN9VNy5KIKv1Vb2ycmZ1zekONhYdSKN5zuFdawldw8HwPNiJzdZMwlD-OYrzWLXEQOw1Fa7zsDai14K",
                        rating: 5,
                        text: `"An absolutely brilliant course. I learned so much and now feel confident applying for junior UX roles. The syllabus was perfectly structured."`,
                      },
                    ].map((review, i) => (
                      <div
                        key={i}
                        className="p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="size-12 bg-center bg-no-repeat aspect-square bg-cover rounded-full shrink-0"
                            style={{ backgroundImage: `url(${review.img})` }}
                          ></div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 dark:text-white">
                              {review.name}
                            </p>
                            <div className="flex items-center gap-1 text-amber-400 mt-1">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <span
                                  key={j}
                                  className="material-symbols-outlined"
                                  style={{ fontSize: 16 }}
                                >
                                  {review.rating >= j + 1
                                    ? "star"
                                    : review.rating >= j + 0.5
                                    ? "star_half"
                                    : "star_outline"}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 text-slate-600 dark:text-slate-300">
                          {review.text}
                        </p>
                      </div>
                    ))}
                    <button className="w-full text-center text-primary font-semibold hover:underline">
                      Show all reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
