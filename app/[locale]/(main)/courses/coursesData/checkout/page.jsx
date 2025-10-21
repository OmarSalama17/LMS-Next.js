"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // قراءة البيانات من localStorage
  useEffect(() => {
    const savedCourse = localStorage.getItem("selectedCourse");
    const savedUser = localStorage.getItem("user");

    if (savedCourse && savedUser) {
      setCourse(JSON.parse(savedCourse));
      setUser(JSON.parse(savedUser));
    } else {
      // لو دخل الصفحة بدون كورس أو بدون تسجيل دخول
      router.push("/");
    }
  }, [router]);

  const handlePayment = async () => {
    if (!course || !user) return;

    setLoading(true);

    try {
      // إرسال الكورس للـ API
      const res = await fetch(`https://fakeapi.com/users/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course: { ...course, purchasedAt: new Date() } }),
      });

      if (!res.ok) throw new Error("Failed to add course");

      // تحديث الكورس في localStorage
      const updatedCourses = [...(user.courses || []), course];
      const updatedUser = { ...user, courses: updatedCourses };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("تم الدفع بنجاح! الكورس تمت إضافته إلى كورساتك 🎉");

      setTimeout(() => router.push("/my-courses"), 2000);

    } catch (err) {
      // fallback لو API فشل
      const updatedCourses = [...(user.courses || []), course];
      const updatedUser = { ...user, courses: updatedCourses };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("تم الدفع بنجاح! الكورس تمت إضافته إلى كورساتك 🎉");
      setTimeout(() => router.push("/my-courses"), 2000);
    }

    setLoading(false);
  };

  if (!course || !user) return null;

  const breadcrumbs = [
    { label: "Cart", href: "/cart" },
    { label: "Shipping", href: "/shipping" },
    { label: "Payment", href: "/payment" },
  ];

  return (
    <div className="flex flex-col gap-8 p-6">
      <Toaster position="top-right" />

      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 text-sm text-accent">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center">
            {i < breadcrumbs.length - 1 ? (
              <>
                <a className="hover:text-primary" href={crumb.href}>{crumb.label}</a>
                <span className="text-gray-400 mx-1">/</span>
              </>
            ) : (
              <span className="font-medium text-text-primary dark:text-white">{crumb.label}</span>
            )}
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">

        {/* Left Column: Payment Details */}
        <div className="w-full md:w-3/5 lg:w-2/3 order-2 md:order-1">
          <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm p-6 md:p-8">
            <h1 className="text-3xl font-bold tracking-tight">Secure Payment</h1>
            <p className="text-accent mt-2">Complete your purchase by providing your payment details.</p>

            {/* Payment Method */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Payment Method</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <input checked className="sr-only peer" id="credit-card" name="payment-method" type="radio" />
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-primary rounded-lg cursor-pointer text-center peer-checked:bg-primary/10" htmlFor="credit-card">
                    <span className="material-symbols-outlined text-3xl text-primary">credit_card</span>
                    <span className="mt-2 text-sm font-medium">Credit Card</span>
                  </label>
                </div>
                <div className="relative">
                  <input className="sr-only peer" id="paypal" name="payment-method" type="radio" />
                  <label className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/10" htmlFor="paypal">
                    <span className="mt-2 text-sm font-medium">PayPal</span>
                  </label>
                </div>
                <div className="relative">
                  <input className="sr-only peer" id="google-pay" name="payment-method" type="radio" />
                  <label className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/10" htmlFor="google-pay">
                    <span className="mt-2 text-sm font-medium">Google Pay</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Card Details */}
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label className="block text-sm font-medium text-accent" htmlFor="name-on-card">Name on card</label>
                  <div className="mt-1">
                    <input autoComplete="cc-name" className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="name-on-card" name="name-on-card" type="text" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent" htmlFor="card-number">Card number</label>
                  <div className="mt-1">
                    <input autoComplete="cc-number" className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="card-number" name="card-number" placeholder="•••• •••• •••• ••••" type="text" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent" htmlFor="expiration-date">Expiration date (MM/YY)</label>
                  <div className="mt-1">
                    <input autoComplete="cc-exp" className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="expiration-date" name="expiration-date" placeholder="MM / YY" type="text" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent" htmlFor="cvv">CVV</label>
                  <div className="mt-1">
                    <input autoComplete="cc-csc" className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="cvv" name="cvv" placeholder="•••" type="text" />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-8 flex items-center justify-start gap-2 text-accent text-sm">
              <span className="material-symbols-outlined text-base">lock</span>
              <span>Secure payment with SSL encryption</span>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row-reverse items-center gap-4">
              <button onClick={handlePayment} disabled={loading} className="w-full sm:w-auto flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                {loading ? "Processing..." : "Pay Now"}
              </button>
              <a className="w-full sm:w-auto text-center text-sm font-medium text-primary hover:text-primary/90" href="/cart">Back to Cart</a>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full md:w-2/5 lg:w-1/3 order-1 md:order-2">
          <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-text-primary dark:text-white">Order Summary</h2>
            <div className="mt-6 flow-root">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="py-4 flex justify-between gap-x-6">
                  <p className="text-sm font-medium text-accent">{course.title}</p>
                  <p className="text-sm font-medium text-text-primary dark:text-white">${course.price}</p>
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
