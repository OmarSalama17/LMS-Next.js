import FilterSidebar from "../../../Components/filter";
import CourseCard from "../../../Components/CoursesCard";
export default function Page() {
    //   const [sortBy, setSortBy] = useState("Newest");


    const coursesData = [
  {
    id: 1,
    title: "Digital Marketing Masterclass",
    instructor: "Sarah Brown",
    price: "$79.99",
    rating: 4.8,
    reviews: 1234,
    category: "Business",
    categoryColor: "text-secondary bg-secondary/10",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpKenoFfCcj0C18hJ-3iggfY10GzqVcK8Q-Rm7QW2nfA5zjsthCgW_6FAyXszUuiDYyH7mW2AuB2VN1gMWCTUf5jJkdK8tZxi4gmiU7VDnvatmNU5PhD8xZwaYKAHwT06HiY5eDD_UmX6ALZDSn4c2AR-qtS7wNH3z0k1xMDiyJu01sTy2Sr_7vpTyv_YTLAPN1Iv5qdRdWwQ0UJRCawKxzZoiGVuIlEoHkFc1D_Z0T821FVMSXXzNPaXTRoZ3TiSJqsNTeOpY-3CD",
  },
  {
    id: 2,
    title: "Introduction to Python",
    instructor: "Jane Doe",
    price: "Free",
    rating: 4.9,
    reviews: 2581,
    category: "Web Dev",
    categoryColor: "text-primary bg-primary/10",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBwZxVTW7oM9IAZusplB7sSL5HxGeDIERZsWer1tXeENKeSim8AlPQZJKOoZ3CXZYdE5RRAw5Pn47ZVJZUQ5N8E2xwjBliBy4Mo3j_8mTSGVu5DKRhLB3XHLlMa5b_Tv9YSYfpUH2j1ZpnLmEleY6ABStfsMn6KMP15gAYm96HFPR5olRz_Lfg5zLh_fVYkOX9s7o_NJB4qtIks0QRyt_fPZUaztfO_ddXhBzTNDsUIuJ2SdHm-eQ_dSO8d_uXjaDS0KVfB4l2XqNA",
  },
  {
    id: 3,
    title: "Data Science with R",
    instructor: "Chris Green",
    price: "$99.99",
    rating: 4.6,
    reviews: 987,
    category: "Data Science",
    categoryColor: "text-red-500 bg-red-500/10",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4s-oJu9kruPFZ91BdzUjs7YOvVeTkMkJ-zJ99XTRr9il9Wy7eO7MYl3JuL2pPSMBcFHiB3gnQV4un8mfavEnOjFsRCmnod-YvIcevu6ANuxhSDI3Yiq25jh5zl5GkJLz-v_RvXRVaGn5wddHoO8scY1X1cptcrkz55XWF2n5wQyLJDCfJoBL705xv7LIARKxqfhbK7K2Lx2upWAB4uqW-0rTnwCb2FeNi5cpLgpw8ca7lvYfIolJORRiMwOy7s4KQ26akBJgYSJJl",
  },
  {
    id: 4,
    title: "The Complete JavaScript Course",
    instructor: "David Black",
    price: "$149.99",
    rating: 4.7,
    reviews: 3102,
    category: "Web Dev",
    categoryColor: "text-primary bg-primary/10",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhcfBbw8ccJ_HiMT7UKnTQVNWmBuQngi5w4kjRo462WWfO_45k70r1mbEpHr_OlfVbAJdXmMeyua7JsCqqboZkqIdtG7eBAh2o9PLizGFD6zzasnM7XrDGGMx--6U6WyZ794GwZStTjhfVDDKdTcqxrzaCQitEdTTY7_xh-ya8I8ppeQo9jCIaqfEz1C8usWjWehMNNViq5GHjyXPOUT2uBjm0HmqQ41In_fkRPshRIwVgpQyJY_c53WNtWVn0T9JH_idh8vYcUveu",
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    instructor: "Emily White",
    price: "$129.99",
    rating: 4.9,
    reviews: 4512,
    category: "UI/UX Design",
    categoryColor: "text-purple-500 bg-purple-500/10",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJfCvQpdy1UzMhGhYzY7ASOJYRnI1szqa3LkJ9tzPnnBY8C3fqolQoMta7rOJNaf21Izh6-ttwLY_dl9NJ9j46I3PII_1E95HflbzoeTPk91eJizOS9lRuNxtg0RVKPqzAzdwmwCuLcO9rZ7H_0efB9qAMQ7cjSxVvUOM-oNElVNUArdAo05HDD7VhdvhFjNKUR0jg6MZoYc0puw-2WSxzRacwahdBj0lQPuqz14iN0JhJnCe7TYgLo2whfFahi-CRMRVgjyC_N6Ap",
  },
  {
    id: 6,
    title: "Advanced CSS and Sass",
    instructor: "John Smith",
    price: "$89.99",
    rating: 4.7,
    reviews: 1899,
    category: "Web Dev",
    categoryColor: "text-primary bg-primary/10",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbZt-gHqV3_LMAM_u_BEpDLN0VxvlXSnSR4Hln2oWXnUavEDr23h8alq_77JaWYqwt9gc3RZ3RTcIZTHF4oz35W4MfAXXncvsBSOB72fprNrNZwTupsPucv8M4AoCCnSXrDI98Vor3yd2ao55CAXm2zjG71MWfn63wIoLGU2P7loGm_NFuJW_gh4lex_fc2PXb9gjrsL1ZdjeMxIVKkIqbuwX1mOH4ySa5CZ9Imr46XNmilCSGZ2TR0sUKxnWQQWaY4XzelmhupwrK",
  },
];
let sortBy = "Newest";
  const sortedCourses = [...coursesData].sort((a, b) => {
    if (sortBy === "Highest Rated") return b.rating - a.rating;
    if (sortBy === "Most Popular") return b.reviews - a.reviews;
    if (sortBy === "Price: Low to High")
      return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
    if (sortBy === "Price: High to Low")
      return parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", ""));
    return 0;
  });
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col xl:flex-row gap-12">
      <FilterSidebar />


      <main className="w-full xl:w-3/4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
            Showing{" "}
            <span className="font-semibold text-text-light dark:text-text-dark">
              12
            </span>{" "}
            of{" "}
            <span className="font-semibold text-text-light dark:text-text-dark">
              84
            </span>{" "}
            courses
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by:</span>
            <div className="relative">
              <select
                className="appearance-none w-auto bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
              >
                <option>Newest</option>
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark pointer-events-none !text-xl">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {sortedCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </main>
    </div>
      </div>
  );
}
