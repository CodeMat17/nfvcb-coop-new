"use client";

import { Listbox, Transition } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { HiMiniChevronUpDown } from "react-icons/hi2";

export const revalidate = 0;

const loanAmount = [
  { amount: "₦10,000" },
  { amount: "₦15,000" },
  { amount: "₦20,000" },
  { amount: "₦25,000" },
  { amount: "₦30,000" },
  { amount: "₦35,000" },
  { amount: "₦40,000" },
  { amount: "₦45,000" },
  { amount: "₦50,000" },
];

const LoanCard = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [id, setID] = useState(null);

  const [selected, setSelected] = useState(loanAmount[0]);
  const [ippis_no, setIPPISNo] = useState("");
  const [ippis, setIPPIS] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      let { data, error, status } = await supabase
        .from("profiles")
        .select("id, ippis_no")
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setID(data.id);
        setIPPISNo(data.ippis_no);
      }
    } catch (error) {
      console.log("Error loading user data!", error.message);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);


  const loanApplication = async () => {
    setErrorMsg(false);
    if (ippis_no === ippis) {
      try {
        setWaiting(true);
        const { data, error: error1 } = await supabase
          .from("loans")
          .update({
            amount: selected.amount,
            status: true,
            applied_on: new Date(),
          })
          .eq("id", id);

        if (error1) {
          throw error1;
        }

        const { data: data2, error: error2 } = await supabase
          .from("profiles")
          .update({
            loan_status: "processing",
          })
          .eq("id", id)
          .select();

        if (error2) {
          throw error2;
        }

        if (data2) {
          toast.success(`Loan application sent successfully`, {
            duration: 5000,
            position: "top-center",
            // Styling
            style: {},
            className: "",
          });

          router.refresh();
          router.back();
        }
      } catch (error) {
        console.log("Something went wrong!: ", error.message);
      } finally {
        setWaiting(false);
      }
    } else {
      setErrorMsg(true);
    }
  };

  if (loading) {
    return (
      <div className='py-24 min-h-screen flex flex-col items-center space-y-4 text-[#D76F30]'>
        <AiOutlineLoading className='text-3xl font-bold text-[#D76F30] animate-spin' />
        <p>Please wait</p>
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      <h1 className='text-center text-2xl text-[#D76F30]'>
        Enter loan details
      </h1>
      {errorMsg && (
        <p className='text-red-500 text-sm text-center mt-3'>
          You entered an incorrect IPPIP no.
        </p>
      )}
      <div className='py-6 max-w-sm mx-auto space-y-4'>
        <div>
          <label className='text-sm'>Amount</label>
          <Listbox value={selected} onChange={setSelected}>
            <div className='relative mt-1'>
              <Listbox.Button className='relative w-full cursor-default rounded-xl bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                <span className='block truncate'>{selected.amount}</span>
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
                <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {loanAmount.map((amount, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={amount}>
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}>
                            {amount.amount}
                          </span>
                          {selected ? (
                            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                              <BiCheck className='h-5 w-5' aria-hidden='true' />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div>
          <label className='text-sm'>IPPIS no.</label>
          <input
            type='text'
            maxLength='6'
            value={ippis}
            onChange={(e) => setIPPIS(e.target.value)}
            placeholder='Enter your IPPIS no'
            className='w-full tracking-widest px-3 py-2 shadow-md bg-white rounded-xl'
          />
        </div>

        <div className='py-4'>
          <button
            onClick={loanApplication}
            className='w-full bg-[#fee8da] text-[#D76F30] py-3 rounded-xl disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500'
            disabled={ippis.length < 6}>
            {waiting ? (
              <div className='flex items-center justify-center space-x-3'>
                <AiOutlineLoading className='animate-spin font-medium text-2xl' />
                <span>Please wait</span>
              </div>
            ) : (
              "Submit Application"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
