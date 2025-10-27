"use client";
import React, { useState } from "react";
import Header from "./Header";
// [ملحوظة] Link هنا المفروض يكون من next-intl/link لو الصفحة دي جزء من الـ i18n routing
import Link from "next/link"; 
import { useUser } from "@clerk/nextjs";
import { useRouter } from "../../../src/i18n/navigation";
import { Toaster, toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

const MOCK_API_URL = "https://68f816d9deff18f212b51c45.mockapi.io/api/product";

export default function DashboardClient({ coursesData, locale }) {
  // [تعديل] حددنا الـ namespace
  const t = useTranslations("myCourses");
  const { user } = useUser();
  const router = useRouter();

  const handelDelete = async (id) => {
    // [تعديل] تم سحب الترجمات مباشرة من t()
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
              {/* [تعديل] */}
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
              {/* [تعديل] */}
              {t("noCoursesMessage")}
            </p>
            <Link
              href={`/${locale}/courses`}
              className="text-primary hover:underline mt-4 inline-block"
            >
              {/* [تعديل] */}
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
                // [ملحوظة] alt attribute مش شغال على div، لو ده img يبقى أفضل
                data-alt={course.alt} 
                style={{
                  backgroundImage: `url('${course.image}')`,
                }}
              />
              <div className="flex-1">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-snug mb-1">
                  {/* ده سليم لإنه بيقرأ من الـ API */}
                  {course.title[locale]}
                </h3>
              </div>
              {user?.unsafeMetadata?.role === "teacher" ? (
                <div className="flex items-center gap-2">
                  <button 
                    // [تعديل] إضافة label للـ accessibility
                    title={t("editLabel")}
                    aria-label={t("editLabel")}
                    className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    onClick={() => handelDelete(course.id)}
                    // [تعديل] إضافة label للـ accessibility
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}