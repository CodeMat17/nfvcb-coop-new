"use client";

import { supabaseRole } from "@/app/utils/supabaseService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { PaystackButton } from "react-paystack";

const PaystackPage = ({
  session,
  user_id,
  user_name,
  user_station,
  user_email,
  user_phone,
  loan_applied_on,
  loan_approved_by,
  loan_amount,
}) => {
  const router = useRouter();
  const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PAYSTACK_KEY;
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState(user_id);
  const [name, setName] = useState(user_name);
  const [station, setStation] = useState(user_station);
  const [email, setEmail] = useState(user_email);
  const [applied_on, setApplied] = useState(loan_applied_on);
  const [approved_by, setApproved] = useState(loan_approved_by);
  const [loanAmount, setLoanAmount] = useState(loan_amount);
  const [phone, setPhone] = useState(user_phone);
  const user = session?.user;

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  });

  // const getUserProfile = useCallback(async () => {
  //   try {
  //     let { data, error, status } = await supabase
  //       .from("profiles")
  //       .select(`station, website, avatar_url`)
  //       .eq("id", user?.id)
  //       .single();

  //   } catch (error) {

  //   }
  // })

  const text = loanAmount;
  const amount =
    parseFloat(text?.replace(/,/g, "").replace(/[^0-9.-]+/g, "")) * 100;

  const text2 = amount / 100;
  const symbol = "NGN";
  // ₦
  const formattedAmount = text2?.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN'
  });

  const paystackAmount = formattedAmount?.replace(/\.00$/, "");

  
  // console.log('payformated: ', paystackAmount);
  
  const clearLoan = async (ref) => {
    alert("Your soft loan has been repaid successfully!!");
    try {
      setLoading(true);
      const { error: error1 } = await supabaseRole
        .from("profiles")
        .update({ loan_status: "inactive" })
        .eq("id", id);

      if (!error1) {
        const { error: error2 } = await supabaseRole.from("cleared").insert([
          {
            username: name,
            station,
            applied_on,
            approved_by,
            amount: paystackAmount,
            cleared_on: new Date(),
            cleared_by: "PAYSTACK",
          },
        ]);

        if (!error2) {
          const { error: error3 } = await supabaseRole
            .from("loans")
            .update({
              amount: null,
              status: false,
              applied_on: null,
              approved_on: null,
              approved_by: null,
            })
            .eq("id", id)
            .select();

          if (error3) {
            toast.error(error3.message, {
              duration: 5000,
              position: "top-center",
              // Styling
              style: {},
              className: "",
            });
          }

          toast.success(`Your active loan status has been deactivated.`, {
            duration: 5000,
            position: "top-center",
            // Styling
            style: {},
            className: "",
          });
          router.refresh();
          router.push("/coop-data");
          setIsOpen(false);
         
        }
      }
    } catch (error) {
      console.log("Error Msg: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const componentProps = {
    email,
    amount,
    metadata: { name, phone },
    publicKey,
    text: "Pay Now",
    onSuccess: (ref) => clearLoan(ref),
    onClose: () =>
      alert("Wait! Are you sure you want to close this transaction?"),
  };

  if (loading) {
    return (
      <div className=' pt-20 flex flex-col items-center space-y-3'>
        <AiOutlineLoading className='text-[#D76F30] text-3xl font-semibold animate-spin' />
        <p className='text-[#D76F30]'>Please wait</p>
      </div>
    );
  }

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
