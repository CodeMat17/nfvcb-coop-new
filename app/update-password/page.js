// "use client";

import UpdatePasswordCard from "@/components/UpdatePasswordCard";
import { supabaseRole } from "../utils/supabaseService";

// import { useRouter } from "next/navigation";
// import { useCallback, useEffect, useState } from "react";

const UpdatePassword = async () => {
  const { data } = await supabaseRole
    .from("profiles")
    .select("id, email, ippis_no")
    .eq("email", "codemat.biz@gmail.com")
    .single();

  // .from("profiles")
  // .select("id, email")
  // .eq("email", "matthewnfvcb@gmail.com")
  // .single();

  // const router = useRouter();
  // const [loading, setLoading] = useState(false);
  // const [password, setPassword] = useState("");
  // const [ippis_no, setIPPISNo] = useState("");

  //   const updatePassword = async (e) => {
  //     e.preventDefault()
  //   if (password) {
  //     try {
  //       setLoading(true);

  //       const { error } = await supabase.auth.updateUser({  password });

  //       if (error) {
  //         alert(`Error: ${error.message}` );
  //       }
  //       if (!error) {
  //         alert("Password updated successfully");
  //         // router.refresh();
  //         router.push("/");
  //       }
  //     } catch (error) {
  //       console.log("ErrorMsg: ", error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     alert("Enter a new password.");
  //   }
  // };

  return (
    <div className='px-4 pt-20 pb-64'>
      <p className='text-center text-xl font-medium'>Update Your Password</p>
      {/* <p>ID: {data.id}</p> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div
        // onSubmit={updatePassword}
        className='mt-12 text-sm max-w-md mx-auto'>
        <UpdatePasswordCard />
    

        <div className='pt-6'>
          <button
            // disabled={loading}
            type='submit'
            // onClick={updatePassword}
            className='w-full py-2.5 bg-green-600 text-white rounded-xl'>
            {/* {loading ? "updating..." : "Update"} */}
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
