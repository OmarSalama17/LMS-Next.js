"use client";
import React, { useState } from "react";
import Header from "./Header";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "../../../src/i18n/navigation";
import { Toaster, toast } from "react-hot-toast";
const MOCK_API_URL = "https://68f816d9deff18f212b51c45.mockapi.io/api/product";
export default function DashboardClient({ coursesData, locale }) {
  const { user } = useUser();
  const router = useRouter();
  const handelDelete = async (id) => {
    let loading = locale === "en" ? "Deleting course..." : "حذف الكورس...";
    let success = locale === "en" ? "Course deleted successfully!" : "تم حذف الكورس بنجاح!";
    let error = locale === "en" ? "An error occurred while deleting the course." : "حدث خطاء في حذف الكورس.";
    const deletePromise =  fetch(`${MOCK_API_URL}/${id}`, { method: "DELETE" });
    toast.promise(
    deletePromise,
    {
      loading: loading,
      success: success,
      error: error,
    }
  );
    try {
    await deletePromise;
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col ml-0 lg:ml-64">
      <Toaster position="top-center" reverseOrder={false} />
      <Header
        div={
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <Link
              href={`mycourses/addnewcourse`}
              className="hidden sm:flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined mr-2">add</span>
              <span className="truncate">Add New Course</span>
            </Link>
          </div>
        }
      />

      <div className="flex flex-col gap-4 p-[24px]">
        {coursesData.length === 0  && user?.unsafeMetadata?.role !== "teacher" ? (
          <div className="text-center mt-10">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You are not enrolled in any courses yet.
            </p>
            <Link
              href={`/${locale}/courses`}
              className="text-primary hover:underline mt-4 inline-block"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
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
              </div>
              {user?.unsafeMetadata?.role === "teacher" ? (
                <div className="flex items-center gap-2">
                  <button className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    onClick={() => handelDelete(course.id)}
                    className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
