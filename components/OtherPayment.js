"use client";

import { useState } from "react";

const OtherPayment = () => {
  const [no_loan, setNoLoan] = useState(true);

  return (
    <div className='pt-8 max-w-sm mx-auto'>
      {no_loan ? (
        <div>
          <h1 className='text-center font-medium text-lg'>
            You do not have a soft loan running now.
          </h1>
          <p className='mt-12 text-center'>
            Do you want to make other payments?
          </p>
          <div className='mt-2 px-8 flex items-center justify-around gap-x-6'>
            <button className='w-full px-6 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-400'>
              No
            </button>
            <button
              onClick={() => setNoLoan(!no_loan)}
              className='w-full px-6 py-2.5 rounded-xl transition-colors duration-500 ease-in-out bg-[#D76F30] hover:bg-[#eb915a] text-white'>
              Yes
            </button>
          </div>
        </div>
      ) : (
        "Apply now ---- coming soon"
      )}
    </div>
  );
};

export default OtherPayment;
