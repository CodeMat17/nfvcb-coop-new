"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import LogoComponent from "./LogoComponent";
import SignOut from "./action-buttons/SignoutBtn";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const HavHeader = () => {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [is_admin, setIsAdmin] = useState(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`is_admin`)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setIsAdmin(data.is_admin);
      }
    } catch (error) {
      console.log("Error loading user data!", error.message);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div className='bg-green-900 pl-4 pr-2 py-3 sticky top-0 z-50'>
      <div className=' flex items-center justify-between max-w-5xl mx-auto text-white'>
        <LogoComponent classnames='w-12 h-12' />
        {is_admin && (
          <>
            {loading ? (
              <AiOutlineLoading className='text-yellow-600 text-xl font-bold animate-spin' />
            ) : (
              <Link
                href='/admin-dashboard'
                className='transition-colors duration-500 ease-in-out bg-green-800 hover:bg-green-700 px-4 py-2 rounded-2xl'>
                Dashboard
              </Link>
            )}
          </>
        )}

        {/* <SignOut /> */}
 <MobileMenu />
       <DesktopMenu />
      </div>
    </div>
  );
};

export default HavHeader;
