"use client";

import LoanCard from "@/components/LoanCard";
import { Switch } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SoftLoan = () => {
  const router = useRouter();

  const [enabled, setEnabled] = useState(false);
  const [loanCard, setLoanCard] = useState(false);

  return (
    <div className='px-4 py-12 min-h-screen'>
      {loanCard ? (
        <LoanCard />
      ) : (
        <div>
          <h1 className='text-red-600 text-2xl text-center'>
            OUR TERMS AND CONDITIONS FOR SOFT LOANS.
          </h1>

          <div className='pt-6 flex flex-col justify-center max-w-lg mx-auto px-4'>
            <ul className='antialiased space-y-3 list-disc list-outside'>
              <li className='leading-5'>
                5% of loan amount will be deducted from source as commission.
              </li>
              <li className='leading-5'>
                Loan payback duration is 3 mount starting from the date of
                approval.
              </li>
              <li className='leading-5'>
                Defaulters will have the loan amount taken from their salary of
                the subsequent month.
              </li>
            </ul>

            <div className='py-8 flex flex-col items-center'>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`transition-colors duration-500 ease-in-out ${enabled ? "bg-[#D76F30]" : "bg-[#dcb095]"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                <span className='sr-only'>Use setting</span>
                <span
                  aria-hidden='true'
                  className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <p className={`py-2  w-full text-center ${enabled ? "text-[#D76F30]" : ""}`}>
                {enabled ? "I accept" : "Tap the button to accept T&C"}
              </p>
            </div>

            <div className='flex items-center justify-around space-x-6 sm:space-x-12 md:space-x-20'>
              {enabled ? (
                <button
                  onClick={() => setLoanCard(!loanCard)}
                  className='tracking-wider transition-colors duration-500 ease-in-out bg-[#D76F30] hover:bg-[#96420e] text-white w-full sm:w-1/2 p-3 shadow-md rounded-xl'>
                  Apply
                </button>
              ) : (
                <button
                  onClick={() => router.back()}
                  className='tracking-wider transition-colors duration-500 ease-in-out bg-red-100 text-red-600 hover:bg-red-200 w-full sm:w-1/2 p-3 border shadow-md rounded-xl'>
                  Discontinue
                </button>
              )}

              {/* <LoanModal /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftLoan;
