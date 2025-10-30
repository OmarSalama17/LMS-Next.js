"use client";
import { usePathname, Link } from "../../src/i18n/navigation";
import React from "react";
import { useTranslations } from "next-intl";

const formatSegmentName = (segment) => {
  if (!segment) return "";
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const PathName = () => {
  const pathName = usePathname();
  const t = useTranslations("paths");

  const segments = pathName.split("/").filter(Boolean);

  const breadcrumbItems = [
    {
      name: t("home"),
      href: "/",
    },
  ];

  let currentHref = "";

  segments.forEach((segment, index) => {
    currentHref += `/${segment}`;

    let name;

    if (index === 1) {
      name = formatSegmentName(segment);
    } else {
      const translation = t(segment);
      name = translation === segment ? formatSegmentName(segment) : translation;
    }

    breadcrumbItems.push({
      name: name,
      href: currentHref,
    });
  });

  return (
    <div className="mb-8">
      {" "}
      <div className="flex flex-wrap items-center gap-2">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.href + index}>
            {" "}
            {index > 0 && (
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                / {" "}
              </span>
            )}
            {index === breadcrumbItems.length - 1 ? (
              <span className="text-text-light dark:text-text-dark text-sm font-medium">
                 {decodeURIComponent(item.name)}
                 {" "}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary"
              >
                 {decodeURIComponent(item.name)}
                 {" "}
              </Link>
            )}
            {" "}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PathName;
