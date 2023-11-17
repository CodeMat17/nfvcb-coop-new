import Link from "next/link";
import SignOut from "./action-buttons/SignoutBtn";

const links = [
  // { href: "/", label: "HOME" },
  { href: "/coop-data", label: "PROFILE" },
  { href: "/payment", label: "REPAY LOAN" },
  { href: "/executives", label: "EXECUTIVES" },
];

const DesktopMenu = () => {
  return (
    <div className='hidden md:flex space-x-2'>
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className='transition-colors duration-500 ease-in-out bg-green-800 hover:bg-green-700 px-4 py-2 rounded-xl '>
          {link.label}
        </Link>
      ))}
      <SignOut classnames='relative w-10 h-10' />
    </div>
  );
};

export default DesktopMenu;
