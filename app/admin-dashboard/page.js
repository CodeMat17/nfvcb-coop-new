import TabsComponent from "@/components/tab-components/Tabs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import toast, { Toaster } from "react-hot-toast";
import { TbUserEdit } from "react-icons/tb";
import { supabaseRole } from "../utils/supabaseService";
import Link from "next/link";

export const revalidate = 0;

const AdminDashboard = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();



  const { data: profile, error: error1 } = await supabase
    .from("profiles")
    .select("username, is_admin")
    .eq("id", session?.user?.id)
    .single();

  if (error1) {
    toast.error(`${error1.message}`, {
      duration: 5000,
      position: "top-center",
      // Styling
      style: {},
      className: "",
    });
  }

  const { data: unconfirmed, error: error2 } = await supabaseRole
    .from("profiles")
    .select("id, avatar, username, station, ippis_no, confirmed, phone_no")
    .eq("confirmed", false);

  if (error2) {
    toast.error(`${error2.message}`, {
      duration: 5000,
      position: "top-center",
      // Styling
      style: {},
      className: "",
    });
  }

  const { data: loans, error: error3 } = await supabaseRole
    .from("profiles")
    .select("id, username, station, phone_no, loans(amount)")
    .eq("loan_status", "processing");

  if (error3) {
    toast.error(`${error3.message}`, {
      duration: 5000,
      position: "top-center",
      // Styling
      style: {},
      className: "",
    });
  }

  const { data: approved, error: error4 } = await supabaseRole
    .from("profiles")
    .select("id, username, station, loans(amount, applied_on, approved_by)")
    .eq("loan_status", "active");

  if (error4) {
    toast.error(`${error4.message}`, {
      duration: 5000,
      position: "top-center",
      // Styling
      style: {},
      className: "",
    });
  }

  return (
    <div className='px-4 py-12 min-h-screen'>
      <Toaster />
      <h1 className='text-3xl font-medium text-center text-[#D76F30]'>
        Admin Dashboard
      </h1>
      {/* <pre>{JSON.stringify(allUsers, null, 2)}</pre> */}
      <div className='flex justify-center pt-3'>
        <Link href='/members' className='transition-colors duration-500 ease-in-out bg-green-800 hover:bg-white text-white hover:text-green-800 p-2 rounded-full shadow-md shadow-orange-800'>
          <TbUserEdit className='text-4xl font-bold ' />
        </Link>
      </div>
      {profile && profile.is_admin ? (
        <div>
          <TabsComponent
            unconfirmed={unconfirmed}
            admin_name={profile.username}
            loans={loans}
            approved={approved}
          />
        </div>
      ) : (
        <div className='px-4 py-20 min-h-screen max-w-sm mx-auto'>
          <h1 className='text-xl font-medium text-center'>
            Exit, you are not an admin.
          </h1>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
