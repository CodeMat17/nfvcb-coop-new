import Link from "next/link";
import LogoComponent from "./LogoComponent";

const Footer = () => {
  return (
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
        <div className='pt-12 text-center'>
          <p className='text-white/80'>
            Copyright &copy; 2023 NSMCS. All rights reserved.
          </p>
          <p className='text-xs mt-1 text-gray-400'>
            This application was designed and developed by{" "}
            <Link
              href='https://matthewchukwu.com.ng'
              target='_blank'
              className='text-blue-500 transition-colors duration-500 ease-in-out hover:text-white'>
              codeMat
            </Link>
            . For business talk, click{" "}
            <a
              href='https://wa.me/2348063856120' target="_blank"
              className='text-blue-500 transition-colors duration-500 ease-in-out hover:text-white'>
              here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
