import PathName from "../../../../app/Components/PathName";
import React from "react";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("about");

  const teamMembersStatic = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-Dso_r6Sk2pXkebTtQRV48PNOTHk1WtYdNd2q4Q4mZMWqw_NmU5Rs7WOxAgnuILIAy7-itwnZBagUsF0SznHC9nklnbCv_CyZecVP63mWAMKaGPJxeTk6_6yEa8ub3FbGF9KkOfFGttbo1dloiDBg3sXWRE5u0SMNA3NToleCqDPAhRe8MLaBgSA4YW0fPQkZxKxBAVRzhzh8JX0PBT49K3PG9S5WRr7vOzIdnX_kZPTLIKZLnP5t3bqGVDpK1bs1YBv_FhpFwpV2",
      facebook: "#",
      twitter: "#",
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNbqnw-v5dho_WjARRyY7O9achyHGKRDJ1XkxvG-tJ9VXJpgBWc4oguTpqqH-R2OdcDLtXTm2CzEpGivFm9nkGC9mg4511STD_Z1-q3dBCfvmrnhQ3PiBWb-R6XW9bN512rVn5AUgnNLAuH2P6_fxuudeFbwH2eU5S7-KN_mCXE8Lh2sqtu3Qy3Fxu_okhqPeSJxcDxcUN6-4TixPhpeRYug96BPTTLTltJgOOifZ7q_2YBL0ivLT6yr1E-9m9miGDBZwMMKdC-rbG",
      facebook: "#",
      twitter: "#",
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCz_LVifWMXCpTqegpWgr_avYSrXWvdua6IdQ8Tanc0wcX2hSK2d7-OJcMoTw3yoawZPqceY3Q2u8Mg2s0QBqDtkDlAREE5IMp8VHZKy6Taga9rszacXP-PUsR3QfEMuOvI08whvqMW98Gz-eapE9A1q67SIGtg28qGakkAe6MCdq5OUEsdkCo0hy_uUZxk4We_LQptwIg7f9mmK9v2CkojsFBUKjQmh9623IIOOUaFYgrWZuDC0YeWV7jj9UpfAre1MdZ84GZeHfwX",
      facebook: "#",
      twitter: "#",
    },
  ];

  const coreValuesStatic = [
    { icon: "emoji_objects" },
    { icon: "groups" },
    { icon: "school" },
    { icon: "verified" },
  ];

  return (
    <div className="flex h-full grow flex-col">
      <div className="container mx-auto px-4 sm:px-8 py-[80px]">
        <div className="mb-8">
          <PathName />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="@container">
            <div className="@[480px]:p-4">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                data-alt="Abstract gradient background"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1OKOGlrDNTjKIpRcNIMK_ssMZGJHMLYHjDfgSUK5qKgR7kzN0VacomlkvaoZsRgZiy5HNw5jMP-dqCssznvbjrEAc6GKiu9rPBHthzBez89As_ASO2MR6sZ6qK8HSbuUGBVj5m1ATBL3kuA89nQLhy7GfPoblZ4ApqkbmeVDLC7u9-8auloVR9RMc0VuUavF9klJcNr-qpUNHgxROAWrr7ElE0jMcClUWRn4gwnVqh8kO_FG-rzukFbxGigQSNV4LVjB6GGtZ6ulS")',
                }}
              >
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                    {t("hero.title")} 
                  </h1>
                  <h2 className="text-white text-base font-normal leading-normal @[480px]:text-lg">
                    {t("hero.description")} 
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                    <span className="truncate">{t("hero.btn1")}</span>{" "}
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-accent-light text-text-light text-base font-bold leading-normal tracking-[0.015em] hover:bg-accent-light/80 transition-colors">
                    <span className="truncate">{t("hero.btn2")}</span>{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 py-10 lg:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark sm:text-4xl">
              {t("mission.title")} 
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              {t("mission.description")} 
            </p>
          </div>
          <img
            alt="Team collaborating in a modern office"
            className="rounded-xl shadow-lg"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0mz9-tcVWJe5HPiHNu99msPyZZ2uGURJG_BQOyjefY7bU8QudN1-Wfa_Xgr87nN0c1nTRG_9Zfs2yxMMqlUWLJg8_5xsvFqkEex6WEuz5Z6KCNBzewQ_mquiOPWXTW-GulVLyD1eo80wfYfH8X7-F5AQ_uHpSc1IFj0URk95y8wY_V_K10YViSW9MvRN85w0kL13uKu87kZsuSr_Zk0Ash_p8ZeNPbPqpwdojpGlx_By8mCVQwEuZI_-KIuR9kjPaYHwhT8WuMWSO"
          />
        </div>
      </div>

      <div className="container mx-auto bg-accent-light dark:bg-accent-dark py-16 sm:py-24">
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark sm:text-4xl">
              {t("journey.title")} 
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
              {t("journey.description")} 
            </p>
          </div>

          <div className="mt-12 grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] gap-x-4 md:gap-x-8 items-start">
            <div className="hidden md:flex flex-col items-end text-right pr-8">
              <p className="text-primary text-lg font-semibold">
                {t("journey.item1.title")}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                {t("journey.item1.date")}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 h-full">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white">
                <span className="material-symbols-outlined text-3xl">
                  lightbulb
                </span>
              </div>
              <div className="w-1 bg-primary/30 grow"></div>
            </div>
            <div className="pb-16 pt-2 md:pt-0">
              <p className="text-primary text-lg font-semibold md:hidden">
                {t("journey.item1.title")}
              </p>
              <p className="text-slate-500 dark:text-slate-400 md:hidden">
                {t("journey.item1.date")}
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {t("journey.item1.text")}
              </p>
            </div>

            <div className="pb-16 pt-2 text-right md:text-left">
              <p className="text-primary text-lg font-semibold">
                {t("journey.item2.title")}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                {t("journey.item2.date")}
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {t("journey.item2.text")}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 h-full">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white">
                <span className="material-symbols-outlined text-3xl">
                  rocket_launch
                </span>
              </div>
              <div className="w-1 bg-primary/30 grow"></div>
            </div>
            <div className="hidden md:block"></div>

            <div className="hidden md:flex flex-col items-end text-right pr-8">
              <p className="text-primary text-lg font-semibold">
                {t("journey.item3.title")}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                {t("journey.item3.date")}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 h-full">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white">
                <span className="material-symbols-outlined text-3xl">
                  public
                </span>
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <p className="text-primary text-lg font-semibold md:hidden">
                {t("journey.item3.title")}
              </p>
              <p className="text-slate-500 dark:text-slate-400 md:hidden">
                {t("journey.item3.date")}
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {t("journey.item3.text")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16 sm:py-24">
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark sm:text-4xl">
              {t("team.title")} 
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
              {t("team.description")} 
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembersStatic.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block">
                  <img
                    alt={`Headshot of ${t(`team.members.${index}.name`)}`} 
                    className="h-40 w-40 rounded-full object-cover mx-auto"
                    src={member.image}
                  />
                  <div className="absolute inset-0 rounded-full bg-primary/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-4">
                      <a
                        className="text-white hover:text-white/80"
                        href={member.facebook} 
                      >
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          ></path>
                        </svg>
                      </a>
                      <a
                        className="text-white hover:text-white/80"
                        href={member.twitter} // 4. من المصفوفة الثابتة
                      >
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-7 tracking-tight text-text-light dark:text-text-dark">
                  {t(`team.members.${index}.name`)}
                </h3>
                <p className="text-base leading-6 text-primary">
                  {t(`team.members.${index}.role`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto bg-accent-light dark:bg-accent-dark py-16 sm:py-24">
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark sm:text-4xl">
              {t("values.title")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
              {t("values.description")} 
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {coreValuesStatic.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mx-auto">
                  <span className="material-symbols-outlined text-4xl">
                    {value.icon} 
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">
                  {t(`values.items.${index}.title`)} 
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {t(`values.items.${index}.description`)} 
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary">
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-16 sm:py-20 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("cta.title")} {/* 3. تم الربط */}
          </h2>

          <div className="mt-8 flex justify-center gap-4">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white text-primary text-base font-bold leading-normal tracking-[0.015em] hover:bg-white/90 transition-colors">
              <span className="truncate">{t("cta.btn1")}</span>{" "}
              {/* 3. تم الربط */}
            </button>

            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-transparent border border-white text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-white/10 transition-colors">
              <span className="truncate">{t("cta.btn2")}</span>{" "}
              {/* 3. تم الربط */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;