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
    .select("id, username, email, phone_no, loans(amount)")
    .eq("id", session?.user?.id)
    .single();

  return (
    <div className='px-4 py-12 min-h-screen'>
      <h1 className='text-4xl text-[#D76F30] font-medium text-center'>
        LOAN REPAYMENT
      </h1>
      <p className='text-center'>
        A secured payment system. Powered by Paystack.
      </p>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <PaystackPage
        session={session}
        user_name={data.username}
        user_email={data.email}
        user_phone={data.phone_no}
        loan_amount={data.loans.amount}
      />
    </div>
  );
};

export default PaymentPage;