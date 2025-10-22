import React , {useState} from "react";

// const categories = [

//   { name: "Marketing", count: 23 },
//   { name: "Data Science", count: 15 },
//   { name: "Design", count: 18 },
//   { name: "Programming", count: 12 },
//   { name: "Business", count: 8 },
//   { name: "AI & ML", count: 8 },

// ];

const levels = ["Beginner", "Intermediate", "Advanced"];

const prices = ["Free", "Paid", "All"];

const FilterSidebar = ({onApplyFilters , categories}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("All");

  const handleLevelChange = (level) => {
    setSelectedLevel((prevSelected) => {
      if (prevSelected.includes(level)) {
        return prevSelected.filter((l) => l !== level);
      } else {
        return [...prevSelected, level];
      }
    }); 
  };
  const handleApply=()=>{
    const filters = {
      category: selectedCategory,
      level: selectedLevel,
      price: selectedPrice,
    }
    onApplyFilters(filters);
  }
  return (
    <aside className="w-full xl:w-1/4 xl:sticky xl:top-28 self-start">
      <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined">filter_list</span> Filters
        </h2>
        <div className="space-y-6">
          {/* Category Section */}
          <div>
            <h3 className="font-semibold mb-4">Category</h3>
            <div className="space-y-3">
              <button
              onClick={()=> setSelectedCategory(null)}
              className={`flex items-center justify-between w-full text-sm font-medium hover:text-primary transition-colors ${!selectedCategory ? "text-primary font-bold" : ""}`}
              >
                <span>All Categories</span>
              </button>
              {categories.map((category, index) => {
                console.log(category);
                
                return(
                <button
                  key={index}
                  className={`flex items-center justify-between w-full text-sm font-medium hover:text-primary transition-colors ${
                    selectedCategory === category.name ? "text-primary font-bold" : ""
                  }`}
                  onClick={()=> setSelectedCategory(category.name)}

                >
                  <span>{category.name}</span>
                  <span className="text-xs text-text-muted-light dark:text-text-muted-dark">
                    {category.count}
                  </span>
                </button>
              )})}
            </div>
          </div>

          <div className="border-t border-border-light dark:border-border-dark my-6"></div>

          {/* Level Section */}
          <div>
            <h3 className="font-semibold mb-4">Level</h3>
            <div className="space-y-3">
              {levels.map((level, index) => (
                <label key={index} className="flex items-center text-sm">
                  <input
                    className="h-4 w-4 rounded text-primary focus:ring-primary border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark mr-3"
                    type="checkbox"
                    checked={selectedLevel.includes(level)}
                    onChange={()=> handleLevelChange(level)}
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-border-light dark:border-border-dark my-6"></div>

          {/* Price Section */}
          <div>
            <h3 className="font-semibold mb-4">Price</h3>
            <div className="space-y-3">
              {prices.map((price, index) => (
                <label key={index} className="flex items-center text-sm">
                  <input
                    className="h-4 w-4 text-primary focus:ring-primary border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark mr-3"
                    name="price"
                    type="radio"
                    value={price}
                    checked={selectedPrice === price}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  />
                  {price}
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-border-light dark:border-border-dark my-6"></div>

          {/* Apply Filters Button */}
          <button className="w-full bg-primary text-white font-bold py-2.5 px-4 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
          onClick={handleApply}
          >
            <span className="material-symbols-outlined">filter_alt</span>
            Apply Filters
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
