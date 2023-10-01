import OtherPayment from "@/components/OtherPayment";
import PaystackPage from "@/components/Paystack";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const PaymentPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, station , email, phone_no, loan_status, loans(applied_on, approved_by, amount)")
    .eq("id", session?.user?.id)
    .single();

  return (
    <div className='px-4 py-12 min-h-screen'>
      <h1 className='text-4xl text-[#D76F30] font-medium text-center'>
        LOAN REPAYMENT
      </h1>
      <p className='text-center'>
        A secured payment system, powered by{" "}
        <span className='font-semibold'> Paystack</span>.
      </p>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {data.loan_status === "inactive" && (
        <OtherPayment
          msg='You do not have a soft loan running at the moment.'
        />
      )}

      {data.loan_status === "processing" && <OtherPayment msg='Your soft loan application is yet to be approved. Kindly contact the admin.' />}

      {data.loan_status === "active" && (
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
      )}
    </div>
  );
};

export default PaymentPage;
