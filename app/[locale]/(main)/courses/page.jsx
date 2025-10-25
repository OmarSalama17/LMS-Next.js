import CoursesListWrapper from "../../../Components/CoursesListWrapper";

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
export default async function Page({ params }) {
  //   const [sortBy, setSortBy] = useState("Newest");
  const { locale } = await params;

  const coursesData = await getCoursesData();
  // console.log(coursesData);

return <CoursesListWrapper initialCourses={coursesData} locale={locale}/>
}
