
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../../(main)/global.css";
import Sidebar from "../../../Components/dashboard/sidebar";
import Footer from "../../../Components/dashboard/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-inter", 
});
export const dynamic = "force-dynamic";

export default async  function RootLayout({ children , params }) 
{
const { locale } = await params;
  return (
<>
          
          <div className="flex h-full grow">
            <Sidebar locale={locale} />
            {children}
          </div>
            <Footer/>
            </>
  );
}
