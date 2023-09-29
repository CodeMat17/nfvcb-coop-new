"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { PaystackButton } from "react-paystack";

const OtherPayment = () => {
  const [no_loan, setNoLoan] = useState(true);
  const router = useRouter();

  const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PAYSTACK_KEY;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loanAmount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false)

  const text = loanAmount;
  const amount =
    parseFloat(text.replace(/,/g, "").replace(/[^0-9.-]+/g, "")) * 100;

  const handleSuccessAction = (ref) => {
    alert("Payment received. Send payment details to the coop. Fin. Sec. or the President.")
    setLoading(true)
    router.push('/coop-data')
     setLoading(false);
  }
  
  const componentProps = {
    email,
    amount,
    metadata: { name, phone },
    publicKey,
    text: "Pay Now",
    onSuccess: (ref) => handleSuccessAction(ref),
    onClose: () =>
      alert("Wait! Are you sure you want to close this transaction?"),
  };

  if (loading) {
    return (
      <div className='min-h-screen py-20 flex flex-col items-center'>
        <AiOutlineLoading className='text-4xl font-semibold text-[#D76F30] animate-spin' />
        <p className='mt-2 text-[#D76F30]'>Please wait</p>
      </div>
    );
  }

  return (
    <div className='pt-12 max-w-sm mx-auto'>
      {no_loan ? (
        <div>
          <h1 className='text-center font-medium text-lg'>
            You do not have a soft loan running now.
          </h1>
          <p className='mt-12 text-center'>
            Do you want to make other payments?
          </p>
          <div className='mt-2 px-8 flex items-center justify-around gap-x-6'>
            <button
              onClick={() => router.back()}
              className='w-full px-6 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-400 font-medium'>
              No
            </button>
            <button
              onClick={() => setNoLoan(!no_loan)}
              className='w-full px-6 py-2.5 rounded-xl transition-colors duration-500 ease-in-out bg-[#D76F30] hover:bg-[#eb915a] font-medium text-white'>
              Yes
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className='text-center font-medium text-xl'>Other Payments.</h1>
          <div className='flex flex-col space-y-2 mt-3'>
            <div className='flex flex-col'>
              <label className='text-sm'>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='px-3 py-2 bg-gray-200 rounded-xl'
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-sm'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='px-3 py-2 bg-gray-200 rounded-xl'
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-sm'>Phone</label>
              <input
                type='tel'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='px-3 py-2 bg-gray-200 rounded-xl'
              />
            </div>
            <div className='relative flex flex-col'>
              <label className='text-sm'>Amount</label>
              <input
                type='number'
                value={loanAmount}
                onChange={(e) => setAmount(e.target.value)}
                className='px-8 py-2 bg-gray-200 rounded-xl'
              />
              <p className='absolute top-7 left-3 font-semibold'>₦</p>
            </div>

            <div className='pt-3'>
              <div className='relative '>
                <PaystackButton
                  {...componentProps}
                  className='w-full bg-[#D76F30] text-white font-medium px-6 py-2.5 rounded-xl'
                />
                <div className='absolute top-3 left-6'>
                  <div className='relative w-[20px] h-[20px]'>
                    <Image
                      alt='paystack logo'
                      fill
                      priority
                      src='/paystack-logo.png'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OtherPayment;
