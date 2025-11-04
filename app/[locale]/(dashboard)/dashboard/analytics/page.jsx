import Analytics from "../../../../Components/dashboard/Analytics";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const MOCK_API_URL = "https://68f816d9deff18f212b51c45.mockapi.io/api/product";

const page = async ({ params }) => {
  const { locale } = params;
  const { userId } = await auth();
  const user = await currentUser();
  if (user.unsafeMetadata.role !== "teacher") {
    return null;
  }
  
  if (!userId || !user) {
    return redirect(`/${locale}/sign-in`);
  }



  const clerk = await clerkClient();
  const users = await clerk.users.getUserList({ limit: 100 });
  const filterUsers = users.data.filter(
    (user) => user.privateMetadata.enrolledCourses
  );

  const courseIds = user.privateMetadata?.enrolledCourses || [];
  let enrolledCourses = [];
  let countStudents = 0;
  let studentList = [];

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

  if (user.unsafeMetadata.role !== "teacher") {
    if (courseIds.length > 0) {
      const coursePromises = courseIds.map((id) => getCourseDetailsById(id));
      const coursesData = await Promise.all(coursePromises);
      enrolledCourses = coursesData.filter((course) => course !== null);
    }
  } else {
    const res = await fetch(`${MOCK_API_URL}`);
    const data = await res.json();
    const teacherCourses = data.filter((course) => course.userId === user.id);
    const teacherCourseIds = new Set(teacherCourses.map((course) => course.id));

    const studentSet = new Set();

    filterUsers.forEach((student) => {
      const enrolledCoursesForUser =
        student.privateMetadata.enrolledCourses || [];
      let isEnrolledInTeacherCourse = false;

      enrolledCoursesForUser.forEach((courseId) => {
        if (teacherCourseIds.has(courseId)) {
          countStudents++;
          isEnrolledInTeacherCourse = true;
        }
      });

      if (isEnrolledInTeacherCourse && !studentSet.has(student.id)) {
        studentList.push(student);
        studentSet.add(student.id);
      }
    });

    enrolledCourses = teacherCourses;
  }

  const serializableStudentList = studentList.map((student) => ({
    id: student.id,
    imageUrl: student.imageUrl,
    fullName: student.fullName,
    firstName: student.firstName,
    lastName: student.lastName,

    lastActiveAt: student.lastActiveAt
      ? new Date(student.lastActiveAt).toISOString()
      : null,
  }));

  return (
    <Analytics
      enrolledCourses={enrolledCourses}
      countStudents={countStudents}
      studentList={serializableStudentList}
    />
  );
};

export default page;
