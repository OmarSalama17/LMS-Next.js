import { Link } from "../../src/i18n/navigation";

export default function CourseCard({
  title,
  instructor,
  price,
  rating,
  reviews,
  categories,
  categoryColor,
  image,
  locale,
  viewMode, 
}) {
  const slug = title[locale].toLowerCase().replace(/ /g, '-');
  
  const isListView = viewMode === 'list';

  return (
    <div
      className={`bg-card-light dark:bg-card-dark rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex group ${
        isListView
          ? 'flex-col md:flex-row'
          : 'flex-col'
      }`}
    >
      <div
        className={`overflow-hidden ${
          isListView
            ? 'w-full md:w-[55%] h-48 md:h-auto' 
            : 'w-full h-80'
        }`}
      >
        <img
          className="w-full h-full  group-hover:scale-105 transition-transform duration-300"
          src={image}
          alt={title[locale]} 
        />
      </div>

      <div

        className={`p-5 flex flex-col justify-between ${
          isListView
            ? 'w-full md:w-3/5' 
            : 'w-full' 
        }`}
      >
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold leading-tight line-clamp-2">
              {title[locale]}
            </h3>
            <span className={`text-xl font-bold   ${price === 0 ? "text-green-500" : "text-primary ml-2"}`}>{price === 0 ? "Free" : price}</span>
          </div>

          <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-3 ">
            By {instructor[locale]}
          </p>

          <div className="flex items-center text-sm text-secondary mb-4">
            <span className="mr-1">{rating}</span>
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined !text-base">
                {i < Math.floor(rating) ? "star" : "star_half"}
              </span>
            ))}
            <span className="text-text-muted-light dark:text-text-muted-dark ml-2">
              ({reviews})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4"> 
          <span
            className={`text-xs font-medium py-1 px-2 rounded-full ${categoryColor}`}
          >
            {categories[locale]}
          </span>
          <Link
            href={`/courses/${slug}`}
            className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
          >
            View Course{" "}
            <span className="material-symbols-outlined !text-base">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}