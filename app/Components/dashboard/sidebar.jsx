"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Link } from "../../../src/i18n/navigation";
import { usePathname } from "../../../src/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Sidebar({
  locale,
  isMobile = false,
  onClose = () => {},
}) {
  const { user } = useUser();

  const fullName = user?.fullName;
  const imageUrl = user?.imageUrl || "";
  const role = user?.unsafeMetadata?.role;

  const pathname = usePathname();
  const t = useTranslations("sidebar");

  const links = [
    { href: "/dashboard", label: t("dashboard"), icon: "dashboard" },
    { href: "/dashboard/mycourses", label: t("myCourses"), icon: "book" },
    { href: "/dashboard/students", label: t("students"), icon: "group" },
    { href: "/dashboard/messages", label: t("messages"), icon: "message" },
    { href: "/dashboard/analytics", label: t("analytics"), icon: "analytics" },
  ];

  if (role === "student") {
    links.splice(2, 1);
  }

  if (isMobile) {
    return (
      <>
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
        <div
          className={`${
            locale === "ar" ? "right-0 border-l" : "left-0 border-r"
          } fixed top-0 z-50 h-full w-64 bg-card-light dark:bg-card-dark 
             border-gray-200 dark:border-gray-700/50 flex flex-col justify-between 
             lg:hidden`}
        >
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                  data-alt="Profile picture of Dr. Emily Carter"
                  style={{ backgroundImage: `url('${imageUrl}')` }}
                ></div>
                <div className="flex flex-col">
                  <h1 className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                    {role === "student" ? fullName : `Dr.${fullName}`}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                    {role}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const isActive =
                  link.href === "/dashboard"
                    ? pathname === link.href
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={onClose}
                  >
                    <span className="material-symbols-outlined">
                      {link.icon}
                    </span>
                    <p className="text-sm font-medium">{link.label}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={`${
        locale === "ar" ? "right-0 border-l" : "left-0 border-r"
      } fixed top-0 h-full w-64 bg-card-light dark:bg-card-dark border-gray-200 dark:border-gray-700/50 flex-col justify-between hidden lg:flex`}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-3">
          <UserButton width={40} height={40} />
          <div className="flex flex-col">
            <h1 className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
              {role === "student" ? fullName : `Dr. ${fullName}`}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
              {role}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive =
              link.href === "/dashboard"
                ? pathname === link.href
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                <p className="text-sm font-medium">{link.label}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
