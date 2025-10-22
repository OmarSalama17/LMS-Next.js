"use client";

import Link from "next/link";
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

  const settingsLinks = [
    { href: "/settings", label: "Settings", icon: "settings" },
    { href: "/logout", label: "Logout", icon: "logout" },
  ];

  const isActive = (linkHref) => {
    const currentPath = pathname.split("/").pop();
    const linkPath = linkHref.split("/").pop();
    return currentPath === linkPath;
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-card-light dark:bg-card-dark border-r border-gray-200 dark:border-gray-700/50 flex-col justify-between hidden lg:flex">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-2 px-3 py-2">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontSize: 32 }}
          >
            school
          </span>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">LMS</h1>
        </div>

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

      <div className="flex flex-col gap-4 p-4">
        {settingsLinks.map((link) => (
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

        <div className="flex gap-3 mt-4 items-center">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1d4BrEuNOIjN3-hMZ5gl_H_6Qd9n6ftBS04ZbRBQ15HvJoh8mtZYecr2pDX0OFqLXvsHdi8C0XDjllc_ixoENDKVS7-4rlwDSAbHkd1rL8g-VozPPIA2pURkOnTZtjJ9LYHrYTH8LgDjWgzSFDM1Fpx4RZ7_W3LjRKfh6Su9_gIZGGg13wi2lZoSsFOCCeQ3qISY7tjclhihdMrIbznbIAIUB5gNCbRBzCh2g7uUrllpR59NKvF8pCIarNY8la1H0UPMZVlQTej13")',
            }}
          ></div>
          <div className="flex flex-col">
            <h1 className="text-sm font-medium text-gray-900 dark:text-white">
              Dr. Angela Yu
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Instructor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
