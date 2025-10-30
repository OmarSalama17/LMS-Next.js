'use client'; // ضروري جداً لأنه بيستخدم state

import { useState } from 'react';
import { UserProfile } from '@clerk/nextjs';

export default function UserProfileModal() {
  // 1. الـ State اللي بيتحكم في فتح وقفل المودال
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 2. الزرار اللي هيفتح المودال */}
      <button
        onClick={() => setIsOpen(true)} // لما تدوس عليه، خلي الـ state بـ true
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
      >
        <span className="material-symbols-outlined">account_circle</span>
        My Account
      </button>

      {/* 3. المودال نفسه (مش هيظهر غير لو isOpen بـ true) */}
      {isOpen && (
        
        // أ. الخلفية الشفافة (Overlay)
        <div 
className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setIsOpen(false)} // لو دوست بره المودال، اقفله
        >
          
          {/* ب. محتوى المودال (النافذة البيضا) */}
          <div
            className="relative w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()} // امنع قفل المودال لو دوست جواه
          >
            
            {/* ج. زرار القفل (X) */}
            <button
              onClick={() => setIsOpen(false)} // اقفل المودال
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* د. كومبوننت الـ UserProfile (أهم جزء) */}
            <UserProfile routing="hash" />
            
          </div>
        </div>
      )}
    </>
  );
}