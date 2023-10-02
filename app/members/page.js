import MemberCard from "@/components/MemberCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { supabaseRole } from "../utils/supabaseService";
import {FaClipboardUser} from 'react-icons/fa6'
import Link from "next/link";

export const revalidate = 0;

const MembersPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: admin, error } = await supabase
    .from("profiles")
    .select(" is_admin")
    .eq("id", session?.user?.id)
    .single();

  const { data: allMembers, error: error2 } = await supabaseRole
    .from("profiles")
    .select("id, username, station")
    .order("username", { ascending: true });

  return (
    <div className='px-4 py-12 min-h-screen'>
      <p className='text-center text-3xl font-medium text-[#D76F30]'>
        UPDATE MEMBERS DATA
      </p>
      {/* <pre>{JSON.stringify(allMembers, null, 2)}</pre> */}

      {admin.is_admin ? (
        <div className='pt-10 flex flex-col space-y-3 w-full max-w-md mx-auto'>
          {allMembers &&
            allMembers.map((all) => (
              <Link href={`/members/${all.id}`} key={all.id}>
                <div className='border p-4 rounded-xl shadow-sm space-x-2 '>
                  {/* <div>
                    <FaClipboardUser className='text-4xl' />
                  </div> */}
                  <div>
                    <h1 className="truncate text-xl font-medium">{all.username}</h1>
                    <p className="text-gray-500">{all.station}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <div className='pt-20 text-center'>You are not an ADMIN!</div>
      )}
    </div>
  );
};

export default MembersPage;
