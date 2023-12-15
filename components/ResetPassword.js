"use client";

import { Dialog, Transition } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const ResetPassword = () => {
  const supabase = createClientComponentClient();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (email.match(patternReg)) {
      try {
        setLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${location.origin}/auth/reset`,
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          alert("Password reset email sent. Check your email account.");
          closeModal();
        }
      } catch (error) {
        console.log("ErrorMsg: ", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMsg("Enter a valid email address.");
    }
  };
  const patternReg = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$";

  return (
    <>
      <button onClick={openModal} className='font-medium'>
        Click here
      </button>

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
                    Forgot your password?
                  </Dialog.Title>

                  {errorMsg && (
                    <p className='text-red-600 bg-red-100 px-4 py-1 mt-4 rounded-xl text-center'>
                      {errorMsg}
                    </p>
                  )}
                  <form onSubmit={resetPassword} className='mt-6 w-full'>
                    <div className=''>
                      <label className=''>Enter email:</label>
                      <input
                        type='email'
                        value={email}
                        pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
                        placeholder='Enter your emaill address.'
                        onChange={(e) => setEmail(e.target.value)}
                        className='peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 placeholder:italic placeholder:text-slate-400 block bg-gray-100 w-full border border-white rounded-full py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                      />
                      <span className='hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
                        Please enter a valid email address
                      </span>
                    </div>

                    <div className='pt-8 flex items-center justify-between'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-xl border border-transparent bg-red-100 px-5 py-3 tracking-wider font-medium text-red-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={closeModal}>
                        Close
                      </button>

                      <button
                        type='submit'
                        disabled={loading}
                        className='inline-flex justify-center rounded-xl border border-transparent bg-blue-100 px-5 py-3 tracking-wider font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
                        {loading ? "Reseting..." : "Reset"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ResetPassword;
