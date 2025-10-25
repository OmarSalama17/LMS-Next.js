"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";
// (!! اتأكد إن المسار ده صح بعد ما نقلت الفولدر !!)
import { enrollCourseAction } from "../../../actions/enrollCourse"; 
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const router = useRouter(); // (!! هنستخدم ده للـ redirect !!)
  const { user } = useUser();

  const [course, setCourse] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const params = useParams();

  const courseId = searchParams.get("courseId");
  const locale = params.locale;

  // Fetch course data (الكود بتاعك زي ما هو)
  useEffect(() => {
    if (!courseId) {
      toast.error("No course selected.");
      router.push("/");
      return;
    }

    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Course not found");
        }
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        toast.error(err.message);
        router.push("/");
      } finally {
        setFetchLoading(false);
      }
    }

    fetchCourse();
  }, [courseId, router]);

  
  // (!!  هنا التعديل كله  !!)
  const handlePayment = async () => {
    if (!courseId) {
      toast.error("Cannot process payment without a course.");
      return;
    }

    startTransition(async () => {
      try {
        // (1) هننادي الأكشن زي ما هو
        const response = await enrollCourseAction(courseId); // Server Action

        // (2) هنتأكد من الرد اللي راجع
        if (response.success) {
          // (3) لو نجح، اعرض رسالة نجاح
          toast.success(response.message || "Payment successful! Redirecting...");
          
          // (4) الكلاينت هو اللي يعمل redirect
          router.push('/dashboard'); 
        
        } else {
          // (5) لو فشل، اعرض رسالة الإيرور اللي جاية من السيرفر
          // (زي "أنت مشترك بالفعل في هذا الكورس.")
          toast.error(response.error || 'An error occurred.');
        }

      } catch (error) {
        // (ده لو حصل إيرور كبير زي مشكلة في النت)
        console.error(error);
        toast.error(error.message || "An unexpected error occurred.");
      }
    });
  };
  // (!!  نهاية التعديل  !!)


  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading Course Details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>
          Could not load course. Please{" "}
          <a href="/" className="underline text-primary">
            go back
          </a>{" "}
          and try again.
        </p>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Cart", href: "/cart" },
    { label: "Shipping", href: "/shipping" },
    { label: "Payment", href: "/payment" },
  ];

  return (
    <div className="flex flex-col gap-8 p-6">
      <Toaster position="top-right" />

      {/* Breadcrumbs (الكود بتاعك زي ما هو) */}
      <div className="flex flex-wrap gap-2 text-sm text-accent">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center">
            {i < breadcrumbs.length - 1 ? (
              <>
                <a className="hover:text-primary" href={crumb.href}>
                  {crumb.label}
                </a>
                <span className="text-gray-400 mx-1">/</span>
              </>
            ) : (
              <span className="font-medium text-text-primary dark:text-white">
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Main Content (الكود بتاعك زي ما هو) */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Left Column */}
        <div className="w-full md:w-3/5 lg:w-2/3 order-2 md:order-1">
          <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm p-6 md:p-8">
            <h1 className="text-3xl font-bold tracking-tight">Secure Payment</h1>
            <p className="text-accent mt-2">
              Complete your purchase by providing your payment details.
            </p>

            {/* Payment Button (الكود بتاعك زي ما هو) */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row-reverse items-center gap-4">
              <button
                onClick={handlePayment}
                disabled={isPending}
                className="w-full sm:w-auto flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
              >
                {isPending ? "Processing..." : "Pay Now"}
              </button>
              <a
                className="w-full sm:w-auto text-center text-sm font-medium text-primary hover:text-primary/90"
                href="/cart"
              >
                Back to Cart
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (الكود بتاعك زي ما هو) */}
        <div className="w-full md:w-2/5 lg:w-1/3 order-1 md:order-2">
          <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-text-primary dark:text-white">
              Order Summary
            </h2>
            <div className="mt-6 flow-root">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="py-4 flex justify-between gap-x-6">
                  <p className="text-sm font-medium text-accent">
                    {course.title[locale] || course.title.en}
                  </p>
                  <p className="text-sm font-medium text-text-primary dark:text-white">
                    ${course.price}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
              <div className="flex justify-between text-sm text-accent">
                <p>Subtotal</p>
                <p className="text-text-primary dark:text-white">${course.price}</p>
              </div>
              <div className="flex justify-between text-base font-semibold text-text-primary dark:text-white">
                <p>Total</p>
                <p>${course.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}