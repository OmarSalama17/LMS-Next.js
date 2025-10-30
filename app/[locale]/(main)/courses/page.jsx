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
export async function generateMetadata({ params }) {
  const { locale } = await params;

  const title = locale === "en" ? "Courses | EDP" : "الكورسات | EDP";
  const description =
    locale === "en"
      ? "Explore a wide range of online courses on Education Platform (EDP)."
      : "اكتشف مجموعة واسعة من الكورسات على منصة التعليم EDP.";

  return {
    title,
    description,
    keywords:
      locale === "en"
        ? ["courses", "learning", "education", "online learning"]
        : ["كورسات", "تعليم", "تعلم اونلاين", "منصة تعليمية"],
    openGraph: {
      title,
      description,
      url: locale === "en" ? "https://lms-next-js-omega.vercel.app/en/courses" : "https://lms-next-js-omega.vercel.app/ar/courses",
      siteName: "Education Platform (EDP)",
      locale,
      type: "website",
    },
    alternates: {
      canonical: locale === "en" ? "https://lms-next-js-omega.vercel.app/en/courses" : "https://lms-next-js-omega.vercel.app/ar/courses",
      languages: {
        en: "https://lms-next-js-omega.vercel.app/en/courses",
        ar: "https://lms-next-js-omega.vercel.app/ar/courses",
      },
    },
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
    <script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": coursesData.map((course, index) => ({
    "@type": "Course",
    "position": index + 1,
    "name": course.title[locale],
    "description": course.description[locale],
    "provider": {
      "@type": "Organization",
      "name": "EDP",
      "url": "https://edp.com",
    },
  })),
})}
</script>
      </NextIntlClientProvider>
  );
}
