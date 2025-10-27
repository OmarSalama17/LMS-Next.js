import Header from "../../../Components/dashboard/Header";
import React from "react";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Link } from "../../../../src/i18n/navigation";
import { getTranslations } from "next-intl/server";

const MOCK_API_URL = "https://68f816d9deff18f212b51c45.mockapi.io/api/product";

const page = async ({ params }) => {
  // [تصحيح] إضافة await وتصحيح الخطأ الإملائي
  const t = await getTranslations("dashboard");
  const clerk = await clerkClient();
  const users = await clerk.users.getUserList({ limit: 100 });
  const filterUsers = users.data.filter((user) => user.privateMetadata.enrolledCourses);
  const filterUsersEnrolled = filterUsers.map((user) => user.privateMetadata.enrolledCourses);
  console.log("usersss", users);
  console.log("filterUsers", filterUsers);
  console.log("filterUsersEnrolled", filterUsersEnrolled);

  const { locale } = await params;

  const { userId } = await auth();
  const user = await currentUser();
  console.log(user);

  if (!userId || !user) {
    return redirect(`/${locale}/sign-in`);
  }

  const courseIds = user.privateMetadata?.enrolledCourses || [];

  let enrolledCourses = [];
  let countStudents = 0;
  // function getCourseDetailsById
  if (user.unsafeMetadata.role !== "teacher") {
    async function getCourseDetailsById(id) {
      try {
        const res = await fetch(`${MOCK_API_URL}/${id}`);
        if (!res.ok) {
          console.error(`Failed to fetch course ${id}`);
          return null;
        }
        return res.json();
      } catch (error) {
        console.error(`Error fetching course ${id}:`, error);
        return null;
      }
    }

    if (courseIds.length > 0) {
      const coursePromises = courseIds.map((id) => getCourseDetailsById(id));
      const coursesData = await Promise.all(coursePromises);
      enrolledCourses = coursesData.filter((course) => course !== null);
    }
  } else {
    const res = await fetch(`${MOCK_API_URL}`);
    const data = await res.json();
    const filter = data.filter((course) => course.userId === user.id);
    filter.map((course) =>
      filterUsersEnrolled.forEach((id) => (id.includes(course.id) ? countStudents++ : null))
    );
    enrolledCourses = filter;
  }
  console.log("enrolledCoursesenrolledCourses", enrolledCourses);

  return (
    <div className={`flex flex-1 flex-col ml-0 ${locale === "ar" ? "lg:mr-64" : "lg:ml-64"} `}>
      <Header
        div={
          <div className="flex items-center gap-4">
            <Link
              href={`dashboard/mycourses/addnewcourse`}
              className="hidden sm:flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined mr-2">add</span>
              <span className="truncate">{t("addNewCourse")}</span>
            </Link>
          </div>
        }
      />
      <main className="flex-1 p-4 sm:p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t("generalStatistics")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 rounded-xl p-4 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700/50">
              <div className="p-2 rounded-lg bg-primary/10">
                <span className="material-symbols-outlined text-primary">
                  book
                </span>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {t("totalCourses")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {enrolledCourses.length}
                </p>
              </div>
            </div>

            {user?.unsafeMetadata?.role === "teacher" ? (
              <div className="flex items-start gap-4 rounded-xl p-4 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700/50">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <span className="material-symbols-outlined text-green-500">
                    group
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {t("totalStudents")}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {countStudents}
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 flex flex-col gap-6">
            <div className="bg-card-light dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700/50 p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("myCourses")}
                </h3>
                <Link
                  className="text-sm font-medium text-primary hover:underline"
                  href={`dashboard/mycourses`}
                >
                  {t("viewAll")}
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrolledCourses.slice(0, 2).map((course, index) => {
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700/50 flex flex-col"
                    >
                      <div className="flex-grow">
                        <div className="w-full aspect-video rounded-md bg-gray-200 dark:bg-gray-700 mb-4">
                          <img
                            alt={course.title[locale]}
                            className="w-full h-full object-cover rounded-md"
                            src={course.image}
                          />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {course.title[locale]}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Published by {course.instructor[locale]}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center -space-x-2">
                          <img
                            alt={t("userAvatarAlt")}
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRPQl2ILydyUe0pNvv_FCZ8x8R-asXI_bLxxVTLxe6yDNZWy81mH6CgKTzwvIUebxvRnR7LWA8YD6eQ2v-LatMNRyVEYMoaRBqbMKUjshjvV2kYWaToVMWW3TO66DmHSz63nBSmreyy-1L8XKWA7InczVEQqqz1wSmcMevufvpsBlUBBgHdUDjUVgn5yVN2K4lbcDzt38Z1NSqG2ZsRNXc69v4ixksPS8dv0296cnSD32PPMJceXlbPLWgL-_u3fUVCeXOz898lrN1"
                          />
                          <img
                            alt={t("userAvatarAlt")}
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCljgeGgM1ItMoqCncJhgK51Ce2Xi7ry-QqNcJ9DRPXKtueX96qFSc9YFIG0cyw8fNrlRC70nymsllRVNwz01LJc4sgcxz1gudLegxlyr61Q7GLKRIqTXwTUOu-NrEA31NGWy_fqf14gUa-CK27uniTcSKPI41lm67odOLAICuuq0Z43DUsJGDVhKeAcgy-p4b2GHYDuVqv7-yWYoDjrLwsnkbEsg1l7jaHV2i5EoJo3zVs0Q8rgfCvKC_RjkoFngpUaON_ZwvpUK6A"
                          />
                          <img
                            alt={t("userAvatarAlt")}
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiFhRXGgqPFHJwAxp_iwsZ4zmkAinPk_EcyOvRjT9M0ofAj4DxpCJQHrTIRiU3EXoYFyp1C4_0avzGEmATbhELwVcum4asngi2TPvbpwxpFCfJBfubHO3Jbj-Vfr4rfanf-WTkZCT8qL5glZ2RxI6IDOUgvTT8pKbBormD9KgjQYHoeYC0vaGRV9BUl9ZMxM1d4DJzNI-HF9qehNxW6VE1VvY_0Va3cskSeTUpmXk5gYCVVJbsCTzDrVObdStFab77WM10B1J6xyJ3"
                          />
                          <div className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                            +99
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center mt-4 sm:hidden">
                <button className="flex items-center justify-center rounded-lg h-10 px-4 w-full bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined mr-2">add</span>
                  <span className="truncate">{t("addNewCourse")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;