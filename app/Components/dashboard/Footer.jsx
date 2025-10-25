"use client";
import { VscHome, VscAccount } from "react-icons/vsc";
import React, { useState } from "react";
import Dock from "./Dock";
import { LightIcon } from "../LightIcon";
import { DarkIcon } from "../DarkIcon";
import ThemeController from "../theme";
import { SignOutButton } from "@clerk/nextjs";
import UserProfilePage from "../Profile/page";
const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
    console.log(isOpen);
  };

  const items = [
    { icon: <VscHome size={24} />, label: "Home", href: "/" },
    {
      iconDark: <DarkIcon size={24} />,
      iconLight: <LightIcon size={24} />,
      labelDark: "DarkMode",
      labelLight: "LightMode",
      labelTheme: "Theme",
      href: "",
    },
    {
      icon: <VscAccount size={24} />,
      label: "Profile",
      href: "#",
      onClick: toggle,
    },
    {
      icon: (
        <SignOutButton>
          <span className="material-symbols-outlined">logout</span>
        </SignOutButton>
      ),
      label: "Logout",
      href: "#",
    },
  ];

  return (
    <ThemeController>
      {({ toggleTheme, theme }) => (
        <>
          <Dock
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
            toggleTheme={toggleTheme}
            theme={theme}
            toggle={toggle}
          />
          {isOpen ? (
            <UserProfilePage isOpen={isOpen} setIsOpen={setIsOpen} />
          ) : (
            ""
          )}
        </>
      )}
    </ThemeController>
  );
};

export default Footer;
