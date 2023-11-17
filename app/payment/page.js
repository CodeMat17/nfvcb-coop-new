// import OtherPayment from "@/components/OtherPayment";
// import PaystackPage from "@/components/Paystack";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import Image from "next/image";
import { BsPersonVcard, BsPostcard } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa6";
import { PiBankBold } from "react-icons/pi";

const PaymentPage = async () => {
  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // const { data, error } = await supabase
  //   .from("profiles")
  //   .select(
  //     "id, username, station , email, phone_no, loan_status, loans(applied_on, approved_by, amount)"
  //   )
  //   .eq("id", session?.user?.id)
  //   .single();

  return (
    <div className='px-2 py-12 min-h-screen'>
      <h1 className='text-4xl text-[#D76F30] font-medium text-center'>
        LOAN REPAYMENT
      </h1>
      <p className='text-center'>Make repayment to the account details below</p>

      <div className='flex justify-center pt-12'>
        <div className='w-full max-w-sm aspect-video rounded-xl px-2 py-2.5 border bg-gradient-to-tr from-green-600 via-green-400 to-[#93552e] to-90% shadow-md'>
          <div className='flex flex-col items-center justify-center gap-'>
            <p className='whitespace-nowrap text-white uppercase drop-shadow-md'>
              Nfvcb Cooperative Soceity
            </p>
            <div className='flex items-center gap-2'>
              <div className='relative w-[21px] aspect-square'>
                <Image alt='zenith logo' fill priority src='/zenith-logo.png' />
              </div>
              <FaRegHandshake className='text-2xl text-[#D76F30]' />

              <div className='pl-4 relative w-[24px] aspect-square'>
                <Image alt='coop logo' fill priority src='/logo.png' />
              </div>
            </div>
          </div>

          <div className='flex flex-col items-cente mt-6 mb-2 gap-1'>
            <div className='flex items-center gap-2 bg-green-800/10 p-1.5 rounded-full'>
              <div className='rounded-full p-2 bg-green-800/20 text-green-800 shadow'>
                <PiBankBold className='text-xl' />
              </div>
              <p className='text-sm font-medium tracking-wide whitespace-nowrap text-gray-100 drop-shadow-md'>
                Zenith Bank Plc
              </p>
            </div>
            <div className='flex items-center gap-2 bg-green-800/10 p-1.5 rounded-full'>
              <div className='rounded-full p-2 bg-green-800/20 text-green-800 shadow'>
                <BsPostcard className='text-xl' />
              </div>
              <p className='text-sm font-medium tracking-wide whitespace-nowrap text-gray-100 drop-shadow-md'>
                Nat. Film and Video Censors Board ST.
              </p>
            </div>
            <div className='flex items-center gap-2 bg-green-800/10 p-1.5 rounded-full'>
              <div className='rounded-full p-2 bg-green-800/20 text-green-800 shadow'>
                <BsPersonVcard className='text-xl' />
              </div>
              <p className='text-sm font-medium tracking-wide whitespace-nowrap tracking-widest text-gray-100 drop-shadow-2xl'>
                122 9203 111
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* {data.loan_status === "inactive" && (
        <OtherPayment
          user_name={data?.username}
          user_email={data?.email}
          user_phone={data?.phone_no}
          msg='You do not have a soft loan running at the moment.'
        />
      )} */}

      {/* {data.loan_status === "processing" && (
        <OtherPayment
          user_name={data?.username}
          user_email={data?.email}
          user_phone={data?.phone_no}
          msg='Your soft loan application is yet to be approved. Kindly contact the admin.'
        />
      )} */}

      {/* {data.loan_status === "active" && (
        <PaystackPage
          session={session}
          user_id={data?.id}
          user_name={data?.username}
          user_station={data?.station}
          user_email={data?.email}
          user_phone={data?.phone_no}
          loan_applied_on={data?.loans.applied_on}
          loan_approved_by={data?.loans.approved_by}
          loan_amount={data?.loans.amount}
        />
      )} */}
    </div>
  );
};

export default PaymentPage;
