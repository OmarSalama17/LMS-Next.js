"use client";
import React, { useState , useEffect } from 'react'; 
import Header from '../../../../Components/dashboard/Header'
import { useUser } from '@clerk/nextjs';
import { useRouter } from '../../../../../src/i18n/navigation';


const students = [
  {
    id: 1,
    name: 'Sarah Johnson',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj4CQ5tnEuI-eNSJmfQIMdaUKfDwkhvivdHRIxbZpJFu6xawfhoUhwd8tiYW7_wdT26mThGihDCZCA8cvw16ddo2W0ptkLWFJuHSbAQFoPUhFGFeS9G6IvLZuufdM8SmO9DIKZly7fC4R1r9kchSEdikk2_OMBVtMcjBRBGW9MDfRtNLEj_jTZ22mi3RN0XzoI7XwFFk4U08P9uqOOpe1q5wsC8PDqXXTfHhOlvCCl6GhgmUe76a_COCCdIk-Ke5J64sOc8ajK5Ndm',
    courses: ['Calculus I', 'Intro to Psychology'],
    online: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXUfZ4v1fGIKDbq4gaMEZg3aRdcgAb3IjE7z8Ea2fnYmMLtpv-155Js_At1iCRyzBh5Y5nlX7ZaM9vn-FklgTTexkFGxGulC2jdDiU1pXnwAlQWqvX6vBbJJWuXcJP14vpmdllnNc8fndqwDcpDnSkuPMWrAHd_R02Kxji9y-3Sho_UyLYz1YCYCIGKlU2x1wnPMBKF6tq7dMTDoRXAuy-ybUH1Ffj3CULv5wz9XbV-F2oVzdzSwqjlrZNfuUbaBsyvzpPjJXK3K6B',
    courses: ['World History'],
    online: true,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_PSDHL91862cV6MmVJKn6gaQpaB6pLI4grdu8eYXP93yamOtKYjbJfGftuPn7fCQ2rxr46nRojUj6FBogf9uWLboeAXRzsf-xdtQEqHqiLywX0reNtCfkn2e6QtkLxGEDJf_uY21bmmt5-Rb_nxMAZgKAZ-uhQI3KWgWlDQ0_UwobblVjKs1zQszutbsOAB7Nuv4PIMT69FavuNiH24WrkawepasjK6XM6ySau8LmO8X7pp36One10l2aS35CSU9VAmokVNH3HkUj',
    courses: ['Calculus I', 'Digital Art'],
    online: false,
  },
];

const StudentCard = ({ student, view }) => {
  const { name, img, courses, online } = student;


  if (view === 'grid') {
    return (
      <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-6 text-center">
        <div className="relative mb-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24"
            data-alt={`Profile picture of ${name}`}
            style={{ backgroundImage: `url('${img}')` }}
          />
          {online && (
            <div className="absolute bottom-1 right-1 bg-green-500 rounded-full size-4 border-2 border-white dark:border-slate-800/50" />
          )}
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {name}
        </h3>
        <div className="flex flex-wrap justify-center gap-2 mt-2 mb-4">
          {courses.map((course) => (
            <span
              key={course}
              className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded-full"
            >
              {course}
            </span>
          ))}
        </div>
        <div className="flex gap-2 w-full">
          <button className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 text-sm font-medium">
            <span className="material-symbols-outlined text-base">
              person_add
            </span>
            Add Friend
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm font-medium">
            <span className="material-symbols-outlined text-base">chat</span>
            Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex items-center p-4 gap-4 w-full">
      {/* Image */}
      <div className="relative shrink-0">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-16"
          data-alt={`Profile picture of ${name}`}
          style={{ backgroundImage: `url('${img}')` }}
        />
        {online && (
          <div className="absolute bottom-0 right-0 bg-green-500 rounded-full size-4 border-2 border-white dark:border-slate-800/50" />
        )}
      </div>

      {/* Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {name}
        </h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {courses.map((course) => (
            <span
              key={course}
              className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded-full"
            >
              {course}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex shrink-0 gap-2 sm:gap-3">
        <button className="flex items-center justify-center gap-2 h-10 w-10 sm:w-auto sm:px-4 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 text-sm font-medium">
          <span className="material-symbols-outlined text-base">person_add</span>
          <span className="hidden sm:inline">Add Friend</span>
        </button>
        <button className="flex items-center justify-center gap-2 h-10 w-10 sm:w-auto sm:px-4 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm font-medium">
          <span className="material-symbols-outlined text-base">chat</span>
          <span className="hidden sm:inline">Message</span>
        </button>
      </div>
    </div>
  );
};


const page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [view, setView] = useState('grid'); 

  useEffect(() => {
    if (user?.unsafeMetadata?.role === "student") {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return (
    <main className="flex-1 flex-col ml-0 lg:ml-64">
      <div>

          <Header
      div={
                  <div className="flex items-center gap-2">
            <div className="hidden sm:flex h-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
              <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-3 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-900 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">
                <span className="material-symbols-outlined mr-1">grid_view</span>
                <span className="truncate">Grid View</span>
                <input
                  checked={view === 'grid'} 
                  onChange={() => setView('grid')} 
                  className="sr-only"
                  name="view-toggle"
                  type="radio"
                  value="Grid View"
                />
              </label>
              <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-3 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-900 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">
                <span className="material-symbols-outlined mr-1">
                  view_list
                </span>
                <span className="truncate">List View</span>
                <input
                  checked={view === 'list'} 
                  onChange={() => setView('list')}
                  className="sr-only"
                  name="view-toggle"
                  type="radio"
                  value="List View"
                />
              </label>
            </div>
          </div>
      }
          />
        
        <div
          className={
            view === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-[24px]' 
              : 'flex flex-col gap-4 p-[24px]'
          }
        >
          {students.map((student) => (
            <StudentCard key={student.id} student={student} view={view} />
          ))}

          <div
            className={`bg-white dark:bg-slate-800/50 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-6 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 justify-center ${
              view === 'grid'
                ? 'sm:col-span-2 lg:col-span-1 xl:col-span-1'
                : 'py-12' 
            }`}
          >
            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-5xl mb-3">
              group_add
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Find More Classmates
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Enroll in more courses to connect with new people.
            </p>
            <button className="mt-4 flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm font-medium">
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;