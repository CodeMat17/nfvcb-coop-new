import Footer from "@/components/Footer";
import NavHeader from "@/components/HavHeader";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Urbanist } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const urbanist = Urbanist({ subsets: ["latin"], weight: ["500"] });
export const dynamic = "force-dynamic";

export const metadata = {
  title: "NFVCB Cooperative",
  description: "NFVCB Multi Purpose Thrift Society.",
  openGraph: {
    title: "NFVCB Cooperative",
    description: "NFVCB Multi Purpose Thrift Society.",
    siteName: "NFVCB Cooperative",
    url: "https://nfvcb-coop-new.vercel.app",
    images: [
      {
        url: "https://res.cloudinary.com/mctony17/image/upload/v1696342054/logos/xrf2dgxhhfmjhvr4yzlg.png",
        width: 400,
        height: 400,
      },
      {
        url: "https://res.cloudinary.com/mctony17/image/upload/v1696342054/logos/xrf2dgxhhfmjhvr4yzlg.png",
        width: 800,
        height: 800,
        alt: "NFVCB Coop Logo",
      },
    ],
    locale: "en_US",
    type: "website",
    authors: ["NFVCB COOP"],
  },
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang='en'>
      <body className={`${urbanist.className}`}>
        {session && <NavHeader />}
        <main className='bg-gray-50'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
