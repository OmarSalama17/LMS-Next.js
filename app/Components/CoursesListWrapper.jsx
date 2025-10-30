"use client";
import React, { useState, useMemo, useEffect } from "react";
import CourseCard from "./CoursesCard";
import FilterSidebar from "./filter";
import PathName from "./PathName";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 6;

const CoursesListWrapper = ({ initialCourses, locale }) => {
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("cat");

  const t = useTranslations("courses");

  const sortOptions = useMemo(
    () => [
      { key: "Newest", label: t("sort.options.newest") },
      { key: "Most Popular", label: t("sort.options.popular") },
      { key: "Highest Rated", label: t("sort.options.rated") },
      { key: "Price: Low to High", label: t("sort.options.price_asc") },
      { key: "Price: High to Low", label: t("sort.options.price_desc") },
    ],
    [t]
  );

  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("Newest");

  const [filters, setFilters] = useState({
    category: null,
    level: [],
    price: "All",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = [...initialCourses];

    if (selectedCategory !== null) {
      filtered = filtered.filter(
        (course) => course.categories[locale] === searchParams.get("cat")
      );
    }
    // filter categories (uses locale prop, so it works with translated category names)
    if (filters.category) {
      filtered = filtered.filter(
        (course) => course.categories[locale] === filters.category
      );
    }

    // filter level (uses English keys: "Beginner", "Intermediate", "Advanced")
    if (filters.level.length > 0) {
      filtered = filtered.filter((course) =>
        filters.level.includes(course.level)
      );
    }

    // filter price (uses English keys: "Free", "Paid", "All")
    if (filters.price === "Free") {
      filtered = filtered.filter((course) => parseFloat(course.price) === 0);
    } else if (filters.price === "Paid") {
      filtered = filtered.filter((course) => parseFloat(course.price) > 0);
    }

    // filter sort (uses English keys)
    return filtered.sort((a, b) => {
      if (sortBy === "Highest Rated") return b.rating - a.rating;
      if (sortBy === "Most Popular") return b.reviews - a.reviews;
      if (sortBy === "Price: Low to High")
        return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === "Price: High to Low")
        return parseFloat(b.price) - parseFloat(a.price);
      return 0;
    });
  }, [sortBy, initialCourses, filters, locale]);

  const totalPages = Math.ceil(
    filteredAndSortedCourses.length / ITEMS_PER_PAGE
  );

  // Pagination
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredAndSortedCourses.slice(startIndex, endIndex);
  }, [currentPage, filteredAndSortedCourses]);

  const categoriesWithCounts = useMemo(() => {
    const counts = {};
    for (const course of initialCourses) {
      const category = course.categories[locale];
      counts[category] = (counts[category] || 0) + 1;
    }
    return Object.entries(counts).map(([name, count]) => ({
      name: name,
      count: count,
    }));
  }, [initialCourses, locale]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  return (
    <div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-[80px]"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="mb-8">
        <PathName />
      </div>
      <h1 className="text-[40px] my-[25px] font-bold">{locale === "ar" ? "الدورات" : "Courses"}</h1>

      <div className="flex flex-col xl:flex-row gap-12">
        <FilterSidebar
          onApplyFilters={setFilters}
          categories={categoriesWithCounts}
        />
        <main className="w-full xl:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              {t("stats.showing")}{" "}
              <span className="font-semibold text-text-light dark:text-text-dark">
                {paginatedCourses.length}
              </span>{" "}
              {t("stats.of")}{" "}
              <span className="font-semibold text-text-light dark:text-text-dark">
                {filteredAndSortedCourses.length}
              </span>{" "}
              {t("stats.courses")}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t("sort.label")}</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-auto bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                >
                  {sortOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark pointer-events-none !text-xl">
                  expand_more
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex h-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-3 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-900 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">
                  <span className="material-symbols-outlined mr-1">
                    grid_view
                  </span>
                  <span className="truncate">{t("view.grid")}</span>
                  <input
                    className="sr-only"
                    type="radio"
                    value="grid"
                    name="view-toggle"
                    checked={viewMode === "grid"}
                    onChange={() => setViewMode("grid")}
                  />
                </label>
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-3 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-900 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">
                  <span className="material-symbols-outlined mr-1">
                    view_list
                  </span>
                  <span className="truncate">{t("view.list")}</span>
                  <input
                    className="sr-only"
                    type="radio"
                    value="list"
                    name="view-toggle"
                    checked={viewMode === "list"}
                    onChange={() => setViewMode("list")}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {paginatedCourses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                locale={locale}
                viewMode={viewMode}
              />
            ))}
          </div>
        </main>
      </div>

      <div className="flex justify-center items-center gap-2 mt-12">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === pageNumber
                    ? "bg-primary text-white"
                    : "bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default CoursesListWrapper;
