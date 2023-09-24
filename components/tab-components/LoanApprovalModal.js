"user client";

import { supabaseRole } from "@/app/utils/supabaseService";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const LoanApprovalModal = ({ admin_name, loan_name, loan_amount, loan_id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(admin_name);
  const [id, setID] = useState(loan_id);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const approveLoan = async () => {
    try {
      setLoading(true);
      const { error: error1 } = await supabaseRole
        .from("loans")
        .update({ approved_on: new Date(), approved_by: admin })
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
        const { data: data2, error: error2 } = await supabaseRole
          .from("profiles")
          .update({ loan_status: "active" })
          .eq("id", id);

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
          toast.success(`You have successfully approved the loan request.`, {
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
          className='text-sm w-full tracking-wider px-4 py-2 rounded-xl bg-green-200 text-green-600'>
          APPROVE
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
                    className='text-lg tracking-wider font-medium leading-6 text-purple-800'>
                    Loan Approval!
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Are you sure you want to approve a soft loan of{" "}
                      <span className='text-purple-600'>{loan_amount}</span> for
                      <span className='text-purple-600'> {loan_name}</span>?
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
                      onClick={approveLoan}
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
                      {loading ? "Approving..." : "Approve"}
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

export default LoanApprovalModal;
