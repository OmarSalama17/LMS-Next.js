import PathName from "../../../Components/PathName";
import { getTranslations } from "next-intl/server";
import ContactForm from "../../../Components/ContactForm"; 

export async function  generateMetadata({params}) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Contact" : "اتصل بنا",
    description: locale === "en" ? "Contact" : "اتصل بنا",
  };
}
export default async function page() {
const t = await getTranslations("contact");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-8">
        <PathName />
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          {t("hero.title")}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t("hero.description")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        <ContactForm />

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {t("info.title")}
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">mail</span>
                <a
                  className="hover:text-primary transition-colors"
                  href={`mailto:${t("info.email")}`}
                >
                  educationplatform@EDU.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">phone</span>
                <span>0112233445566</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <span>{t("info.hours")}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {t("faq.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t("faq.description")}
            </p>
            <a
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline transition-colors"
              href="#"
            >
              {t("faq.link")}{" "}
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {t("social.title")}
            </h3>
            <div className="flex gap-4">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}