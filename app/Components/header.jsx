"use client";
import Link from "next/link";
import ThemeController from "./theme";
import { usePathname } from "../../src/i18n/navigation";
import { DarkIcon } from "./DarkIcon";
import { LightIcon } from "./LightIcon";

export default function Header() {
  const pathname = usePathname();
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blogs" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <ThemeController>
      {({ toggleTheme , theme }) => (
        <header className="  bg-off-white dark:bg-background-dark shadow-md  dark:text-white">
          <div className="container mx-auto  flex items-center justify-between whitespace-nowrap px-10 py-4">
            <div className={`flex items-center gap-4 text-brand-blue ${theme === "dark" ? "bg-white rounded-md p-[2px]" : ""}`}>
              <img className="w-[130px]" src="/EduPro Logo Design.png" alt="" />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm leading-normal font-medium relative ${
                      isActive
                        ? "text-brand-blue font-extrabold "
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

            <div className="flex items-center gap-4">
              <div className={`flex items-center p-[5px] border border-[#9b9b9b] ${theme === "dark" ? "bg-[#27293d] rounded-md  hover:shadow-lg transition ease-out hover:text-[black] duration-300 hover:bg-zinc-200 " : "rounded-md bg-[#ffffff] border-[aliceblue] shadow-sm  hover:shadow-lg transition ease-out hover:text-[white] duration-300 hover:bg-blue-950"}`}
              onClick={toggleTheme}
              >
              {theme === "dark" ? <LightIcon/>  : <DarkIcon/> }
              </div>

              <Link href={"/login"} className={`relative flex items-center justify-center font-medium text-[14px]  
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
                
                `}>
              <span className="material-symbols-outlined">login</span>
              Login
              </Link>
              <Link href={"/login" } className={`relative flex items-center justify-center font-medium text-[14px]  
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
                
                `}>
              <span className="material-symbols-outlined">Person</span>
              Sign Up
              </Link>

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
