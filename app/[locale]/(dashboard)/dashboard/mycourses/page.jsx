"use client";
import React from "react";
import Header from "../../../../Components/dashboard/Header";

const page = () => {
    const coursesData = [
  {
    id: 1,
    alt: "Abstract art for web development course",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv8tNpXlo_xGPgx4mBXMWD1yvHfw9Ign3Z91RUN1BIXpqVcLV1VQ_F1N6c2Ef47eYqRv9O4TSzVG6Tj5v3tqLapjKC1jcfBK7joGweAY89csfr1AH1imui4EArbYXBaTwt__SB2VBLPH3jIs9Jn1I6-LPwZ-taCawK5-jwB2oNhYHR-5SmCYJhqyr2QQzDJ6Blq5faqwHLsQ1FadctPX3GaynMDQ4EK3nNirH-V8l9-M4_cC-EKs1NupJ4VmU6hrciyEIoK8jxvLto",
    title: "Introduction to Web Development",
    students: "1,250",
    level: "Beginner",
    completion: 75,
    textColor: "text-primary",
    bgColor: "bg-primary",
  },
  {
    id: 2,
    alt: "Abstract art for CSS course",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl7VEuumh0QiKmdqxh2EUT9sMBxUlUo5z_rbwYFk5LGsiJdS8lUAa0mwd1cqCCV_msgFDxNY3SgZn7747LvBtmjCbiGwYK3XjpoNWJhUU5ncmExos8Uf3NyqaFaiWhQspsCSg5Sq9pTBdkk6LHeAPDK4S14aZMfqnnkLgKC2fsc94eDHDpLO0SVHKOSBmrizzenOMlmrHQ2ZHeZ3Lo9GMdwN2NgHQpWcRlvkMbzRFao_HU-lYPrbBNZ81yi_EuiE3OkroJQsRqFVeY",
    title: "Advanced CSS and Sass",
    students: "850",
    level: "Advanced",
    completion: 45,
    textColor: "text-[#f5a623]",
    bgColor: "bg-[#f5a623]",
  },
  {
    id: 3,
    alt: "Abstract art for JavaScript course",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBztpVdWLjYwvAmmlMvfe40iEJaQCzm45b727Noe-15NzxU8fLPVNyUjxpvCsotc1L61fNHd5UUWiPy3Cg6xAAPufW_ZqF6mNxzQeJeBq5O7gy9RhBVmPKP719MVlcPQR2gcyTCZwtoTfKxmbEETfDhXAAi90bzFLj_z2ua1kaDAMlCZOC2Rc27SxgKQkugobf4XysWVp3tVoV7EjCJ7TN281M7YXg-xxDw47nFAfYUnqUnBgQxFFOk7S92Z0PdApYNWh_2ZosUkHu1",
    title: "JavaScript for Beginners",
    students: "1,500",
    level: "Beginner",
    completion: 90,
    textColor: "text-[#7ed321]",
    bgColor: "bg-[#7ed321]",
  },
  {
    id: 4,
    alt: "Abstract art for React course",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1J1Upbx8YK9_0v-RF0vZIFbA3Ge-HStYToWkgAuj7Qtv_zWaSqL7PryQyBjmH0DZWvvPDg_c6qfrEhyqzssRLilqHm5JnAoXTzBH0dRtCJE_6kobrJlvLene9jaKdP01Hr1AKnc3ccyJdKqB7rhm2lrYUNBJAHD_pz8m2eGMojcjGUEHE7cqry4ZhNSLlZI56AG5l0E6r94o2yLpSNWadYeGBlmMNzcr7UQko0fOlGsxvPtoxsFnbWGWE3k0YgUvbGIPD633WNx8g",
    title: "React - The Complete Guide",
    students: "2,100",
    level: "Intermediate",
    completion: 60,
    textColor: "text-primary",
    bgColor: "bg-primary",
  },
];
  return (
    <div className="flex flex-1 flex-col ml-0 lg:ml-64">
      <Header
        div={
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <button className="hidden sm:flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined mr-2">add</span>
              <span className="truncate">Add New Course</span>
            </button>
          </div>
        }
      />

<div className="flex flex-col gap-4 p-[24px]">
  {coursesData.map((course) => (
    <div
      key={course.id}
      className="bg-white dark:bg-card-dark rounded-xl shadow-md p-4 flex flex-col md:flex-row items-start md:items-center gap-4 group"
    >
      <div
        className="w-full md:w-48 h-32 md:h-24 rounded-lg bg-center bg-no-repeat bg-cover"
        data-alt={course.alt}
        style={{
          backgroundImage: `url('${course.imageUrl}')`,
        }}
      />
      <div className="flex-1">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-snug mb-1">
          {course.title}
        </h3>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm gap-4">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">school</span>
            <span>{course.students} Students</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">bar_chart</span>
            <span>{course.level}</span>
          </div>
        </div>
      </div>
      <div className="w-full md:w-48">
        <div className="flex gap-3 justify-between items-center mb-1">
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            Completion
          </p>
          <p className={`${course.textColor} text-sm font-bold`}>
            {course.completion}%
          </p>
        </div>
        <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2">
          <div
            className={`h-2 rounded-full ${course.bgColor}`}
            style={{ width: `${course.completion}%` }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">analytics</span>
        </button>
        <button className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default page;
