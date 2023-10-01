import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

const MobileMenu = () => {
  return (
    <div>
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
              <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='px-1 py-1 '>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                        {active ? "pp" : "kk"}
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                        Duplicate
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className='px-1 py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                        {/* {active ? (
                      <ArchiveActiveIcon
                        className='mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                    ) : (
                      <ArchiveInactiveIcon
                        className='mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                    )} */}
                        Archive
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                        {/* {active ? (
                      <MoveActiveIcon
                        className='mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                    ) : (
                      <MoveInactiveIcon
                        className='mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                    )} */}
                        Move
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className='px-1 py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                        {/* {active ? (
                      <DeleteActiveIcon
                        className='mr-2 h-5 w-5 text-violet-400'
                        aria-hidden='true'
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className='mr-2 h-5 w-5 text-violet-400'
                        aria-hidden='true'
                      />
                    )} */}
                        Delete
                      </button>
                    )}
                  </Menu.Item>
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
