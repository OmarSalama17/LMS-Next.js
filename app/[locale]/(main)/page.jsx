import Image from "next/image";
import DarkVeil from './Prism';
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import FeaturedCourses from "../../Components/FeaturedCourses";

export default async function Home({ params }) {
  const { locale } = await params;
  const res = await fetch(`${process.env.URL_API}/product`);
  const data = await res.json();
const t = await getTranslations("home");
  const categories = [
    {
      title: "Development",
      icon: "code",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQJEVCMIO72oc_Dc19I-W7MRr-TyzckvzrufHxJorxCkmKMrG2Dn_KkFMS3wLHuExdM6Bpz1OniX8Qnp1TepACBkVJFalbt8s6ug_X69Ms7arBd5SYEHFBq6XUC72zycviFWJsnGoY0AjIV9p5p2UqIJvUf5p1fHbpBLmw8Uuyr5eJKWl9F1uSNR2vU82PJVb0NvmoaxBoiU6MK_JlBDpnl51z9eyLB96X0zUceIzaAszLv1rAG3TnpZCfTVrzjdNJGvApbdeK-141",
      bgColor: "bg-primary",
      isViewAll: false,
      alt: "Laptop with code on screen",
    },
    {
      title: "Design",
      icon: "palette",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnbJC9sYsRaOGY15x7Lr6-2mMWZOsJq_yqu7KCAvpcRYhnwGUjQop5jA7jfeUTnVXJ_BJZ0nq0ue8IDEq_yA6OEXqAAyQFyJNj5oBm5sdIR3OBuHiuwGIpd0eRbWBx-HPUszXVxS469g3LG72yqI2dl7ysjXZxpz3I33z3RyNNLRzbY7lzrtAlC-yLBYjILCuILDVNktcCeCus6tSvbXozlgseR6_kqjJLPQyG0H2rPHe7BVeTHUmZRgtswtfX_F_Jr2EkYvFONrYw",
      bgColor: "bg-[#fb5607]",
      isViewAll: false,
      alt: "Person sketching on a tablet",
    },
    {
      title: "Business",
      icon: "insights",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWnk8_g8uo57MMJBnQIMqRQdg0auK0hOUnFWdZohbjyI8IA9TLTJJLjYBpHwS3gqeyHZm5X52Nl2EH0_8sEl8MWjKDwuyQ6MP-bRhQ_V_QDXTg4iI845PEj4QRZkoe3t6jeeKavONt47jYYrIJEhF-QRP8xNNgJ_J4QxYmq2VtZPCofD0W0Y6U0iezYRr1EuVgKMXeoeewO0oYFnD7AJNtlQQ7kV7BqroC_1g-6Tv8mtWWysoFEpFD0BdpeA8kO0scocUJbiVVDs-F",
      bgColor: "bg-[#ffbe0b]",
      isViewAll: false,
      alt: "Business meeting with charts",
    },
    {
      title: "View All",
      icon: "arrow_forward",
      img: null,
      bgColor: "bg-gray-300 ",
      isViewAll: true,
      alt: "",
    },
  ];

  const featuredCourses = [
    {
      title: "The Complete Web Developer Course 3.0",
      instructor: "Angela Yu",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCQJEVCMIO72oc_Dc19I-W7MRr-TyzckvzrufHxJorxCkmKMrG2Dn_KkFMS3wLHuExdM6Bpz1OniX8Qnp1TepACBkVJFalbt8s6ug_X69Ms7arBd5SYEHFBq6XUC72zycviFWJsnGoY0AjIV9p5p2UqIJvUf5p1fHbpBLmw8Uuyr5eJKWl9F1uSNR2vU82PJVb0NvmoaxBoiU6MK_JlBDpnl51z9eyLB96X0zUceIzaAszLv1rAG3TnpZCfTVrzjdNJGvApbdeK-141",
      rating: 4.7,
      reviews: 12450,
      price: "$89.99",
      isFree: false,
    },
    {
      title: "Data Science & Machine Learning Bootcamp",
      instructor: "Jose Portilla",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWnk8_g8uo57MMJBnQIMqRQdg0auK0hOUnFWdZohbjyI8IA9TLTJJLjYBpHwS3gqeyHZm5X52Nl2EH0_8sEl8MWjKDwuyQ6MP-bRhQ_V_QDXTg4iI845PEj4QRZkoe3t6jeeKavONt47jYYrIJEhF-QRP8xNNgJ_J4QxYmq2VtZPCofD0W0Y6U0iezYRr1EuVgKMXeoeewO0oYFnD7AJNtlQQ7kV7BqroC_1g-6Tv8mtWWysoFEpFD0BdpeA8kO0scocUJbiVVDs-F",
      rating: 4.8,
      reviews: 18991,
      price: "Free",
      isFree: true,
    },
    {
      title: "Ultimate Guide to Digital Sketching",
      instructor: "Austin Batchelor",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAnbJC9sYsRaOGY15x7Lr6-2mMWZOsJq_yqu7KCAvpcRYhnwGUjQop5jA7jfeUTnVXJ_BJZ0nq0ue8IDEq_yA6OEXqAAyQFyJNj5oBm5sdIR3OBuHiuwGIpd0eRbWBx-HPUszXVxS469g3LG72yqI2dl7ysjXZxpz3I33z3RyNNLRzbY7lzrtAlC-yLBYjILCuILDVNktcCeCus6tSvbXozlgseR6_kqjJLPQyG0H2rPHe7BVeTHUmZRgtswtfX_F_Jr2EkYvFONrYw",
      rating: 4.6,
      reviews: 8230,
      price: "$49.99",
      isFree: false,
    },
  ];

  const testimonials = [
    {
      name: "Jane Doe",
      role: "Web Developer",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDRJPnvSWiwTZYGmKJdi_vF9LZS7Id1splML7iE7YozeG3U_gy5tiRwLn-4iqghxBALg-fuIvOXMj0Y8EOq8InUKQUzqbq2pYD6naexPCiN1DVGMg25fg-cVxeXFnKl3SysV3h9lvH_n_mAkKPrHQniIDh7o-uT9_8yl5AH0Qcd7iSDe0wpnxYrQTYBnDDWy8kba0lUuTInIgw8mLAjgV7NRP1-EZw-FDrTHak0PBsX36Viw70qEMi3DBWzBFVfYVJGMXTJMsz0CYQf",
      quote:
        '"LearnSphere completely transformed my career. The courses are practical, engaging, and taught by true industry experts. Highly recommended!"',
      rating: 5,
    },
    {
      name: "John Smith",
      role: "Data Analyst",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB6wTuX84Bgo33yeqvduWYiSN0WQVq-orNsZAUri2qfkIiO7sXlR3TPNwhFvH4F9MO-QNqJgWyA2LZxMI_aAaV-46JFj8-lpIAJBOKjG6Ayt2uZQlJOsItwQM9Kv0Qu4Qim6CituVKJx5EVG1zMLUFufenOn6GFESMhXrE3jH0z34bRJw5HdBwnYF8zjMkwNuyk0KsmLEq-WlM_CaiJZQ38kW-VYVi5vCJPP8TFpIMJp5jlCdkWnFi5ZSEDpvPJ73Ji2nImx8jW5ldC",
      quote:
        '"The flexibility of learning on my own schedule was a game changer. I could finally pursue my passion for data science without quitting my job."',
      rating: 5,
    },
  ];
  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={`star-${i}`}
          className="material-symbols-outlined text-lg text-[#FFBE0B]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      );
    }

    if (halfStar) {
      stars.push(
        <span
          key="star-half"
          className="material-symbols-outlined text-lg text-[#FFBE0B]"
        >
          star_half
        </span>
      );
    }

    return stars;
  }

  return (
    <main>


      <section className="relative overflow-hidden bg-white dark:bg-background-dd">
 <DarkVeil />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div
            className="absolute inset-0 -z-10 sphere-animation-placeholder opacity-10 dark:opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, #3a86ff 30%, transparent 80%)",
              animation: "pulse 6s infinite alternate",
              transform: "scale(1.5)",
            }}
          ></div>

          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-3 text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter text-text-light dark:text-white leading-tight">
                Unlock Your Potential.{" "}
                <span className="text-primary">Master New Skills.</span>
              </h1>
              <p className="mt-8 max-w-2xl mx-auto lg:mx-0 text-xl sm:text-2xl text-gray-600 dark:text-gray-400">
                Join millions of learners from around the globe. Discover
                expert-led courses and accelerate your journey to success today.
              </p>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="w-full sm:w-auto px-10 py-5 text-xl font-bold rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Find Your Course
                </button>
                <button className="w-full sm:w-auto px-10 py-5 text-xl font-bold rounded-full bg-primary-light dark:bg-gray-800 text-primary dark:text-text-dark hover:bg-primary/20 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 group">
                  <span>Start Teaching</span>
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 relative h-96 lg:h-auto lg:self-stretch">
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full h-full relative">
                  <img
                    className="absolute top-0 left-0 w-3/4 h-3/4 object-cover rounded-3xl shadow-soft dark:shadow-soft-dark border border-white/20 dark:border-gray-800/50 transform -rotate-12 hover:rotate-0 hover:scale-105 transition-transform duration-500"
                    alt="Female student smiling and learning on a laptop"
                    src="https://www.atomcamp.com/wp-content/uploads/2024/01/image-1-1024x705.png"
                  />
                  <img
                    className="absolute bottom-0 right-0 w-2/3 h-2/3 object-cover rounded-3xl shadow-soft dark:shadow-soft-dark border border-white/20 dark:border-gray-800/50 transform rotate-12 hover:rotate-0 hover:scale-105 transition-transform duration-500 z-10"
                    alt="Male instructor teaching in a classroom"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhcfBbw8ccJ_HiMT7UKnTQVNWmBuQngi5w4kjRo462WWfO_45k70r1mbEpHr_OlfVbAJdXmMeyua7JsCqqboZkqIdtG7eBAh2o9PLizGFD6zzasnM7XrDGGMx--6U6WyZ794GwZStTjhfVDDKdTcqxrzaCQitEdTTY7_xh-ya8I8ppeQo9jCIaqfEz1C8usWjWehMNNViq5GHjyXPOUT2uBjm0HmqQ41In_fkRPshRIwVgpQyJY_c53WNtWVn0T9JH_idh8vYcUveu"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-purple/10 dark:from-primary/20 dark:to-accent-purple/20 rounded-3xl -z-10 blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight dark:text-white">
              Explore Popular Categories
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Dive into subjects that spark your curiosity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl border border-gray-200  hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${
                  cat.isViewAll
                    ? "flex items-center justify-center bg-gray-100"
                    : ""
                }`}
              >
                {!cat.isViewAll && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <img
                      className="h-80 w-full object-cover"
                      src={cat.img}
                      alt={cat.alt}
                    />
                  </>
                )}

                <div
                  className={`absolute ${
                    cat.isViewAll ? "static text-center" : "bottom-0 left-0"
                  } p-6`}
                >
                  <div
                    className={`p-3 inline-block rounded-full ${cat.bgColor} mb-3`}
                  >
                    <span
                      className={`material-symbols-outlined text-3xl ${
                        cat.isViewAll
                          ? "text-text-light dark:text-text-dark"
                          : "text-white"
                      }`}
                    >
                      {cat.icon}
                    </span>
                  </div>
                  <h3
                    className={`text-2xl font-bold ${
                      cat.isViewAll
                        ? "text-text-light dark:text-white"
                        : "text-white"
                    }`}
                  >
                    {cat.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            <FeaturedCourses data={data} locale={locale}/>

    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 tracking-tight dark:text-white">
          Voices of Our Learners
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800/50 p-8 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700/50 flex flex-col sm:flex-row items-start gap-6"
            >
              <img
                className="w-20 h-20 rounded-full"
                src={testimonial.image}
                alt={`Avatar of student ${testimonial.name}`}
              />
              <div className="flex-1">
                <div className="flex text-secondary mb-2">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-bold text-lg dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      <section className="py-24 sm:py-32">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-primary to-accent-purple p-12 sm:p-20 rounded-xl overflow-hidden text-center">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 rounded-full opacity-50"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
                Join Millions of Learners
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Embark on your learning journey today. With expert instructors
                and a global community, you're in good company.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  aria-label="Start Learning"
                  className="px-8 py-4 text-base font-bold rounded-full bg-white text-primary hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white transition-transform hover:scale-105 shadow-lg"
                >
                  Start Learning
                </button>
                <button
                  aria-label="Become an Instructor"
                  className="px-8 py-4 text-base font-bold rounded-full bg-white/20 text-white hover:bg-white/30 focus:outline-none focus:ring-4 focus:ring-white transition-colors"
                >
                  Become an Instructor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
