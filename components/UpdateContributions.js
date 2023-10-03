"use client";

import { supabaseRole } from "@/app/utils/supabaseService";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UpdateContributions = ({ user_id, monthly, total }) => {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [id, setID] = useState(user_id);
  const [monthly_contribution, setMonthly] = useState(monthly);
  const [total_contributions, setTotal] = useState(total);
  const [loading, setLoading] = useState(false);

  const updateContributions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseRole
        .from("loans")
        .update({
          monthly_contribution,
          total_contributions,
          as_at: new Date(),
        })
        .eq("id", id);

      if (error) {
        toast.error(error.message, {
          duration: 5000,
          position: "top-center",
          // Styling
          style: {},
          className: "",
        });
      }

      if (!error) {
        toast.success("Updated Successfully", {
          duration: 5000,
          position: "top-center",
          // Styling
          style: {},
          className: "",
        });
        router.refresh();
        setIsOpen(false);
      }
    } catch (error) {
      console.log("Error Msg: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />

      <div>
        <button
          type='button'
          onClick={openModal}
          className='bg-green-800 text-white w-full py-2.5 rounded-xl tracking-wide '>
          UPDATE
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
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

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'>
                    Update Contributions
                  </Dialog.Title>
                  <div className='mt-2 flex flex-col space-y-3'>
                    <div className='relative'>
                      <label className='text-sm'>Monthly Contribution:</label>
                      <input
                        type='number'
                        name='number'
                        value={monthly_contribution}
                        onChange={(e) => setMonthly(e.target.value)}
                        className='pl-8 pr-3 py-2 bg-gray-100 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-xl focus:ring-1'
                      />
                      <p className='absolute top-8 left-3 font-medium text-green-800'>
                        ₦
                      </p>
                    </div>

                    <div className='relative'>
                      <label className='text-sm'>Total Contributions:</label>
                      <input
                        type='number'
                        name='number'
                        value={total_contributions}
                        onChange={(e) => setTotal(e.target.value)}
                        className='pl-8 pr-3 py-2 bg-gray-100 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-xl focus:ring-1'
                      />
                      <p className='absolute top-8 left-3 font-medium text-green-800'>
                        ₦
                      </p>
                    </div>
                  </div>

                  <div className='mt-6 flex items-center justify-between'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-xl border border-transparent bg-gray-100 px-6 py-2.5 font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}>
                      Close
                    </button>

                    <button
                      type='button'
                      className='inline-flex justify-center rounded-xl border border-transparent bg-green-100 px-6 py-2.5 font-medium text-green-800 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={updateContributions}>
                      {loading ? "Updating..." : "Update"}
                    </button>
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

export default UpdateContributions;
