import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const EditProduct = ({ setOpen, open, locale }) => {
  const t = useTranslations("addCourse");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: open.title[locale],
    description: open.description[locale],
    price: open.price,
    category: open.categories[locale],
    pricing: open.price > 0 ? "paid" : "free",
    whatLearn: open.whatLearn[0][locale],
    titleSyllabus: open.courseSyllabus[0].moduleTitle[locale],
    descriptionSyllabus: open.courseSyllabus[0].lessons[0][locale],
    image: open.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === "price" ? Number(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    toast.loading(t("toast.translating"));

    const {
      title,
      description,
      price,
      category,
      pricing,
      whatLearn,
      titleSyllabus,
      descriptionSyllabus,
      image,
    } = formData;

    const translateText = async (text, langPair = "en|ar") => {
      if (!text) return text;

      try {
        const query = encodeURIComponent(text);
        const url = `https://api.mymemory.translated.net/get?q=${query}&langpair=${langPair}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.responseStatus === 200) {
          return data.responseData.translatedText;
        } else {
          return text;
        }
      } catch (error) {
        console.error("Translation API error:", error);
        return text;
      }
    };

    try {
      const [
        arTitle,
        arDescription,
        arCategory,
        arInstructorName,
        arwhatLearn,
        artitleSyllabus,
        ardescriptionSyllabus,
      ] = await Promise.all([
        translateText(title),
        translateText(description),
        translateText(category),
        translateText(whatLearn),
        translateText(titleSyllabus),
        translateText(descriptionSyllabus),
      ]);

      const finalPayload = {
        title: {
          en: title,
          ar: arTitle,
        },
        description: {
          en: description,
          ar: arDescription,
        },
        price: price,
        categories: {
          en: category,
          ar: arCategory,
        },
        instructor: {
          en: open.instructor[locale],
          ar: open.instructor[locale],
        },
        image: image,
        whatLearn: [
          {
            en: whatLearn,
            ar: arwhatLearn,
          },
        ],
        courseSyllabus: [
          {
            moduleNumber: "01",
            moduleTitle: {
              en: titleSyllabus,
              ar: artitleSyllabus,
            },
            lessons: [
              {
                en: descriptionSyllabus,
                ar: ardescriptionSyllabus,
              },
            ],
          },
        ],
        userId: open.userId,
      };

      toast.dismiss();
      toast.loading(t("toast.savingToApi"));

      const res = await fetch(
        `https://68f816d9deff18f212b51c45.mockapi.io/api/product/${open.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalPayload),
        }
      );

      if (!res.ok) {
        throw new Error(`MockAPI Error: ${res.statusText}`);
      }

      const data = await res.json();

      toast.dismiss();
      toast.success(t("toast.success"));

      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error(t("toast.error", { message: error.message }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col gap-2 items-center justify-center bg-[#00000078]">
              <Toaster position="top-center" />
      <div
        className="font-bold bg-white rounded-lg px-[10px] py-[5px] cursor-pointer"
        onClick={() => setOpen(false)}
      >
        ✕
      </div>
      <div className="w-full max-w-3xl bg-white dark:bg-card-dark rounded-xl shadow-2xl p-6 flex flex-col items-center text-center">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="flex flex-col flex-1">
            <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
              {t("form.courseTitle")}
            </p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
              placeholder={t("form.courseTitlePlaceholder")}
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={isLoading}
            />
          </label>
          <label className="flex flex-col flex-1">
            <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
              {t("form.coursePrice")}
            </p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
              placeholder={t("form.coursePricePlaceholder")}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={isLoading}
            />
          </label>
          <label className="flex flex-col flex-1">
            <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
              {t("form.courseDescription")}
            </p>
            <div className="rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark focus-within:ring-2 focus-within:ring-primary/50">
              <div className="p-2 border-b border-slate-300 dark:border-slate-700 flex items-center gap-2"></div>
              <textarea
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-b-lg text-slate-900 dark:text-white focus:outline-none ring-0 border-0 bg-transparent min-h-36 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
                placeholder={t("form.courseDescriptionPlaceholder")}
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col flex-1">
              <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                {t("form.category")}
              </p>
              <select
                className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="">{t("form.categorySelect")}</option>
                <option value="development">
                  {t("form.categories.development")}
                </option>
                <option value="design">{t("form.categories.design")}</option>
                <option value="business">
                  {t("form.categories.business")}
                </option>
                <option value="marketing">
                  {t("form.categories.marketing")}
                </option>
              </select>
            </label>
            <div>
              <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                {t("form.pricing")}
              </p>
              <div className="flex gap-4 items-center h-14">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    className="form-radio text-primary focus:ring-primary/50 border-slate-300 dark:border-slate-600 bg-background-light dark:bg-slate-800"
                    name="pricing"
                    type="radio"
                    value="free"
                    checked={formData.pricing === "free"}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <span className="text-slate-700 dark:text-slate-300">
                    {t("form.pricingFree")}
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    className="form-radio text-primary focus:ring-primary/50 border-slate-300 dark:border-slate-600 bg-background-light dark:bg-slate-800"
                    name="pricing"
                    type="radio"
                    value="paid"
                    checked={formData.pricing === "paid"}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <span className="text-slate-700 dark:text-slate-300">
                    {t("form.pricingPaid")}
                  </span>
                </label>
              </div>
            </div>
            <div>
              <label className="flex flex-col flex-1">
                <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                  {t("form.syllabusTitle")}
                </p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
                  placeholder={t("form.syllabusTitlePlaceholder")}
                  name="titleSyllabus"
                  value={formData.titleSyllabus}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </label>
              <label className="flex flex-col flex-1">
                <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                  {t("form.syllabusDescription")}
                </p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
                  placeholder={t("form.syllabusDescriptionPlaceholder")}
                  name="descriptionSyllabus"
                  value={formData.descriptionSyllabus}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </label>
            </div>
            <label className="flex flex-col flex-1">
              <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal pb-2">
                {t("form.whatLearn")}
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal"
                placeholder={t("form.whatLearnPlaceholder")}
                name="whatLearn"
                value={formData.whatLearn}
                onChange={handleChange}
                disabled={isLoading}
              />
            </label>
          </div>
          <div className="flex justify-end gap-4 pt-6">
            <button
              className="px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? t("form.saving") : t("form.nextStep")}
              {!isLoading && (
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
