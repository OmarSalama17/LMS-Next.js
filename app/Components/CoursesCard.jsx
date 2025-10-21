export default function CourseCard({
  title,
  instructor,
  price,
  rating,
  reviews,
  category,
  categoryColor,
  image,
}) {
  return (
    <div className="bg-card-light dark:bg-card-dark rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col md:flex-row group">
      <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={image}
          alt={title}
        />
      </div>

      <div className="w-full md:w-3/5 p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold leading-tight">{title}</h3>
            <span className="text-xl font-bold text-primary">{price}</span>
          </div>

          <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-3">
            By {instructor}
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

        <div className="flex items-center justify-between mt-auto">
          <span
            className={`text-xs font-medium py-1 px-2 rounded-full ${categoryColor}`}
          >
            {category}
          </span>
          <a
            href="#"
            className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
          >
            View Course{" "}
            <span className="material-symbols-outlined !text-base">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
