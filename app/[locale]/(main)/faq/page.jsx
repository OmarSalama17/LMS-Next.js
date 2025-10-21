"use client";
import { useState, useEffect } from "react";

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState([true, false, false]);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleFAQ = (index) => {
    setOpenFAQ((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };


  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
      {/* Header */}
      {/* Main */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <div className="flex flex-wrap gap-2 pb-6">
            <a className="text-[#617589] dark:text-gray-400 text-sm font-medium" href="#">
              Home
            </a>
            <span className="text-[#617589] dark:text-gray-400 text-sm font-medium">/</span>
            <span className="text-[#111418] dark:text-white text-sm font-medium">FAQs</span>
          </div>

          {/* Title */}
          <div className="flex flex-wrap justify-between gap-3 pb-8">
            <p className="text-[#111418] dark:text-white text-4xl font-black leading-tight min-w-72">
              Frequently Asked Questions
            </p>
          </div>

          {/* Search */}
          <div className="pb-8">
            <label className="flex flex-col min-w-40 h-12 w-full max-w-2xl mx-auto">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full shadow-sm">
                <div className="text-[#617589] dark:text-gray-400 flex border border-r-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark items-center justify-center pl-4 rounded-l-lg">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark h-full placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  placeholder="Search for answers..."
                  value=""
                />
              </div>
            </label>
          </div>

          {/* FAQ Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="md:col-span-3">
              <div className="sticky top-24">
                <div className="pb-3">
                  <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pr-4 gap-2">
                    <a className="flex items-center gap-3 rounded-md px-3 py-2 text-primary bg-primary/10 dark:bg-primary/20" href="#">
                      <span className="material-symbols-outlined text-xl">help_outline</span>
                      <p className="text-sm font-bold">General</p>
                    </a>
                    <a className="flex items-center gap-3 rounded-md px-3 py-2 text-[#617589] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" href="#">
                      <span className="material-symbols-outlined text-xl">person</span>
                      <p className="text-sm font-bold">Account</p>
                    </a>
                    <a className="flex items-center gap-3 rounded-md px-3 py-2 text-[#617589] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" href="#">
                      <span className="material-symbols-outlined text-xl">school</span>
                      <p className="text-sm font-bold">Courses</p>
                    </a>
                    <a className="flex items-center gap-3 rounded-md px-3 py-2 text-[#617589] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" href="#">
                      <span className="material-symbols-outlined text-xl">payment</span>
                      <p className="text-sm font-bold">Billing</p>
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* FAQ Content */}
            <div className="md:col-span-9 space-y-4">
              {[
                {
                  question: "What is the LMS platform?",
                  answer:
                    "Our LMS platform is a comprehensive online learning environment designed to help instructors create and deliver engaging courses, and for students to access high-quality educational content anytime, anywhere.",
                },
                {
                  question: "How do I enroll in a course?",
                  answer:
                    'To enroll in a course, simply browse our course catalog, select the course you\'re interested in, and click the "Enroll Now" button. You may need to create an account or log in to complete the enrollment process.',
                },
                {
                  question: "Can I access courses on mobile devices?",
                  answer:
                    "Yes, our platform is fully responsive and accessible on all devices, including desktops, tablets, and smartphones. You can learn on the go, anytime, anywhere.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left px-6 py-4"
                  >
                    <h3 className="text-lg font-semibold text-[#111418] dark:text-white">
                      {faq.question}
                    </h3>
                    <span
                      className={`material-symbols-outlined transition-transform ${
                        openFAQ[index] ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openFAQ[index] && (
                    <div className="px-6 pb-4">
                      <p className="text-[#617589] dark:text-gray-300">{faq.answer}</p>
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-[#617589] dark:text-gray-400 mb-2">
                          Was this answer helpful?
                        </p>
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <span className="material-symbols-outlined text-base">thumb_up</span> Yes
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <span className="material-symbols-outlined text-base">thumb_down</span> No
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Support Section */}
              <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">Can't find an answer?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our support team is here to help. Contact us for any further questions.
                </p>
                <button className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Back to top */}
      {backToTopVisible && (
        <button
          className="fixed bottom-5 right-5 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-opacity"
          onClick={scrollToTop}
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
          onKeyDown={(e) => e.key === "Escape" && setModalOpen(false)}
        >
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => setModalOpen(false)}
          ></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
          <div className="inline-block align-bottom bg-white dark:bg-background-dark rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white dark:bg-background-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 sm:mx-0 sm:h-10 sm:w-10">
                  <span className="material-symbols-outlined text-primary">notifications</span>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                    Important Notification
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      This is a sample notification message. You can use this to display important updates or alerts to your users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => setModalOpen(false)}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
              >
                Got it
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
