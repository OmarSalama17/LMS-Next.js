'use client'; 

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

export default function EnrollButton({ courseId, locale }) {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleEnroll = () => {
    // 1. Check if user is signed in
    if (!isSignedIn) {
      toast.error('Please sign in to enroll.');
      router.push(`/sign-in?redirect_url=${window.location.href}`); // Redirect to sign-in
      return;
    }

    // 2. Redirect to checkout page with the course ID
    router.push(`/${locale}/checkout?courseId=${courseId}`);
  };

  return (
    <>
      {/* We add Toaster here so it can show the toast message */}
      {/* <Toaster position="top-right" />  <-- You probably have this in your layout.js already */}
      
      <button
        onClick={handleEnroll}
        className="mt-6 flex min-w-[84px] w-full items-center justify-center rounded-lg h-14 px-5 bg-primary text-slate-50 text-lg font-bold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 transform hover:-translate-y-1"
      >
        <span className="truncate">Enroll Now</span>
      </button>
    </>
  );
}
