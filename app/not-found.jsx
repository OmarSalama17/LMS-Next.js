import React from 'react'
import "./[locale]/(main)/global.css";
import Link from 'next/link';

export default function notFound() {
    return(
    <section className="text-center py-16">
      <div className="flex flex-col items-center">
        <img
          alt="A friendly robot looking lost and confused"
          className="mb-8 h-64 w-auto object-contain rounded-2xl"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoTEenyNASLlNrTZgDxL7MMyHT0QTmYvGxo27KNMXm8oRhSYoYaiAotk4jMMr-y1Jiq3zG2Zx65TXZZT-EVT7p29Zp-b7V5XAzqKRKa-lLWeUQ1t01dTLB83TJHx-48yy_X4YU_YvPiyK_ZlSPYBhtYCQMTKG9NP1HlJsEy_Pfqb53QJ3UnTo1wEnWwB0GY1CqMsgqEPJ7RqraJFM93J6fcOvQPEz3hZ0VuAwZMIhHXfPvwup_e9Z6-88DB3KEndb9mk874O9PidYV"
        />

        <h2 className="text-4xl font-bold text-brand-dark-gray dark:text-white mb-4">
          Oops! Page Not Found
        </h2>

        <p className="max-w-md text-brand-dark-gray dark:text-gray-300 mb-8">
          The page you are looking for does not exist. It might have been moved or deleted.
        </p>

        <div className="w-full max-w-lg mb-8">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-[#617589] dark:text-gray-300 flex border-none bg-brand-light-gray dark:bg-gray-700 items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                type="text"
                placeholder="Search for courses, assignments, or resources"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-brand-dark-gray dark:text-white focus:outline-0 focus:ring-0 border-none bg-brand-light-gray dark:bg-gray-700 h-full placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
              />
            </div>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={"/"} className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-brand-blue text-white text-base font-bold leading-normal tracking-[0.015em]">
            Go to Homepage
          </Link>
          <Link href={"/contact"} className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-brand-light-gray dark:bg-gray-700 text-brand-dark-gray dark:text-white text-base font-bold leading-normal tracking-[0.015em]">
            Contact Support
          </Link>
        </div>
      </div>
    </section>
    )
}