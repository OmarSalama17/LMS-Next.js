"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";

const StudentCard = ({ student, view }) => {
  const { firstName, lastName , image: img,  online } = student;
  const name = `${firstName} ${lastName}`;

  if (view === "grid") {
    return (
      <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-6 text-center gap-[10px]">
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
        <div className="flex gap-2 w-full">
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

      <div className="flex-grow">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {name}
        </h3>
      </div>

      <div className="flex shrink-0 gap-2 sm:gap-3">
        <button className="flex items-center justify-center gap-2 h-10 w-10 sm:w-auto sm:px-4 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm font-medium">
          <span className="material-symbols-outlined text-base">chat</span>
          <span className="hidden sm:inline">Message</span>
        </button>
      </div>
    </div>
  );
};

const Students = ({ students  , locale}) => {
  console.log(students);

  const [view, setView] = useState("grid");

  return (
    <main className={`flex-1 flex-col ml-0  ${locale === "ar" ? "lg:mr-64" : "lg:ml-64"}`}>
      <div className="w-full">
        <Header
          div={
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex h-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-3 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-900 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">
                  <span className="material-symbols-outlined mr-1">
                    grid_view
                  </span>
                  <span className="truncate">Grid View</span>
                  <input
                    checked={view === "grid"}
                    onChange={() => setView("grid")}
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
                    checked={view === "list"}
                    onChange={() => setView("list")}
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
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-[24px]"
              : "flex flex-col gap-4 p-[24px]"
          }
        >
          {students.map((student) => (
            <StudentCard key={student.id} student={student} view={view} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Students;
