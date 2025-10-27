import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import DashboardClient from '../../../../Components/dashboard/DashboardClient'; 

const MOCK_API_URL = "https://68f816d9deff18f212b51c45.mockapi.io/api/product";


export default async function DashboardPage({ params }) {
  const { locale } = await params;

  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return redirect(`/${locale}/sign-in`);
  }

  const courseIds = user.privateMetadata?.enrolledCourses || [];

  let enrolledCourses = [];

  // function getCourseDetailsById
  if (user.unsafeMetadata.role !== "teacher") {
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

    if (courseIds.length > 0) {
      const coursePromises = courseIds.map((id) => getCourseDetailsById(id));
      const coursesData = await Promise.all(coursePromises);
      enrolledCourses = coursesData.filter((course) => course !== null);
    }
  }else{
    const res = await fetch(`${MOCK_API_URL}`);
    const data = await res.json();
    const filter = data.filter((course) => course.instructor["en"] === user.fullName || course.instructor["ar"] === user.fullName);
    enrolledCourses = filter
  }

  return (
    <DashboardClient coursesData={enrolledCourses} locale={locale} />
  );
}