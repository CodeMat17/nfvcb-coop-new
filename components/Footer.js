import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import Link from "next/link";
import { AiFillProfile } from "react-icons/ai";
import { MdContactPage } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import LogoComponent from "./LogoComponent";
import { BiSolidHomeSmile } from "react-icons/bi";

const Footer = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      {session && (
        <div className='px-4 py-6 bg-gray-950'>
          <div className='max-w-5xl mx-auto'>
            <div className='flex items-center leading-5 gap-x-2'>
              <div>
                <LogoComponent classnames='w-14 h-14 md:w-16 md:h-16' />
              </div>
              <p className='text-white uppercase'>
                NFVCB Staff Multipurpose Co-operative Society Ltd
              </p>
            </div>
            <div className='py-12 flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-8 '>
              {/* <div className='w-[134px] group'>
                <Link href='/' className=' flex items-center'>
                  <BiSolidHomeSmile className='text-[#D76F30] text-2xl transition-colors duration-500 ease-in-out group-hover:text-white' />
                  <p className='mt-1 ml-1 text-gray-400 transition-colors duration-500 ease-in-out group-hover:text-white'>
                    Home
                  </p>
                </Link>
              </div> */}

              <div className=' w-[134px] sm:w-auto group'>
                <Link href='/coop-data' className=' flex items-center'>
                  <AiFillProfile className='text-[#D76F30] text-[23px] transition-colors duration-500 ease-in-out group-hover:text-white' />
                  <p className='mt-1 ml-1 text-gray-400 transition-colors duration-500 ease-in-out group-hover:text-white'>
                    Profile
                  </p>
                </Link>
              </div>

              <div className=' w-[134px] sm:w-auto group'>
                <Link href='/payment' className=' flex items-center'>
                  <RiSecurePaymentFill className='text-[#D76F30] text-[26px] transition-colors duration-500 ease-in-out group-hover:text-white' />
                  <p className='mt-1 ml-1 whitespace-nowrap text-gray-400 transition-colors duration-500 ease-in-out group-hover:text-white'>
                    Repay Loan
                  </p>
                </Link>
              </div>

              <div className=' w-[134px] sm:w-auto group'>
                <Link href='/executives' className=' flex items-center'>
                  <MdContactPage className='text-[#D76F30] text-2xl transition-colors duration-500 ease-in-out group-hover:text-white' />
                  <p className='mt-1 ml-1 text-gray-400 transition-colors duration-500 ease-in-out group-hover:text-white'>
                    Executives
                  </p>
                </Link>
              </div>
            </div>
            <div className=' text-center'>
              <p className='text-xs text-gray-400'>
                This application was designed and developed by{" "}
                <Link
                  href='https://matthewchukwu.com.ng'
                  target='_blank'
                  className='text-blue-500 transition-colors duration-500 ease-in-out hover:text-white'>
                  codeMat
                </Link>
                . For business talk, click{" "}
                <a
                  href='https://wa.me/2348063856120'
                  target='_blank'
                  className='text-blue-500 transition-colors duration-500 ease-in-out hover:text-white'>
                  here
                </a>
                .
              </p>

              <p className='text-white/80 mt-4'>
                Copyright &copy; 2023 NSMCS. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
