"use client";
import React, { useState } from "react";
import Header from "../../../../../Components/dashboard/Header";
import { Link } from "../../../../../../src/i18n/navigation";
import { useUser } from "@clerk/nextjs";

import toast, { Toaster } from "react-hot-toast";

const Page = ({ params }) => {
  const locale = params;
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    pricing: "paid",
    whatLearn:"",
    titleSyllabus:"",
    descriptionSyllabus:""
  });
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === "price" ? Number(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err =
      locale === "en"
        ? "User not loaded yet. Please wait."
        : "لم يتم تحميل المستخدم. يرجى الانتظار.";
    if (!user || user.unsafeMetadata?.role !== "teacher") {
      toast.error(err);
      return;
    }
    const loa =
      locale === "en"
        ? "Translating course details..."
        : "ترجمة تفاصيل الدورة...";
    setIsLoading(true);
    toast.loading("Translating course details...");

    const { title, description, price, category, pricing } = formData;

    const translateText = async (text, langPair = "en|ar") => {
      if (!text) return text;

      try {
        const query = encodeURIComponent(text);
        const url = `https://api.mymemory.translated.net/get?q=${query}&langpair=${langPair}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.responseStatus === 200) {
          return data.responseData.translatedText;
        } else {
          return text;
        }
      } catch (error) {
        console.error("Translation API error:", error);
        return text;
      }
    };

    try {
      const [arTitle, arDescription, arCategory, arInstructorName] =
        await Promise.all([
          translateText(title),
          translateText(description),
          translateText(category),
          translateText(user.fullName),
        ]);

      const finalPayload = {
        title: {
          en: title,
          ar: arTitle,
        },
        description: {
          en: description,
          ar: arDescription,
        },
        price: price,
        categories: {
          en: category,
          ar: arCategory,
        },
        instructor: {
          en: user.fullName,
          ar: arInstructorName,
        },
        image:
          "https://res.cloudinary.com/dr2dnmx76/image/upload/v1761519614/DeWatermark.ai_1761519547381_o7klrn.jpg",
      };

      toast.dismiss();
      const sa =
        locale === "en" ? "Saving course to API..." : "حفظ الدورة في API...";
      toast.loading(sa);

      const res = await fetch(
        "https://68f816d9deff18f212b51c45.mockapi.io/api/product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalPayload),
        }
      );

      if (!res.ok) {
        throw new Error(`MockAPI Error: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Saved data:", data);

      const succ =
        locale === "en"
          ? "Course added and translated successfully!"
          : "تم إضافة الدورة وترجمته بنجاح!";
      toast.dismiss();
      toast.success(succ);
      setFormData({
        title: "",
        description: "",
        price: 0,
        category: "",
        pricing: "paid",
      });
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {" "}
      <Toaster position="top-center" />
      <div className="flex flex-1 flex-col ml-0 lg:ml-64">
        <Header
          div={
            <Link
              href={`/dashboard/mycourses`}
              className="hidden sm:flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors"
            >
              <span className="truncate">Back</span>
            </Link>
          }
        />

        <main className="flex-1 px-[24px] sm:px-6 py-8">
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-wrap justify-between gap-3 ">
                <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                  Add New Course
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-200">
                Course Details
              </h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <label className="flex flex-col flex-1">
                  <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                    Course Title
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
                    placeholder="Enter course title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </label>
                <label className="flex flex-col flex-1">
                  <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                    Course price
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
                    placeholder="Enter course price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </label>
                <label className="flex flex-col flex-1">
                  <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                    Course Description
                  </p>
                  <div className="rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark focus-within:ring-2 focus-within:ring-primary/50">
                    <div className="p-2 border-b border-slate-300 dark:border-slate-700 flex items-center gap-2">
                      <button
                        className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-sm">
                          format_bold
                        </span>
                      </button>
                      <button
                        className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-sm">
                          format_italic
                        </span>
                      </button>
                      <button
                        className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-sm">
                          format_underlined
                        </span>
                      </button>
                      <button
                        className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-sm">
                          format_list_bulleted
                        </span>
                      </button>
                      <button
                        className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-sm">
                          format_list_numbered
                        </span>
                      </button>
                    </div>
                    <textarea
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-b-lg text-slate-900 dark:text-white focus:outline-none ring-0 border-0 bg-transparent min-h-36 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
                      placeholder="Enter course description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col flex-1">
                    <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                      Category
                    </p>
                    <select
                      className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      disabled={isLoading}
                    >
                      <option value="">Select a category</option>
                      <option value="development">Development</option>
                      <option value="design">Design</option>
                      <option value="business">Business</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </label>
                  <div>
                    <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                      Pricing
                    </p>
                    <div className="flex gap-4 items-center h-14">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          className="form-radio text-primary focus:ring-primary/50 border-slate-300 dark:border-slate-600 bg-background-light dark:bg-slate-800"
                          name="pricing"
                          type="radio"
                          value="free"
                          checked={formData.pricing === "free"}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                        <span className="text-slate-700 dark:text-slate-300">
                          Free
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          className="form-radio text-primary focus:ring-primary/50 border-slate-300 dark:border-slate-600 bg-background-light dark:bg-slate-800"
                          name="pricing"
                          type="radio"
                          value="paid"
                          checked={formData.pricing === "paid"}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                        <span className="text-slate-700 dark:text-slate-300">
                          Paid
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="flex flex-col flex-1">
                      <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                        Title of Course Syllabus
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
                        placeholder="Title of Course Syllabus"
                        name="titleSyllabus"
                        value={formData.titleSyllabus}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </label>
                    <label className="flex flex-col flex-1">
                      <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                        Course Syllabus
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
                        placeholder="Course Syllabus"
                        name="descriptionSyllabus"
                        value={formData.descriptionSyllabus}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </label>
                  </div>
                  <label className="flex flex-col flex-1">
                    <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                      What you'll learn
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
                      placeholder="What you'll learn"
                      name="whatLearn"
                      value={formData.whatLearn}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </label>
                </div>
                <div className="flex justify-end gap-4 pt-6">
                  <button
                    className="px-6 py-3 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    type="button"
                    disabled={isLoading}
                  >
                    Save Draft
                  </button>
                  <button
                    className="px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" // إضافة ستايل للتعطيل
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Next Step"}
                    {!isLoading && (
                      <span className="material-symbols-outlined text-base">
                        arrow_forward
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Page;
