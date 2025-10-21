"use client";
import Link from "next/link";
import ThemeController from "./theme";

export default function Header() {
  // 1️⃣ روابط التنقل
  const navLinks = [
    { label: "Home", href: "/", active: false },
    { label: "Courses", href: "/courses", active: true },
    { label: "About Us", href: "/about", active: false },
    { label: "Contact", href: "/contact", active: false },
    { label: "Blog", href: "/blog", active: false },
    { label: "FAQ", href: "/faq", active: false },
  ];

  return (
    <ThemeController>
      {({ toggleTheme }) => (
        <header className="  bg-off-white dark:bg-background-dark shadow-sm  dark:text-white">
          <div className="container mx-auto  flex items-center justify-between whitespace-nowrap px-10 py-4">
            {/* Logo + Title */}
            <div className="flex items-center gap-4 text-brand-blue">
              <div className="size-8">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L1 9l4 1.5V17a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6.5L23 9l-11-7zm-3 8h6v2H9v-2zm0 4h6v2H9v-2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em]">
                LMS
              </h2>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm leading-normal font-medium ${
                    link.active
                      ? "text-brand-blue font-bold"
                      : "text-neutral-gray hover:text-brand-blue"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right-side Icons & Actions */}
            <div className="flex items-center gap-4">
              <button className="text-neutral-gray hover:text-brand-blue">
                <span className="material-symbols-outlined">settings</span>
              </button>

              <button className="relative text-neutral-gray hover:text-brand-blue">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-vibrant-orange"></span>
              </button>

              <div className="flex items-center">
                <span className="material-symbols-outlined text-neutral-gray">
                  light_mode
                </span>
                <label className="relative inline-flex items-center cursor-pointer mx-2">
                  <input
                    className="sr-only peer"
                    type="checkbox"
                    value=""
                    onClick={() => toggleTheme()}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-blue"></div>
                </label>
                <span className="material-symbols-outlined text-neutral-gray">
                  dark_mode
                </span>
              </div>

              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                data-alt="User profile avatar"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAE7vR78B-yRqQHix2zDZM1eUMv9bni3Xu5HEdAAVfkgbUx8ZmR8pPRKXovN7i7-iaOyxn-73nJJIt2bXuQOuP4EZTqvhJ8ziKWbVKpuOaz_GPu-PrFPWC2OQml6n7FX4F4e5lNl-QO6cSGXPA3wE67OKvjq3pqEj9-j2LKN4QStnA8DNXyn69-hEugrL09ftwPyyJivmWHjpXXG9Q1XNIQ8sg4AvRCubaEbdyZxAj2muD5U18QDP3DSUQZ7mtLEYS7jtTtBwOqO4Xf")',
                }}
              ></div>

              <button className="md:hidden text-neutral-gray">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </header>
      )}
    </ThemeController>
  );
}
