import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

const links = [
  { href: "/", label: "HOME" },
  { href: "/coop-data", label: "PROFILE" },
  { href: "/payment", label: "REPAY LOAN" },
  { href: "/executives", label: "EXECUTIVES" },
];

const MobileMenu = () => {
  return (
    <div className="md:hidden">
      {" "}
      <Menu as='div' className='relative inline-block text-left'>
        {({ open }) => (
          <>
            <Menu.Button
              aria-label='toggle mobile menu'
              className={`text-4xl transition transform duration-500 inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 p-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
                open ? "rotate-[360deg] text-red-700" : "text-[#D76F30]"
              }`}>
              {open ? (
                <MdOutlineClose
                  aria-hidden='true'
                  aria-label='mobile close button'
                />
              ) : (
                <BiMenuAltRight
                  aria-hidden='true'
                  aria-label='mobile menu button'
                />
              )}
            </Menu.Button>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'>
              <Menu.Items className='absolute right-0 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='px-1 py-1 space-y-2'>
                  {links.map((link) => (
                    <Menu.Item key={link.href} as={Fragment}>
                      {({ active }) => (
                        <a
                          href={link.href}
                          className={`flex px-4 py-3 rounded-xl ${
                            active
                              ? "bg-green-500 text-white"
                              : "bg-white text-black"
                          }`}>
                          {" "}
                          {link.label}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                  <form action='/auth/signout' method='post'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type='submit'
                          className={`text-red-600 flex w-full justify-center px-4 py-3 rounded-xl ${
                            active ? "bg-red-600 text-white" : "bg-red-50 "
                          }`}>
                          SIGN OUT
                        </button>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default MobileMenu;
