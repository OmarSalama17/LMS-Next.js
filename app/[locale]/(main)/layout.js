import { Inter } from "next/font/google";
import { getMessages } from "next-intl/server";
import "./global.css";
import Header from "../../Components/header";
import Footer from "../../Components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-inter", // 👈 هتستخدمه في Tailwind كـ CSS variable
});
export const dynamic = "force-dynamic";


export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  console.log(locale);

  return (
    <>
      <Header />
      {children}
      <Footer/>
    </>
  );
}
