import { supabaseRole } from "@/app/utils/supabaseService";
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
          <h1 className="text-center text-xl font-medium">UPDATE CONTRIBUTIONS</h1>
      {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
          <div className="py-6 max-w-sm mx-auto">
              <p className="bg-gray-200 px-3 py-2.5 rounded-xl">Monthly Contribution: N{profile.monthly_contribution }</p>
     </div>
    </div>
  );
};

export default MemberData;
