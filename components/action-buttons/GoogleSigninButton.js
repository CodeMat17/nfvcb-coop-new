"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {FcGoogle} from 'react-icons/fc'

const GoogleSigninButton = () => {
  const supabase = createClientComponentClient();

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div>
      <button
        onClick={signInWithGoogle}
        className='w-full py-2 flex items-center justify-center gap-x-1 rounded-xl bg-[#D76F30] text-white'>
        <span className='bg-white rounded-full p-1'>
          <FcGoogle className='text-2xl' />
        </span>{" "}
        <span className='text-sm'>Sign up with Google</span>
      </button>
    </div>
  );
};

export default GoogleSigninButton;
