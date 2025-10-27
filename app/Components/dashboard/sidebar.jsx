"use client";

import { useUser } from "@clerk/nextjs";
import { Link } from "../../../src/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

// 1. قبول Props جديدة للتحكم في وضع الموبايل
export default function Sidebar({ locale, isMobile = false, onClose = () => {} }) {
  const { user } = useUser();
  const pathname = usePathname();
  const t = useTranslations("sidebar");

  const links = [
    { href: "/dashboard", label: t("dashboard"), icon: "dashboard" },
    { href: "/dashboard/mycourses", label: t("myCourses"), icon: "book" },
    { href: "/dashboard/students", label: t("students"), icon: "group" },
    { href: "/dashboard/analytics", label: t("analytics"), icon: "analytics" },
  ];

  if (user?.unsafeMetadata?.role === "student") {
    links.splice(2, 1);
  }

  const isActive = (linkHref) => {
    if (linkHref === "/dashboard") {
      return pathname === "/dashboard" || /^\/dashboard\/?$/.test(pathname);
    }
    return pathname.startsWith(linkHref);
  };

  // 2. إذا كان (isMobile) صحيحاً، اعرض تصميم الموبايل
  if (isMobile) {
    return (
      <>
        {/* خلفية معتمة (Backdrop) */}
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
        {/* حاوية القائمة للموبايل */}
        <div
          className={`${
            locale === "ar" ? "right-0 border-l" : "left-0 border-r"
          } fixed top-0 z-50 h-full w-64 bg-card-light dark:bg-card-dark 
             border-gray-200 dark:border-gray-700/50 flex flex-col justify-between 
             lg:hidden`} // (ملاحظة: lg:hidden ليظهر فقط على الموبايل)
        >
          <div className="flex flex-col gap-4 p-4">
            {/* رأس القائمة (اللوجو + زر الإغلاق) */}
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                <img
                  src="https://res.cloudinary.com/dr2dnmx76/image/upload/v1761406970/EduProLogoDesign_pg337l.png"
                  alt={t("logoAlt")}
                />
              </Link>
              <button
                onClick={onClose}
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* الروابط (نفس الكود) */}
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={onClose} // 3. إضافة onClose لإغلاق القائمة عند الضغط على أي رابط
                  >
                    <span className="material-symbols-outlined">{link.icon}</span>
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

  // 4. هذا هو الكود الأصلي الخاص بك (وضع الديسكتوب)
  // سيعمل كما كان بالضبط عندما يكون isMobile={false}
  return (
    <div
      className={`${
        locale === "ar" ? "right-0 border-l" : "left-0 border-r" // (تم إصلاح اتجاه البوردر هنا)
      } fixed top-0 h-full w-64 bg-card-light dark:bg-card-dark border-gray-200 dark:border-gray-700/50 flex-col justify-between hidden lg:flex`}
    >
      <div className="flex flex-col gap-4 p-4">
        <Link href="/" className="flex items-center gap-2 px-3 py-2">
          <img
            src="https://res.cloudinary.com/dr2dnmx76/image/upload/v1761406970/EduProLogoDesign_pg337l.png"
            alt={t("logoAlt")}
          />
        </Link>

        <div className="flex flex-col gap-2">
          {links.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                  isActive(link.href)
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