"use client";
import { usePathname, useRouter } from "../../src/i18n/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function LanguageSwitcher({theme}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const link = "https://flagcdn.com/w160";
  const languages = [
    {
      code: "ar",
      label: "العربية",
      flag: "/eg.png",
    },
    {
      code: "en",
      label: "English",
      flag: "/us.png",
    },
  ];
  const [selectedLang, setSelectedLang] = useState(
    languages.find((lang) => lang.code === locale) || languages[1]
  );

  useEffect(() => {
    const currentLang = languages.find((lang) => lang.code === locale);
    if (currentLang) {
      setSelectedLang(currentLang);
    }
  }, [locale]);

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
    router.replace({ pathname }, { locale: lang.code });
  };

  return (
    <div className="relative z-30">
      <button
        className={`flex items-center gap-2 px-3 w-[130px] justify-between py-2.5 border  dark:bg-[#1a202c]  border-[#E8E9ED] rounded-full`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={toggleDropdown}
      >
        <div className="flex gap-1 items-center">
          <div>
            <Image
              width={20}
              height={20}
              className="w-[20px] h-[20px] rounded-full"
              src={link + selectedLang.flag}
              alt={`${selectedLang.label} flag`}
            />
          </div>
          <span>{selectedLang.label}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute mt-2 w-[130px] bg-white border border-[#E8E9ED] dark:bg-[#1a202c] rounded-xl shadow-lg z-10"
          role="listbox"
        >
          {languages.map((lang) => (
            <li
              key={lang.code}
              role="option"
              onClick={() => handleLanguageChange(lang)}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg transition"
            >
              <Image
                width={20}
                height={20}
                src={link + lang.flag}
                alt={`${lang.label} flag`}
                className="w-[20px] h-[20px] rounded-full"
              />
              <span>{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
