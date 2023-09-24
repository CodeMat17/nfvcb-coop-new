import Link from "next/link";
import LogoComponent from "./LogoComponent";

const Footer = () => {
  return (
    <div className='px-4 py-6 bg-purple-950'>
      <div className='max-w-5xl mx-auto'>
        <div className='flex items-center leading-4 gap-x-2'>
          <div>
            <LogoComponent classnames='w-16 h-16' />
          </div>
          <p className='text-white'>
            NFVCB Staff Multipurpose Co-operative Society Ltd
          </p>
        </div>
        <div className='pt-6 text-center'>
          <p className='text-white/60'>
            Copyright &copy; 2023 NSMCS. All rights reserved.
          </p>
          <p className='text-sm text-purple-600'>
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
