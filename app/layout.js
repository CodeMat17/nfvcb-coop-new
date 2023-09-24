import Footer from "@/components/Footer";
import NavHeader from "@/components/HavHeader";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NFVCB Coop",
  description: "NFVCB Multi Purpose Thrift Society.",
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang='en'>
      <body className={inter.className}>
        {session && <NavHeader />}
        <main className='bg-purple-50'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
