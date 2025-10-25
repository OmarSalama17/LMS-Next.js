import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// (1) امبورت للكومبوننت اللي لسه عاملينه
import DashboardClient from '../../../../Components/dashboard/DashboardClient'; 

// (!! IMPORTANTE !!)
// ده الـ API بتاعك
const MOCK_API_URL = "https://68f816d9deff18f212b51c45.mockapi.io/api/product";

/**
 * (2) دالة مساعدة (بتجيب بيانات كورس واحد)
 */
async function getCourseDetailsById(id) {
  try {
    const res = await fetch(`${MOCK_API_URL}/${id}`);
    if (!res.ok) {
      console.error(`Failed to fetch course ${id}`);
      return null; 
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    return null; 
  }
}

/**
 * (3) صفحة الداشبورد (Server Component)
 */
export default async function DashboardPage({ params }) {
  const { locale } = params; // عشان اللغة

  // (4) هات اليوزر وبياناته (ده بيشتغل في السيرفر بس)
  const { userId } = await auth();
  const user = await currentUser();

  // (5) الـ middleware بيحمي، بس ده تشييك أمان إضافي
  if (!userId || !user) {
    return redirect(`/${locale}/sign-in`);
  }

  // (6) استخرج لستة الـ IDs من الميتا داتا السرية
  const courseIds = user.privateMetadata?.enrolledCourses || [];

  let enrolledCourses = [];

  // (7) لو اليوزر عنده كورسات، هات بياناتها
  if (courseIds.length > 0) {
    const coursePromises = courseIds.map(id => getCourseDetailsById(id));
    const coursesData = await Promise.all(coursePromises);
    enrolledCourses = coursesData.filter(course => course !== null);
  }

  // (8) اعرض الكومبوننت بتاعك واديه الداتا
  return (
    <DashboardClient coursesData={enrolledCourses} locale={locale} />
  );
}