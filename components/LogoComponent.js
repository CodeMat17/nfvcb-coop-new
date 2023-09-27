import Image from "next/image";


const LogoComponent = ({classnames}) => {
  return (
      <div className={`relative ${classnames} rounded-md overflow-hidden`}>
      <Image
        alt='logo'
        fill
        priority
        // objectFit='contain'
        src='/logo.png'
      />
    </div>
  );
}

export default LogoComponent