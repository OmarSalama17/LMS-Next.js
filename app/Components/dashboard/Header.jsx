"use client";
import { useUser } from '@clerk/nextjs';
import React from 'react'
import LanguageSwitcher from '../langSwitcher';

const Header = ({div}) => {
  const {user} = useUser();
  console.log(user);
  
  return (
      <header className="flex flex-wrap justify-between items-center gap-4 p-6 border-b border-gray-200 dark:border-gray-700/50 bg-card-light dark:bg-card-dark/50">
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Hello, {user?.fullName} 👋
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
      Welcome to your dashboard.
      </p>
    </div>
    <div className='flex items-center gap-3'>
          <LanguageSwitcher />
    {
      user?.unsafeMetadata?.role !== "student" ? <> {div}</> :""
    }
    </div>
  </header>
  )
}

export default Header