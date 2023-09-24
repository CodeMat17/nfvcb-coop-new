"use client";

import { Dialog, Listbox, Transition } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Toaster } from "react-hot-toast";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import {BiCheck} from 'react-icons/bi'

export const revalidate = 0;

const LoanModal = () => {
  const supabase = createClientComponentClient();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const amount = [
    { name: "₦10,000" },
    { name: "₦15,000" },
    { name: "₦20,000" },
    { name: "₦25,000" },
    { name: "₦30,000" },
    { name: "₦35,000" },
    { name: "₦40,000" },
    { name: "₦45,000" },
    { name: "₦50,000" },
  ];

  const [id, setID] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(amount[0]);

  return (
    <>
      <Toaster />
      <div className='w-full'>
        {/* <button
          onClick={openModal}
          className='text-2xl text-purple-800 bg-purple-100 rounded-full shadow-sm border p-2'>
          <TbEdit />
        </button> */}
        <button
          onClick={openModal}
          className='transition-colors duration-500 bg-purple-500 hover:bg-purple-600 text-white w-full p-3 shadow-md rounded-xl'>
          Apply
        </button>
        {/* <button className='w-full p-3 transition-colors duration-500 bg-purple-800 hover:bg-purple-700 rounded-xl text-white'>
          APPLY FOR SOFT LOAN
        </button> */}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-40' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto z-50'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-[350px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-2xl text-center font-medium leading-6 text-gray-900'>
                    Enter loan details
                  </Dialog.Title>

                  {errorMsg && (
                    <p className='text-red-600 bg-red-100 px-4 py-1 mt-4 rounded-xl text-center'>
                      {errorMsg}
                    </p>
                  )}
                  <div className='mt-6 w-full space-y-2'>
                    <Listbox
                      value={selectedAmount}
                      onChange={setSelectedAmount}>
                      <Listbox.Button className='relative w-full cursor-default rounded-xl bg-gray-100 pl-3 py-2 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                        <span className='block truncate'>
                          {selectedAmount.name}
                        </span>
                        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                          <HiMiniChevronUpDown
                            className='h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'>
                        <Listbox.Options className='absolute mt-1 max-h-screen w-3/4 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                          {amount.map((amnt, i) => (
                            <Listbox.Option
                              key={i}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-amber-100 text-amber-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={amnt}>
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}>
                                    {amnt.name}
                                  </span>
                                  {selected ? (
                                    <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                      <BiCheck
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                    <div className=''>
                      <label className=''>Username:</label>
                      <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='capitalize text-gray-500 bg-gray-100 shadow-md w-full px-3 py-2 rounded-xl'
                      />
                    </div>

                    <div className='pt-4 flex items-center justify-between'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-xl border border-transparent bg-red-100 px-5 py-3 tracking-wider font-medium text-red-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={closeModal}>
                        Close
                      </button>

                      <button
                        type='button'
                        className='inline-flex justify-center rounded-xl border border-transparent bg-blue-100 px-5 py-3 tracking-wider font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        //   onClick={updateAbsenteeism}
                      >
                        {loading ? "Updating..." : "Update"}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LoanModal;
