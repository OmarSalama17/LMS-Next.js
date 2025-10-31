"use client";
import Link from "../../src/i18n/navigation";
import ThemeController from "./theme";
import { usePathname } from "../../src/i18n/navigation";
import { DarkIcon } from "./DarkIcon";
import { LightIcon } from "./LightIcon";
import { UserButton, useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./langSwitcher";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.courses"), href: "/courses" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
    { label: t("nav.blog"), href: "/blogs" },
    { label: t("nav.faq"), href: "/faq" },
  ];

  const { user } = useUser();

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <ThemeController>
      {({ toggleTheme, theme }) => (
        <header className="relative bg-off-white dark:bg-background-dark shadow-md dark:text-white">
          <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-10 py-4">
            <Link
              href="/"
              className={`flex items-center gap-4 text-brand-blue ${
                theme === "dark" ? "bg-white rounded-md p-[2px]" : ""
              }`}
            >
              <Image
                width={130}
                height={38}
                className="w-[130px]"
                src="https://res.cloudinary.com/dr2dnmx76/image/upload/v1761406970/EduProLogoDesign_pg337l.png"
                alt="Logo"
              />
            </Link>

            {/* 1. تغيير md:flex إلى lg:flex */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm leading-normal font-medium relative ${
                      isActive
                        ? "text-brand-blue font-extrabold"
                        : `
                        text-neutral-gray hover:text-brand-blue 
                        after:content-[''] 
                        after:absolute
                        after:left-0
                        after:bottom-0 
                        after:w-full
                        after:h-0.5 
                        after:bg-brand-blue
                        after:scale-x-0
                        after:origin-right
                        after:transition-transform
                        after:duration-300
                        after:ease-out
                        hover:after:scale-x-100
                        `
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* الأزرار والتحكم */}
            <div className="flex items-center gap-4">
              {/* 2. إخفاء مبدل اللغة على الشاشات الأصغر من lg */}
              <div className="hidden lg:flex">
                <LanguageSwitcher theme={theme} />
              </div>

              <div
                className={`flex items-center p-[5px] border border-[#9b9b9b] cursor-pointer ${
                  theme === "dark"
                    ? "bg-[#27293d] rounded-md hover:shadow-lg transition ease-out hover:text-[black] duration-300 hover:bg-zinc-200"
                    : "rounded-md bg-[#ffffff] border-[aliceblue] shadow-sm hover:shadow-lg transition ease-out hover:text-[white] duration-300 hover:bg-blue-950"
                }`}
                onClick={toggleTheme}
              >
                {theme === "dark" ? <LightIcon /> : <DarkIcon />}
              </div>

              {/* 3. تغيير md:flex إلى lg:flex */}
              <div className="hidden lg:flex items-center gap-4">
                {!user ? (
                  <>
                    <Link
                      href={"/sign-in"}
                      className={`relative flex items-center justify-center font-medium text-[14px] 
                        text-neutral-gray 
                        hover:text-brand-blue 
                        after:content-[''] 
                        after:absolute
                        after:left-0
                        after:bottom-0 
                        after:w-full
                        after:h-0.5 
                        after:bg-brand-blue
                        after:scale-x-0
                        after:origin-right
                        after:transition-transform
                        after:duration-300
                        after:ease-out
                        hover:after:scale-x-100
                      `}
                    >
                      <span className="material-symbols-outlined">login</span>
                      {t("auth.login")}
                    </Link>
                    <Link
                      href={"/sign-up"}
                      className={`relative flex items-center justify-center font-medium text-[14px] 
                        text-neutral-gray 
                        hover:text-brand-blue 
                        after:content-[''] 
                        after:absolute
                        after:left-0
                        after:bottom-0 
                        after:w-full
                        after:h-0.5 
                        after:bg-brand-blue
                        after:scale-x-0
                        after:origin-right
                        after:transition-transform
                        after:duration-300
                        after:ease-out
                        hover:after:scale-x-100
                      `}
                    >
                      <span className="material-symbols-outlined">person</span>
                      {t("auth.signup")}
                    </Link>
                  </>
                ) : null}
              </div>

              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  <UserButton.Link
                    label={t("auth.dashboard")}
                    labelIcon={
                      <span className="material-symbols-outlined !text-[16px]">
                        dashboard
                      </span>
                    }
                    href="/dashboard"
                  />
                </UserButton.MenuItems>
              </UserButton>

              {/* 4. تغيير md:hidden إلى lg:hidden */}
              <button
                className="lg:hidden text-neutral-gray" // التغيير هنا
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <span className="material-symbols-outlined">
                  {isMobileMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>

          {/* 5. تغيير md:hidden إلى lg:hidden */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 z-50 bg-off-white dark:bg-background-dark shadow-xl border-t border-gray-200 dark:border-gray-700">
              <nav className="flex flex-col gap-4 p-6">
                {/* روابط القائمة */}
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-base font-medium p-2 rounded-md text-center ${
                        isActive
                          ? "text-brand-blue font-extrabold bg-blue-50 dark:bg-blue-900/30"
                          : "text-neutral-gray hover:text-brand-blue hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <hr className="w-full border-t border-gray-300 dark:border-gray-700 my-2" />

                {/* 6. إضافة مبدل اللغة هنا في قائمة الموبايل */}
                <div className="flex justify-center py-2">
                  <LanguageSwitcher theme={theme} />
                </div>

                {/* روابط تسجيل الدخول للموبايل */}
                {!user && (
                  <>
                    <hr className="w-full border-t border-gray-300 dark:border-gray-700 my-2" />
                    <Link
                      href={"/sign-in"}
                      className="text-base font-medium text-neutral-gray hover:text-brand-blue flex items-center justify-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={handleLinkClick}
                    >
                      <span className="material-symbols-outlined">login</span>
                      {t("auth.login")}
                    </Link>
                    <Link
                      href={"/sign-up"}
                      className="text-base font-medium text-neutral-gray hover:text-brand-blue flex items-center justify-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={handleLinkClick}
                    >
                      <span className="material-symbols-outlined">person</span>
                      {t("auth.signup")}
                    </Link>
                  </>
                )}
              </nav>
            </div>
          )}
        </header>
      )}
    </ThemeController>
  );
}