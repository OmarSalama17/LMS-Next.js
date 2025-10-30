import { Inter } from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "./(main)/global.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "700"],
});


export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "EDP Academy" : "EDP Academy",
    description: locale === "en" ? "EDP Academy" : "EDP Academy",
  };
}
export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  console.log(locale);

  return (
    <ClerkProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <html
          lang={locale}
          dir={locale === "ar" ? "rtl" : "ltr"}
          className={`${inter.className}`}
        >
          <head>
            <link
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
              rel="stylesheet"
            />
            <link rel="icon" href="/favicon.ico" sizes="any" />
          </head>
          <body className="bg-background-light dark:bg-[#131c26] font-display text-text-light dark:text-text-dark">
            <Toaster position="bottom-center" />
            {children}
          </body>
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
