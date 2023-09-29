"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";

const PaystackPage = ({
  session,
  user_name,
  user_email,
  user_phone,
  loan_amount,
}) => {
  const router = useRouter();
  const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PAYSTACK_KEY;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(user_name);
  const [email, setEmail] = useState(user_email);
  const [loanAmount, setLoanAmount] = useState(loan_amount);
    const [amount, setAmount] = useState(null);
  const [phone, setPhone] = useState(user_phone);
  const user = session?.user;

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  });

  const text = loanAmount;
  if (loanAmount) {
    const amount =
      parseFloat(text.replace(/,/g, "").replace(/[^0-9.-]+/g, "")) * 100;
  setAmount(amount)
  }

  const componentProps = {
    email,
    amount,
    metadata: { name, phone },
    publicKey,
    text: "Pay Now",
    onSuccess: () => alert("Your soft loan has been repaid successfully!!"),
    onClose: () =>
      alert("Wait! Are you sure you want to close this transaction?"),
  };

  return (
    <div className='pt-16 max-w-sm mx-auto'>
      <div className='flex flex-col space-y-3'>
        <p className='px-4 py-2 bg-gray-200 text-gray-500 rounded-xl'>
          Name: {name}
        </p>
        <p className='px-4 py-2 bg-gray-200 text-gray-500 rounded-xl'>
          Repayable Amount: {loanAmount}
        </p>
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
    </div>
  );
};

export default PaystackPage;
