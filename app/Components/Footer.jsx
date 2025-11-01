"use client";
import { useTranslations } from "next-intl";
import { Link } from "../../src/i18n/navigation";
import Image from "next/image";

const Footer = () => {
  const t = useTranslations("footer");


  const navSections = [
    {
      title: t("nav.courses"),
      links: [
        { label: t("nav.development"), href: "courses?cat=Programming" },
        { label: t("nav.design"), href: "courses?cat=Design" },
        { label: t("nav.business"), href: "courses?cat=Business" },
      ],
    },
    {
      title: t("nav.company"),
      links: [
        { label: t("nav.about"), href: "about" },
        { label: t("nav.careers"), href: "/areers" },
        { label: t("nav.blog"), href: "blogs" },
      ],
    },
    {
      title: t("nav.support"),
      links: [
        { label: t("nav.help"), href: "help" },
        { label: t("nav.contact"), href: "contact" },
      ],
    },
    {
      title: t("nav.legal"),
      links: [
        { label: t("nav.terms"), href: "terms" },
        { label: t("nav.privacy"), href: "privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-primary">
              <Image
                width={130}
                height={38}
                className="w-[130px] h-auto"
                src="https://res.cloudinary.com/dr2dnmx76/image/upload/v1761406970/EduProLogoDesign_pg337l.png"
                alt="Logo"
              />
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {t("tagline")}
            </p>
          </div>

          {navSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {/* 4. استخدمنا كومبوننت Link المستورد */}
                    <Link
                      className="text-base text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-base text-gray-400 order-2 md:order-1 mt-4 md:mt-0">
            {t("copyright")}
          </p>
          <div className="flex space-x-6 order-1 md:order-2">
            <a
              className="text-gray-400 hover:text-gray-500"
              href="#" // <-- لينك صفحة الفيسبوك
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">{t("social")}</span>
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;