"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SplashScreen() {
  const pathname = usePathname();

  // 🚀 1. علشان نتأكد إن الكومبوننت اتركب على العميل
  const [isMounted, setIsMounted] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const [showE, setShowE] = useState(false);
  const [showD, setShowD] = useState(false);
  const [showP, setShowP] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // 🚀 2. أول ما الكومبوننت يركب
    setIsMounted(true);

    const splashShown = localStorage.getItem("splashShown");
    const isHomePage = pathname === "/en" || pathname === "/ar";

    // 🚀 3. اللوجيك بتاع إظهار السبلاتش
    if (!splashShown && isHomePage) {
      localStorage.setItem("splashShown", "true");
      setIsVisible(true);

      const timers = [
        setTimeout(() => setShowE(true), 500),
        setTimeout(() => setShowD(true), 1300),
        setTimeout(() => setShowP(true), 2100),
        setTimeout(() => setShowText(true), 2400),
        setTimeout(() => setIsAnimatingOut(true), 4000),
        setTimeout(() => setIsVisible(false), 5000),
      ];

      return () => timers.forEach(clearTimeout);
    }
  }, [pathname]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  // 🚀 4. لو لسه الكومبوننت ما اتركبش، أو مش ظاهر حالياً
  if (!isMounted) return null;
  if (!isVisible) return null;

  // 🚀 5. عرض الأنيميشن
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col justify-center items-center h-screen bg-[#0d3d71]
        transition-opacity duration-500 ease-out
        ${isAnimatingOut ? "opacity-0" : "opacity-100"}`}
    >
      <div
        className={`flex flex-row justify-center items-center gap-[20px]
          transition-all duration-1000 ease-in-out transform
          ${isAnimatingOut ? "opacity-0 scale-50 -translate-y-1/2 -translate-x-1/2" : ""}`}
      >
        <div className="relative flex items-center flex-row font-sans font-bold text-white text-[150px]">
          <span
            className={`relative transition-all duration-[1000ms] ease-in-out mr-[-7px] bg-[#0b2141]
              rounded-tl-2xl rounded-bl-2xl py-[10px] pl-[10px] z-20
              ${showE ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-[90px] scale-50"}`}
          >
            E
          </span>

          <span
            className={`relative transition-all duration-[1000ms] ease-in-out mr-[-7px] bg-[#0b2141] z-10 py-[10px]
              ${showD ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-[70px] scale-50"}`}
          >
            D
          </span>

          <span
            className={`relative transition-all duration-[1000ms] ease-in-out bg-[#0b2141]
              rounded-tr-2xl rounded-br-2xl pr-[12px] py-[10px]
              ${showP ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-[70px] scale-50"}`}
          >
            P
          </span>
        </div>

        <div>
          <div className="relative top-[-20px] text-[195px] text-[#0b2141] font-[700]">
            <p
              className={`transition-all duration-[2000ms] ease
                ${showText ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[420px]"}`}
            >
              EduPro
            </p>
            <p
              className={`absolute bottom-0 left-[8px] font-[500] font-sans uppercase text-[#0b2141] m-0
                text-[62px] transition-all duration-[1500ms] ease
                ${showText ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-[150px] scale-95"}`}
            >
              education platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
