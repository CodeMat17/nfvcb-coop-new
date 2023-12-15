"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UpdatePassword = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

    const updatePassword = async (e) => {
      e.preventDefault()
    if (password) {
      try {
        setLoading(true);

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
          alert("Error: ", error.message);
        }
        if (!error) {
          alert("Password updated successfully");
          router.refresh();
          router.push("/");
        }
      } catch (error) {
        console.log("ErrorMsg: ", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Enter a new password.");
    }
  };

  return (
    <div className='px-4 pt-20 pb-64'>
      <p className='text-center text-xl font-medium'>Update Your Password</p>

      <form onSubmit={updatePassword} className='mt-28'>
        <div className='text-sm max-w-md mx-auto'>
          <label>New password</label>
          <input
            type='text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter a new password'
            className='w-full mt-1 px-3 py-2.5 focus:outline-none bg-gray-100 rounded-xl'
          />
        </div>
        <div className='pt-6'>
          <button
            disabled={loading}
            type='submit'
            // onClick={updatePassword}
            className='w-full py-2.5 bg-green-600 text-white rounded-xl'>
            {loading ? "updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
