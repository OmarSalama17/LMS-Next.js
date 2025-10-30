'use client'; 

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

export default function EnrollButton({ courseId, locale }) {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleEnroll = () => {
    if (!isSignedIn) {
      toast.error('Please sign in to enroll.');
      router.push(`/sign-in?redirect_url=${window.location.href}`);
      return;
    }

    router.push(`/${locale}/checkout?courseId=${courseId}`);
  };

  return (
    <>
      <button
        onClick={handleEnroll}
        className="mt-6 flex min-w-[84px] w-full items-center justify-center rounded-lg h-14 px-5 bg-primary text-slate-50 text-lg font-bold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 transform hover:-translate-y-1"
      >
        <span className="truncate">Enroll Now</span>
      </button>
    </>
  );
}
