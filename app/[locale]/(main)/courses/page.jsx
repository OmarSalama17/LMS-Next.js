import CoursesListWrapper from "../../../Components/CoursesListWrapper";
import { getMessages } from "next-intl/server"; // 1. استيراد
import { NextIntlClientProvider } from "next-intl"; // 2. استيراد
import { Suspense } from "react"; // 3. استيراد
import Loading from "../loading";
async function getCoursesData() {
  const api = "https://68f816d9deff18f212b51c45.mockapi.io/api/product";
  const res = await fetch(api, {
    cache: "no-cache",
  });
  if(!res.ok){
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export async function  generateMetadata({params}) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Courses EDP" : "الكورسات",
    description: locale === "en" ? "Courses EDP" : "الكورسات",
  };
}

export default async function Page({ params }) {
const { locale } = await params;
  const coursesData = await getCoursesData();

  const messages = await getMessages();
return (
      <NextIntlClientProvider
        locale={locale}
        messages={messages} 
      >
<Suspense fallback={<Loading />}>
        <CoursesListWrapper initialCourses={coursesData} locale={locale} />
    </Suspense>
      </NextIntlClientProvider>
  );
}
