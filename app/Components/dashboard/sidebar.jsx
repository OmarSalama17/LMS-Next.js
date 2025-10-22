"use client";

import {Link} from "../../../src/i18n/navigation";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
    { href: "/dashboard/mycourses", label: "My Courses", icon: "book" },
    { href: "/dashboard/students", label: "Students", icon: "group" },
    { href: "/dashboard/analytics", label: "Analytics", icon: "analytics" },
    { href: "/dashboard/messages", label: "Messages", icon: "chat" },
  ];

  const isActive = (linkHref) => {
    const currentPath = pathname.split("/").pop();
    const linkPath = linkHref.split("/").pop();
    return currentPath === linkPath;
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-card-light dark:bg-card-dark border-r border-gray-200 dark:border-gray-700/50 flex-col justify-between hidden lg:flex">
      <div className="flex flex-col gap-4 p-4">
        <Link href="/" className="flex items-center gap-2 px-3 py-2">
            <img src="/EduPro Logo Design.png" alt="" />
        </Link>

        <div className="flex flex-col gap-2">
          {links.map((link) => (
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
          ))}
        </div>
      </div>

    </div>
  );
}
