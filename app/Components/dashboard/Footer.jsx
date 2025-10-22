"use client"
import { VscHome, VscArchive, VscAccount, VscSettingsGear , VscMoon , VscSunny } from 'react-icons/vsc';
import React from 'react'
import Dock from './Dock'
import { LightIcon } from "../LightIcon";
import { DarkIcon } from "../DarkIcon";
import ThemeController from '../theme';

const Footer = () => {
      const items = [
    { icon: <VscHome size={24} />, label: 'Home',  href:"/"},
    { iconDark: <DarkIcon size={24} />,iconLight: <LightIcon size={24} /> ,  labelDark: 'DarkMode', labelLight: 'LightMode',  labelTheme:"Theme",  href:"" },
    { icon: <VscAccount size={24} />, label: 'Profile',  href:"/dashboard/profile"},
    { icon: <span className="material-symbols-outlined">logout</span> , label: 'Logout', href:"/dashboard/settings" },
  ];

  return (
    <ThemeController>
        {({ toggleTheme , theme}) => (
              <Dock 
    items={items}
    panelHeight={68}
    baseItemSize={50}
    magnification={70}
    toggleTheme={toggleTheme}
    theme={theme}
    />
    )}
    </ThemeController>
  )
}

export default Footer