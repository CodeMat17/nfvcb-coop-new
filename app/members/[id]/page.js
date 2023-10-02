import { supabaseRole } from "@/app/utils/supabaseService";
import FormatedCurrency from "@/components/FormatedCurrency";
import UpdateContributions from "@/components/UpdateContributions";
import { notFound } from "next/navigation";

export const revalidate = 0;

const MemberData = async ({ params: { id } }) => {
  const { data: profile } = await supabaseRole
    .from("loans")
    .select("id, monthly_contribution, total_contributions)")
    .match({ id })
    .single();

  if (!profile) {
    notFound;
  }

  return (
    <div className='px-4 py-12 min-h-screen'>
      <h1 className='text-center text-xl font-medium'>UPDATE CONTRIBUTIONS</h1>
      {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
      <div className='py-12 max-w-sm mx-auto flex flex-col space-y-3'>
        <div className='flex gap-x-2 bg-gray-200 px-3 py-2.5 rounded-xl'>
          <p>Monthly Contribution: </p>
          <FormatedCurrency
            amount={profile.monthly_contribution}
            classnames=''
          />
        </div>

        <div className='flex gap-x-2 bg-gray-200 px-3 py-2.5 rounded-xl'>
          <p>Total Contributions: </p>
          <FormatedCurrency
            amount={profile.total_contributions}
            classnames=''
          />
        </div>

        <div className='pt-3'>
          <UpdateContributions
            user_id={profile.id}
            monthly={profile.monthly_contribution}
            total={profile.total_contributions}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberData;
