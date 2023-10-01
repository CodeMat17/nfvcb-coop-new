"user client";

import { supabaseRole } from "@/app/utils/supabaseService";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ClearApprovedLoanModal = ({
  admin_name,
  user_id,
  user_name,
  user_station,
  applied,
  approved,
  loan_amount,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(admin_name);
  const [id, setID] = useState(user_id);
  const [username, setUsername] = useState(user_name);
  const [station, setStation] = useState(user_station);
  const [applied_on, setApplied] = useState(applied);
  const [approved_by, setApproved] = useState(approved);
  const [amount, setAmount] = useState(loan_amount);

  
    
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const clearLoan = async () => {
    try {
      setLoading(true);
      const { error: error1 } = await supabaseRole
        .from("profiles")
        .update({ loan_status: "inactive" })
        .eq("id", id);

      if (error1) {
        toast.error(error1.message, {
          duration: 5000,
          position: "top-center",
          // Styling
          style: {},
          className: "",
        });
      }

      if (!error1) {
        const { error: error2 } = await supabaseRole
          .from("cleared")
          .insert([
            {
              username,
              station,
              applied_on,
              approved_by, amount,
              cleared_on: new Date(),
              cleared_by: admin,
            },
          ])
          .select();

        if (error2) {
          toast.error(error2.message, {
            duration: 5000,
            position: "top-center",
            // Styling
            style: {},
            className: "",
          });
        }

        if (!error2) {
          toast.success(`You have successfully cleared the repaid loan.`, {
            duration: 5000,
            position: "top-center",
            // Styling
            style: {},
            className: "",
          });
          router.refresh();
          setIsOpen(false);
        }
      }
    } catch (error) {
      console.log("Error Msg: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Toaster />
        <button
          type='button'
          onClick={openModal}
          className='text-sm w-full tracking-wider px-4 py-2 rounded-xl bg-green-300 font-medium text-green-800'>
          CLEAR REPAID LOAN
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
                    className='text-lg tracking-wider font-medium leading-6 text-green-800'>
                    Clear Repaid Loan!
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Are you sure that{" "}
                      <span className='text-green-600'> {username}</span> has
                      repaid this loan of{" "}
                      <span className='text-green-600'>{amount}</span> and you
                      want to clear it?
                    </p>
                  </div>

                  <div className='mt-4 flex justify-between'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}>
                      Go back
                    </button>
                    <button
                      onClick={clearLoan}
                      className='inline-flex justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
                      {loading ? "Clearing..." : "Clear"}
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

export default ClearApprovedLoanModal;
