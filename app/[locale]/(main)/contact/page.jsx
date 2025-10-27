import { getTranslations } from "next-intl/server";


export default async function page() {
  const t = await getTranslations("contact");

  const formFields = [
    {
      id: "name",
      label: t("form.nameLabel"),
      type: "text",
      placeholder: t("form.namePlaceholder"),
    },
    {
      id: "email",
      label: t("form.emailLabel"),
      type: "email",
      placeholder: t("form.emailPlaceholder"),
    },
    {
      id: "subject",
      label: t("form.subjectLabel"),
      type: "select",
      options: t.raw("form.subjectOptions"),
    },
    {
      id: "message",
      label: t("form.messageLabel"),
      type: "textarea",
      placeholder: t("form.messagePlaceholder"),
      rows: 5,
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-8">
        <div className="text-sm text-gray-500">الرئيسية / اتصل بنا</div>
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
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <form className="space-y-6">
            {formFields.map((field) => (
              <div key={field.id}>
                <label
                  className="block text-sm font-medium pb-2 text-gray-700 dark:text-gray-300"
                  htmlFor={field.id}
                >
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    rows={field.rows}
                    className="form-textarea w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary p-4 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors shadow-sm"
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.id}
                    className="form-select w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary h-12 px-4 appearance-none transition-colors shadow-sm"
                  >
                    {field.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="form-input w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary h-12 px-4 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors shadow-sm"
                  />
                )}
              </div>
            ))}

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold hover:bg-primary-dark transition-colors shadow-md"
              >
                {t("form.submitButton")}
              </button>
            </div>
          </form>
        </div>

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
                  {t("info.email")}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">phone</span>
                <span>{t("info.phone")}</span>
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
              <a
                className="text-gray-500 hover:text-primary transition-colors"
                href="#"
                aria-label="Twitter/X"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                className="text-gray-500 hover:text-primary transition-colors"
                href="#"
                aria-label="LinkedIn"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.206v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H6.328C5.051 1 4 2.05 4 3.328v17.344C4 21.95 5.051 23 6.328 23h11.34c1.277 0 2.327-1.05 2.327-2.328V3.328C20 2.05 18.946 1 17.668 1z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}