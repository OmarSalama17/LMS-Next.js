import React , {useState} from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "../../src/i18n/navigation";
import { useSearchParams } from 'next/navigation'; // <--- استيراد مهم
const levelKeys = ["Beginner", "Intermediate", "Advanced"];
const priceKeys = ["Free", "Paid", "All"];

const FilterSidebar = ({onApplyFilters , categories}) => {
const searchParams = useSearchParams() // <--- تعريف الـ Hook
const router = useRouter()
const selectedCat = searchParams.get("cat")
  const t = useTranslations("filter");

  const levels = levelKeys.map(key => ({ 
    key: key, 
    label: t(`level.${key.toLowerCase()}`) 
  }));
  
  const prices = priceKeys.map(key => ({
    key: key,
    label: t(`price.${key.toLowerCase()}`)
  }));


  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState([]); 
  const [selectedPrice, setSelectedPrice] = useState("All");

  const handleLevelChange = (levelKey) => {
    setSelectedLevel((prevSelected) => {
      if (prevSelected.includes(levelKey)) {
        return prevSelected.filter((l) => l !== levelKey);
      } else {
        return [...prevSelected, levelKey];
      }
    }); 
  };
  
  const handleApply = () => {
    const filters = {
      category: selectedCategory,
      level: selectedLevel,
      price: selectedPrice,
    }
    if (selectedCat !== null) {
      router.push("/courses")
    }
    onApplyFilters(filters);

  }

  return (
    <aside className="w-full xl:w-1/4 xl:sticky xl:top-[60px] self-start">
      <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined">filter_list</span> {t("title")}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">{t("category.title")}</h3>
            <div className="space-y-3">
              <button
                onClick={()=> setSelectedCategory(null)}
                className={`flex items-center justify-between w-full text-sm font-medium hover:text-primary transition-colors ${!selectedCategory ? "text-primary font-bold" : ""}`}
              >
                <span>{t("category.all")}</span>
              </button>
              {categories.map((category, index) => {
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

          {/* <div className="border-t border-border-light dark:border-border-dark my-6"></div>
          <div>
            <h3 className="font-semibold mb-4">{t("level.title")}</h3>
            <div className="space-y-3">
              {levels.map((level, index) => (
                <label key={index} className="flex items-center text-sm cursor-pointer">
                  <input
                    className="h-4 w-4 rounded text-primary focus:ring-primary border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark mr-3"
                    type="checkbox"
                    checked={selectedLevel.includes(level.key)}
                    onChange={()=> handleLevelChange(level.key)}
                  />
                  {level.label}
                </label>
              ))}
            </div>
          </div> */}

          <div className="border-t border-border-light dark:border-border-dark my-6"></div>

          <div>
            <h3 className="font-semibold mb-4">{t("price.title")}</h3>
            <div className="space-y-3">
              {prices.map((price, index) => (
                <label key={index} className="flex items-center text-sm cursor-pointer">
                  <input
                    className="h-4 w-4 text-primary focus:ring-primary border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark mr-3"
                    name="price"
                    type="radio"
                    value={price.key}
                    checked={selectedPrice === price.key}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  />
                  {price.label}
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-border-light dark:border-border-dark my-6"></div>

          <button className="w-full bg-primary text-white font-bold py-2.5 px-4 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
          onClick={handleApply}
          >
            <span className="material-symbols-outlined">filter_alt</span>
            {t("apply")}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;