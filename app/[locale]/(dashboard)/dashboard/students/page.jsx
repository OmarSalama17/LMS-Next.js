import { clerkClient } from "@clerk/nextjs/server";
import Students from "../../../../Components/dashboard/Students";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";

const MOCK_API_URL = process.env.URL_API;
const page = async ({ params }) => {
  const { locale } = await params;
  const user = await currentUser();
  if (user.unsafeMetadata.role !== "teacher") {
    return null;
  }
  // filter users with enrolled course
  const clerk = await clerkClient();
  const users = await clerk.users.getUserList({ limit: 100 });
  const filterUsers = users.data.filter(
    (user) => user?.privateMetadata?.enrolledCourses
  );
  console.log(filterUsers);

  // filter course with instructor
  const res = await fetch(`${MOCK_API_URL}/product `, { cache: "no-cache" });
  const data = await res.json();
  const filterData = data
    .filter((course) => course?.userId === user?.id)
    .map((course) => course.id);
  console.log(filterData);

  const filterUsersEnrolled = filterUsers
    .filter((user) =>
      user?.privateMetadata?.enrolledCourses?.some((courseId) =>
        filterData.includes(courseId)
      )
    )
    .map((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      };
    });
  console.log(filterUsersEnrolled);

  return (
      <Students students={filterUsersEnrolled} locale={locale} />
  );
};

export default page;
