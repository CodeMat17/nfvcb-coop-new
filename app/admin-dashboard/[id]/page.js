// 'use client'

import { supabaseRole } from "@/app/utils/supabaseService";
import UpdateFinancialData from "@/components/UpdateFinancialData";
import { notFound } from "next/navigation";

export const revalidate = 0;

const UserDataPage = async ({ params: { id } }) => {
  const { data: profile } = await supabaseRole
    .from("profiles")
    .select(
      "id, username, station, ippis_no, phone_no, loans(joined_on, monthly_contribution, total_contributions)"
    )
    .match({ id })
    .single();

  if (!profile) {
    notFound;
  }

  return (
    <div className='px-4 py-12 min-h-screen'>
      <h1 className='text-3xl text-center font-medium text-purple-800'>
        Update Financial Data
      </h1>
      {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
      <UpdateFinancialData
        user_id={profile.id}
        user_name={profile.username}
        user_station={profile.station}
        user_ippis={profile.ippis_no}
        user_phone={profile.phone_no}
        user_monthly={profile.loans.monthly_contribution}
        user_total={profile.loans.total_contributions}
      />
    </div>
  );
};

export default UserDataPage;
