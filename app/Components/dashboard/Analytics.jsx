"use client";
import { useLocale, useTranslations } from "next-intl";
import Header from "./Header";
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Image from "next/image";

// === دالة timeAgo معدلة (أكثر أمانًا) ===
function timeAgo(dateString, locale) {
  try {
    const date = new Date(dateString);

    // التحقق إذا كان التاريخ صالحًا
    if (isNaN(date.getTime())) {
      console.warn("Invalid date string passed to timeAgo:", dateString);
      return "N/A"; // إرجاع قيمة احتياطية
    }

    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(days / 30);
    const years = Math.round(days / 365);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    if (seconds < 60) return rtf.format(-seconds, "second");
    if (minutes < 60) return rtf.format(-minutes, "minute");
    if (hours < 24) return rtf.format(-hours, "hour");
    if (days < 7) return rtf.format(-days, "day");
    if (weeks < 4) return rtf.format(-weeks, "week");
    if (months < 12) return rtf.format(-months, "month");
    return rtf.format(-years, "year");
  } catch (error) {
    console.error("Error in timeAgo function:", error);
    return "N/A"; // إرجاع قيمة احتياطية في حالة حدوث أي خطأ
  }
}

const Analytics = ({ enrolledCourses, countStudents, studentList = [] }) => {
  const locale = useLocale();
  const t = useTranslations("analytics");

  const dynamicData = useMemo(() => {
    // ... (كل منطق useMemo يبقى كما هو، لم يتغير) ...
    const totalStudents = countStudents || 0;

    const completionRate = Math.floor(Math.random() * 21) + 75;
    const completionChange = Math.floor(Math.random() * 10) - 2;

    const averageScore = Math.floor(Math.random() * 11) + 85;
    const averageScoreChange = Math.floor(Math.random() * 8) - 4;

    const activeStudentsChange = Math.floor(
      Math.random() * (totalStudents * 0.1) + 5
    );

    const getEngagementLevel = (students) => {
      if (students > 100) return t("engagementValueHigh");
      if (students > 20) return t("engagementValueMedium");
      return t("engagementValueLow");
    };
    const engagementLevel = getEngagementLevel(totalStudents);

    const generatePerfData = (total) => {
      let remaining = total;
      const data = [];
      for (let i = 0; i < 7; i++) {
        let enrolls = 0;
        if (i === 6) {
          enrolls = remaining > 0 ? remaining : 0;
        } else {
          enrolls = Math.floor(Math.random() * (remaining / 3));
          remaining -= enrolls;
        }
        data.push({ name: t(`week${i + 1}`), enrollments: enrolls });
      }
      return data;
    };
    const perfData = generatePerfData(totalStudents);
    const enrollmentChange = Math.floor(Math.random() * 20);

    const generateCompletionData = (total) => {
      if (total === 0) {
        return [
          { name: t("statusCompleted"), value: 0 },
          { name: t("statusInProgress"), value: 0 },
          { name: t("statusNotStarted"), value: 1 },
        ];
      }
      const completed = Math.floor(total * (completionRate / 100));
      const inProgress = Math.floor(
        (total - completed) * (Math.random() * 0.4 + 0.4)
      );
      const notStarted = total - completed - inProgress;

      return [
        { name: t("statusCompleted"), value: completed },
        { name: t("statusInProgress"), value: inProgress },
        { name: t("statusNotStarted"), value: notStarted },
      ];
    };
    const completionData = generateCompletionData(totalStudents);

    const totalForPie = Math.max(
      completionData.reduce((acc, cur) => acc + cur.value, 0),
      1
    );
    const completedPercent = Math.round(
      (completionData[0].value / totalForPie) * 100
    );
    const inProgressPercent = Math.round(
      (completionData[1].value / totalForPie) * 100
    );
    const notStartedPercent = 100 - completedPercent - inProgressPercent;

    return {
      completionRate,
      completionChange,
      averageScore,
      averageScoreChange,
      activeStudentsChange,
      engagementLevel,
      perfData,
      enrollmentChange,
      completionData,
      completedPercent,
      inProgressPercent,
      notStartedPercent,
    };
  }, [countStudents, t]);

  const COLORS = ["#137fec", "#22c55e", "#e6e6e6"];

  return (
    <>
      <div
        className={`flex flex-1 flex-col ${
          locale === "ar" ? "lg:mr-64" : "lg:ml-64"
        } `}
      >
        <Header />
        <div className="flex flex-1 flex-col ml-0 p-4">
          
          {/* === الكروت العلوية (موجودة هنا) === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                {t("completionRate")}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {dynamicData.completionRate}%
              </p>
              <p className={`text-sm font-medium flex items-center gap-1 ${dynamicData.completionChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <span className="material-symbols-outlined text-base">
                  {dynamicData.completionChange >= 0 ? 'arrow_upward' : 'arrow_downward'}
                </span>
                {dynamicData.completionChange > 0 ? '+' : ''}{dynamicData.completionChange}%
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                {t("activeStudents")}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {countStudents.toLocaleString(locale)}
              </p>
              <p className="text-sm font-medium text-green-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  arrow_upward
                </span>
                +{dynamicData.activeStudentsChange}
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                {t("averageScore")}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {dynamicData.averageScore}%
              </p>
              <p className={`text-sm font-medium flex items-center gap-1 ${dynamicData.averageScoreChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <span className="material-symbols-outlined text-base">
                  {dynamicData.averageScoreChange >= 0 ? 'arrow_upward' : 'arrow_downward'}
                </span>
                 {dynamicData.averageScoreChange > 0 ? '+' : ''}{dynamicData.averageScoreChange}%
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                {t("engagementLevel")}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {dynamicData.engagementLevel}
              </p>
              <p className="text-sm font-medium text-gray-500"> </p>
            </div>
          </div>
          
          {/* === المخططات (موجودة هنا) === */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                    {t("performanceOverTime")}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white truncate">
                    {countStudents.toLocaleString(locale)} {t("enrollments")}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t("last30Days")}
                    </p>
                    <p className="text-sm font-medium text-green-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">
                        arrow_upward
                      </span>
                      +{dynamicData.enrollmentChange}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex min-h-[250px] flex-1 flex-col">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dynamicData.perfData}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorEnrollments"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#137fec"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#137fec"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "8px",
                        borderColor: "#e2e8f0",
                        color: "#334155",
                      }}
                      itemStyle={{ color: "#137fec" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="enrollments"
                      stroke="#137fec"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorEnrollments)"
                    />
                    <XAxis
                      dataKey="name"
                      stroke={locale === "ar" ? "transparent" : "#94a3b8"}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800">
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                {t("completionStatus")}
              </p>
              <div className="flex items-center justify-center py-4 flex-1 relative">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={dynamicData.completionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {dynamicData.completionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke={0}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "8px",
                        borderColor: "#e2e8f0",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {dynamicData.completedPercent}%
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
                  <span className="font-semibold">{dynamicData.completedPercent}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span>{t("statusInProgress")}</span>
                  </div>
                  <span className="font-semibold">{dynamicData.inProgressPercent}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-600" />
                    <span>{t("statusNotStarted")}</span>
                  </div>
                  <span className="font-semibold">{dynamicData.notStartedPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* === جدول الطلاب (موجود هنا) === */}
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
                  {/* === تعديل الجدول (أكثر أمانًا) === */}
                  {studentList.map((student) => {
                    const fakeProgress = Math.floor(Math.random() * 81) + 20;
                    const fakeScore = Math.floor(Math.random() * 31) + 70;

                    return (
                      <tr
                        key={student?.id} // إضافة ?.
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={student?.imageUrl || "/default-avatar.png"} // إضافة ?. وصورة احتياطية
                              alt={student?.fullName || "Student"} // إضافة ?.
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            {/* تعديل الاسم ليكون أكثر أمانًا */}
                            {student?.fullName ||
                              `${student?.firstName || ""} ${
                                student?.lastName || ""
                              }`.trim() ||
                              "N/A"}
                          </div>
                        </th>
                        <td className="px-6 py-4">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${fakeProgress}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {/* الآن الدالة timeAgo آمنة */}
                          {student?.lastActiveAt
                            ? timeAgo(student.lastActiveAt, locale)
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4">{fakeScore}%</td>
                        <td className="px-6 py-4 text-right">
                          <a
                            href="#"
                            className="font-medium text-primary hover:underline"
                          >
                            {t("table.viewDetails")}
                          </a>
                        </td>
                      </tr>
                    );
                  })}

                  {studentList.length === 0 && (
                    <tr className="border-b dark:border-gray-700">
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;