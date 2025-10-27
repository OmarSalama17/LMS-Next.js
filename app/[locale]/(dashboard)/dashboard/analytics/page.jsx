"use client";
import { useLocale, useTranslations } from "next-intl";
import Header from "../../../../Components/dashboard/Header";
import React from "react";

const page = () => {
  const locale = useLocale();
  const t = useTranslations("analytics");

  return (
    <>
      <div className={`flex flex-1 flex-col ${locale === "ar" ? "lg:mr-64" : "lg:ml-64"} `}>
        <Header />
        <div className="flex flex-1 flex-col ml-0 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                {t("completionRate")}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">82%</p>
              <p className="text-sm font-medium text-green-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  arrow_upward
                </span>
                +5%
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                {t("activeStudents")}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">1,234</p>
              <p className="text-sm font-medium text-green-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  arrow_upward
                </span>
                +50
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                {t("averageScore")}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">88%</p>
              <p className="text-sm font-medium text-red-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  arrow_downward
                </span>
                -2%
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                {t("engagementLevel")}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("engagementValueHigh")}
              </p>
              <p className="text-sm font-medium text-gray-500"> </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                    {t("performanceOverTime")}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white truncate">
                    2,345 {t("enrollments")}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t("last30Days")}
                    </p>
                    <p className="text-sm font-medium text-green-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">
                        arrow_upward
                      </span>
                      +15.3%
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex min-h-[250px] flex-1 flex-col">
                <svg
                  fill="none"
                  height="100%"
                  preserveAspectRatio="none"
                  viewBox="0 0 500 200"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="perfGradient"
                      x1="250"
                      x2="250"
                      y1="0"
                      y2="200"
                    >
                      <stop stopColor="#137fec" stopOpacity="0.2" />
                      <stop offset="1" stopColor="#137fec" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 150 C 41.6 150, 41.6 80, 83.3 80 C 125 80, 125 120, 166.6 120 C 208.3 120, 208.3 40, 250 40 C 291.6 40, 291.6 100, 333.3 100 C 375 100, 375 60, 416.6 60 C 458.3 60, 458.3 140, 500 140 V 200 H 0 Z"
                    fill="url(#perfGradient)"
                  />
                  <path
                    d="M0 150 C 41.6 150, 41.6 80, 83.3 80 C 125 80, 125 120, 166.6 120 C 208.3 120, 208.3 40, 250 40 C 291.6 40, 291.6 100, 333.3 100 C 375 100, 375 60, 416.6 60 C 458.3 60, 458.3 140, 500 140"
                    stroke="#137fec"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                <span>{t("week1")}</span>
                <span>{t("week2")}</span>
                <span>{t("week3")}</span>
                <span>{t("week4")}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800">
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                {t("completionStatus")}
              </p>
              <div className="flex items-center justify-center py-4 flex-1 relative">
                <svg
                  className="transform -rotate-90"
                  height="180"
                  viewBox="0 0 120 120"
                  width="180"
                >
                  <circle
                    cx="60"
                    cy="60"
                    fill="none"
                    r="54"
                    stroke="#e6e6e6"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    fill="none"
                    r="54"
                    stroke="#22c55e"
                    strokeDasharray="290.4"
                    strokeDashoffset="87.12"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    fill="none"
                    r="54"
                    stroke="#137fec"
                    strokeDasharray="290.4"
                    strokeDashoffset="203.28"
                    strokeWidth="12"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    65%
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t("statusCompleted")}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary" />
                    <span>{t("statusCompleted")}</span>
                  </div>
                  <span className="font-semibold">65%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span>{t("statusInProgress")}</span>
                  </div>
                  <span className="font-semibold">25%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-600" />
                    <span>{t("statusNotStarted")}</span>
                  </div>
                  <span className="font-semibold">10%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("studentPerformanceTitle")}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("studentPerformanceSubtitle")}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      {t("table.studentName")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("table.progress")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("table.lastActive")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("table.avgScore")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">{t("table.actions")}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      Alice Johnson
                    </th>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: "95%" }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">2 hours ago</td>
                    <td className="px-6 py-4">92%</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-primary hover:underline"
                      >
                        {t("table.viewDetails")}
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      Bob Williams
                    </th>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: "78%" }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">1 day ago</td>
                    <td className="px-6 py-4">85%</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-primary hover:underline"
                      >
                        {t("table.viewDetails")}
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      Charlie Brown
                    </th>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: "62%" }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">3 days ago</td>
                    <td className="px-6 py-4">76%</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-primary hover:underline"
                      >
                        {t("table.viewDetails")}
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      Diana Prince
                    </th>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">5 hours ago</td>
                    <td className="px-6 py-4">98%</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-primary hover:underline"
                      >
                        {t("table.viewDetails")}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;