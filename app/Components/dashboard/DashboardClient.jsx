"use client";
import React, { useState } from "react";
import Header from "./Header";
import Link from "next/link"; 
import { useUser } from "@clerk/nextjs";
import { useRouter } from "../../../src/i18n/navigation";
import { Toaster, toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import EditProduct from "../EditProduct";

const MOCK_API_URL = "https://68f816d9deff18f212b51c45.mockapi.io/api/product";

export default function DashboardClient({ coursesData, locale }) {
  const t = useTranslations("myCourses");
  const { user } = useUser();
  const router = useRouter();
  const [open , setOpen] = useState(null);
  const handelOpen = (course) => {
    if (open === course) {
      setOpen(null);
    } else {
      setOpen(course);
    }
  }

const handelDelete = async (id) => {
    toast.custom((toastProps) => (
        <div
            className={`${
                toastProps.visible ? 'animate-enter' : 'animate-leave'
            } w-full max-w-xs md:max-w-sm bg-white dark:bg-card-dark rounded-xl shadow-2xl p-6 flex flex-col items-center text-center`}
        >
            <span className="material-symbols-outlined text-red-500 dark:text-red-400 text-5xl mb-3">
                gpp_bad
            </span>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {t("confirmDeleteTitle")}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {t("confirmDeleteMessage")}
            </p>

            <div className="flex w-full gap-3 justify-center">
                <button
                    onClick={() => {
                        toast.dismiss(toastProps.id);
                        deleteCourse(id, t, router);
                    }}
                    className="flex-1 px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-md"
                >
                    {t("deleteConfirm")}
                </button>
                <button
                    onClick={() => toast.dismiss(toastProps.id)}
                    className="flex-1 px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    {t("cancel")}
                </button>
            </div>
        </div>
    ), { 
        duration: 10000,
        position: 'top-center',
    });
};

const deleteCourse = async (id) => {
  const deletePromise = fetch(`${MOCK_API_URL}/${id}`, { method: "DELETE" });

  toast.promise(deletePromise, {
    loading: t("toast.loading"),
    success: t("toast.success"),
    error: t("toast.error"),
  });

  try {
    await deletePromise;
    router.refresh();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className={`flex flex-1 flex-col ml-0 ${locale === "ar" ? "lg:mr-64" : "lg:ml-64"} `}>
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
              <span className="truncate">{t("addNewCourse")}</span>
            </Link>
          </div>
        }
      />

      <div className="flex flex-col gap-4 p-[24px]">
        {coursesData.length === 0 &&
        user?.unsafeMetadata?.role !== "teacher" ? (
          <div className="text-center mt-10">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t("noCoursesMessage")}
            </p>
            <Link
              href={`/${locale}/courses`}
              className="text-primary hover:underline mt-4 inline-block"
            >
              {t("browseCourses")}
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
                  <button 
                    title={t("editLabel")}
                    aria-label={t("editLabel")}
                    onClick={() => handelOpen(course)}
                    className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    onClick={() => handelDelete(course.id)}
                    title={t("deleteLabel")}
                    aria-label={t("deleteLabel")}
                    className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ) : (
                ""
              )}
              {open ? <EditProduct open={open} setOpen={setOpen} locale={locale}/> :""}
            </div>
          
        ))
        )}

      </div>
    </div>
  );
}