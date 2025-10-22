"use client";
import React, { useState } from "react"; // 1. استدعاء useState
import Header from "../../../../../Components/dashboard/Header";

const page = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price:0,
    category: "",
    pricing: "paid", 
  });
console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex flex-1 flex-col ml-0 lg:ml-64">
      <Header
        div={
          <button className="hidden sm:flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors">
            {/* <span className="material-symbols-outlined mr-2">add</span> */}
            <span className="truncate">Back</span>
          </button>
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
                      />
                      <span className="text-slate-700 dark:text-slate-300">
                        Paid
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button
                  className="px-6 py-3 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  type="button"
                >
                  Save Draft
                </button>
                <button
                  className="px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
                  type="submit" 
                >
                  Next Step
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;