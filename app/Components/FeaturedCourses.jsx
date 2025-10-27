"use client";
import React, { useMemo } from "react";
import EnrollButton from "./EnrollButton";

const FeaturedCourses = ({ data, locale }) => {
  const featuredCourses = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.filter((course) => course.isActive === true);
  }, [data]);

  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={`star-${i}`}
          className="material-symbols-outlined text-lg text-[#FFBE0B]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      );
    }

    if (halfStar) {
      stars.push(
        <span
          key="star-half"
          className="material-symbols-outlined text-lg text-[#FFBE0B]"
        >
          star_half
        </span>
      );
    }

    return stars;
  }

  return (
    <section className="py-20 sm:py-24 bg-primary-light dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-soft dark:shadow-soft-dark border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              <img
                className="h-56 w-full object-cover"
                src={course.image}
                alt={course.title}
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold leading-tight flex-grow">
                  {course.title[locale]}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 my-2">
                  By {course.instructor[locale]}
                </p>
                <div className="flex items-center">
                  <div className="flex text-secondary">
                    {renderStars(course.rating)}
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                    {course.rating} ({course.reviews.toLocaleString()})
                  </span>
                </div>
                <div className="mt-4 flex flex-col justify-between items-center">
                  <div
                    className={`text-2xl font-bold ${
                      course.price === 0 ? "text-green-500" : "text-primary"
                    }`}
                  >
                    {course.price ? `$${course.price}` : "Free"}
                  </div>
                  <EnrollButton courseId={data.id} locale={locale}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
