"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react"; 
import LanguageSwitcher from "../langSwitcher";
import { useTranslations, useLocale } from "next-intl"; 
import Sidebar from "./sidebar";

const Header = ({ div }) => {
  const { user } = useUser();
  const t = useTranslations("dashboardHeader");
  const locale = useLocale(); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  return (
    <>
      <header className="flex flex-wrap justify-between items-center gap-4 p-6 border-b border-gray-200 dark:border-gray-700/50 bg-card-light dark:bg-card-dark/50">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden text-gray-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open sidebar"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("greeting", { name: user?.fullName })}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("welcomeMessage")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {user?.unsafeMetadata?.role !== "student" ? <>{div}</> : ""}
        </div>

      </header>

      {isMobileMenuOpen && (
        <Sidebar
          locale={locale}
          isMobile={true}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;