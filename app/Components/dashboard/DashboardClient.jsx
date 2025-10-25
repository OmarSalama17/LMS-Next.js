"use client";
import React from "react";
import Header from "./Header";
import Link from 'next/link'; // (ضفت ده عشان اللينك)

// (1) بقينا نستقبل الكورسات كـ prop
export default function DashboardClient({ coursesData, locale }) {
  
  // (2) شيلنا الـ const coursesData = [...] اللي كانت هنا

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
        {/* (3) لو مفيش كورسات، اعرض رسالة */}
        {coursesData.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You are not enrolled in any courses yet.
            </p>
            <Link href={`/${locale}/courses`} className="text-primary hover:underline mt-4 inline-block">
              Browse Courses
            </Link>
          </div>
        ) : (
          // (4) لو فيه كورسات، اعرضها (ده الكود بتاعك)
          coursesData.map((course) => (
    <div
      key={course.id}
      className="bg-white dark:bg-card-dark rounded-xl shadow-md p-4 flex flex-col md:flex-row items-start md:items-center gap-4 group"
    >
      <div
        className="w-full md:w-48 h-32 md:h-24 rounded-lg bg-center bg-no-repeat bg-cover"
        data-alt={course.alt}
        style={{
          backgroundImage: `url('${course.image}')`,
        }}
      />
      <div className="flex-1">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-snug mb-1">
          {course.title[locale]}
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
  ))
        )}
      </div>
    </div>
  );
};